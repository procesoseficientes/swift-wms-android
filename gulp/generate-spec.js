let path = require("path");
let root = path.dirname(__dirname);
const providersPath = path.join(root, "src", "providers");
const mocksPath = path.join(root, "src", "mocks");
let tsParserModule = require("typescript-parser");
let _ = require("lodash");

let log = require("fancy-log");
let gulp = require("gulp-param")(require("gulp"), process.argv);
let fs = require("fs");
let prettier = require("gulp-prettier");
let file = require("gulp-file");
let replace = require("gulp-replace");
let rename = require("gulp-rename");

async function generateSpecInformation(filePath) {
    let parser = new tsParserModule.TypescriptParser();
    let className = (await parser.parseFile(filePath)).declarations[0].name;

    let source = path.join(root, "gulp", "resources", "blank.spec.ts");
    let modulePath = path.dirname(filePath);
    let importModule = `${path.basename(filePath, ".ts")}`;

    let target = path.join(modulePath);
    let relativeModulePath = `./${importModule}`;

    return {
        source: source,
        target: target,
        relativeModulePath: relativeModulePath,
        className: className,
        specName: importModule
    };
}

async function execute(path) {
    let f = await generateSpecInformation(path);

    return gulp
        .src(f.source)
        .pipe(replace("//--", ""))
        .pipe(replace("/*! ProviderName */", f.className))
        .pipe(replace("/*! ProviderModule */", f.relativeModulePath))
        .pipe(rename({ basename: f.specName, extname: ".spec.ts" }))
        .pipe(gulp.dest(f.target));
}

gulp.task("createSpecClass", function(provider) {
    return execute(
        path.join(root, "src", "providers", provider, `${provider}.ts`)
    );
});

let generateSpecTasks = ["createSpecClass"];

module.exports = generateSpecTasks;
