let pathModule = require("path");
let root = pathModule.dirname(__dirname);
const providersPath = pathModule.join(root, "src", "providers");
const mocksPath = pathModule.join(root, "src", "mocks");
let tsParserModule = require("typescript-parser");
let _ = require("lodash");

let log = require("fancy-log");
let gulp = require("gulp-param")(require("gulp"), process.argv);
let fs = require("fs");
let prettier = require("gulp-prettier");
let file = require("gulp-file");

function getProvidersPathObject(name) {
    let providersModulePath = `src/providers`;
    let newProviderModulePath = `${providersModulePath}/${name}`;
    let mockModulePath = `src/providers/${name}`;
    let newMockModuleFilePath = `${mockModulePath}/${name}.mock`;

    return {
        providersModulePath: providersModulePath,
        newProviderModulePath: newProviderModulePath,
        mockModuleFilePath: newMockModuleFilePath
    };
}

async function generateMock(path, injectable) {
    let parser = new tsParserModule.TypescriptParser();
    let sourceCode = await parser.parseFile(path);

    let importStatements = sourceCode["imports"];

    let imports = [];
    _.each(importStatements, element => {
        let specifiers = [];

        _.each(element.specifiers, parameter => {
            specifiers.push(parameter.specifier);
        });

        let items = "";

        /*   let fullPath = element.libraryName.startsWith(".")
            ? pathModule.relative(
                  mocksPath,
                  pathModule.resolve(
                      pathModule.dirname(path),
                      element.libraryName
                  )
              )
            : element.libraryName;

        fullPath;*/

        if (specifiers.length === 0)
            if (element.alias) items = `* as ${element.alias} from `;
            else if (element.defaultAlias)
                items = `${element.defaultAlias} from `;
            else items = "";
        else items = `{${specifiers.join(",")}} from `;

        imports.push(`import ${items}"${element.libraryName}";`);
    }).join(";\n");

    let classes = [];
    _.each(sourceCode.declarations, members => {
        let accessorsMembers = members["accessors"];
        let propertyMembers = members["properties"];
        let methodDefinitions = members["methods"];
        let constructorDefinition = members["ctor"];

        let properties = [];
        _.each(propertyMembers, element => {
            properties.push(
                `${element.name}: ${element.type ? element.type : "any"};`
            );
        });

        let accessors = [];
        _.each(accessorsMembers, element => {
            if (element instanceof tsParserModule.SetterDeclaration)
                accessors.push(
                    `${element.name}: ${element.type ? element.type : "any"};`
                );
        });

        let constructor = [];
        let each = element => {
            let parameters = [];
            if (!element) return;

            _.each(element.parameters, parameter => {
                parameters.push(
                    `_${parameter.name}: ${
                        parameter.type ? parameter.type : "any"
                    }`
                );
            });

            constructor.push(`constructor(${parameters.join(",")}) {}`);
        };

        let methods = [];
        _.each(methodDefinitions, element => {
            let parameters = [];
            _.each(element.parameters, parameter => {
                parameters.push(
                    `_${parameter.name}: ${
                        parameter.type ? parameter.type : "any"
                    }`
                );
            });

            methods.push(
                `${element.name}(${parameters.join(",")}) : any /* ${
                    element.type ? element.type : ""
                } */ {}`
            );
        });

        each(constructorDefinition);

        return classes.push(`${injectable ? "@Injectable()" : ""}
export class ${members.name} { 
    ${accessors.join("\n")}
    ${properties.join("\n")}    
    ${methods.join("\n")}
    }`);
    });

    classes.splice(0, 0, `${imports.join("\n")}`);

    return classes.join("\n");
}

async function execute(source, destination) {
    return file(destination, await generateMock(source))
        .pipe(
            prettier({
                tabWidth: 4,
                trimTrailingWhitespace: true,
                insertFinalNewline: true,
                endOfLine: "lf"
            })
        )
        .pipe(gulp.dest(`.`));
}

gulp.task("createMockClass", function(provider, folder, destination) {
    let providerObject = getProvidersPathObject(provider);

    if (fs.existsSync(providerObject.mockModuleFilePath))
        throw new Error("Test module already exists!!");

    if (folder)
        return fs
            .readdirSync(folder)
            .map(name =>
                execute(
                    pathModule.join(folder, name),
                    pathModule.join(
                        mocksPath,
                        destination,
                        name.replace(/\.d\.ts$/g, ".ts")
                    ),
                    false
                )
            );

    return execute(
        pathModule.join(providersPath, provider, `${provider}.ts`),
        pathModule.join(providersPath, provider, `${provider}.mock.ts`),
        true
    );
});

let generateMockTasks = ["createMockClass"];

module.exports = generateMockTasks;
