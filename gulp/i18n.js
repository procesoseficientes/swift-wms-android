let translate = require("google-translate-api");
let fs = require("fs");
let _ = require("lodash");
let log = require("fancy-log");
let gulp = require("gulp-param")(require("gulp"), process.argv);

async function generateTranslations(text, language) {
    let result = await translate(text, {
        to: language
    });

    return result.text;
}

function loadFromFile(language, root = "src/assets/i18n") {
    try {
        return JSON.parse(fs.readFileSync(`./${root}/${language}.json`));
    } catch (e) {
        return {};
    }
}

async function translateObject(object, targetObject, targetLanguage) {
    for (const key in object) {
        if (object.hasOwnProperty(key)) {
            let child = object[key];

            if (!targetObject[key]) targetObject[key] = {};

            let targetChild = targetObject[key];

            for (const subKey in child) {
                if (child.hasOwnProperty(subKey)) {
                    if (!targetChild[subKey])
                        targetChild[subKey] = await generateTranslations(
                            child[subKey],
                            targetLanguage
                        );
                }
            }
        }
    }

    return targetObject;
}

function sortProperties(object) {
    return _.fromPairs(_.sortBy(_.toPairs(object), 0));
}

function sortTranslation(object) {
    let source = sortProperties(object);

    for (const key in source) {
        if (source.hasOwnProperty(key)) {
            let child = sortProperties(source[key]);
        }
    }

    return source;
}

function writeTranslatedResource(language, object) {
    let source = sortTranslation(object);
    fs.writeFile(
        `./src/assets/i18n/${language}.json`,
        JSON.stringify(source, null, 4),
        err => {
            if (err) console.log(err);
        }
    );
}

async function translateResource(languages) {
    let x = loadFromFile("base", "i18n");

    let processes = await languages.map(language => {
        const process = async () => {
            let y = loadFromFile(language);
            let z = await translateObject(x, y, language);
            await writeTranslatedResource(language, z);
            log(`${language}.json written successfully`);
        };
        return process();
    });

    await writeTranslatedResource("en", x);
}

gulp.task("generateTranslations", function (type, name, alias) {
    translateResource(["fr", "en"]);
    return log(`generateTranslations`);
});

let generateTranslationsTasks = ["generateTranslations"];

module.exports = generateTranslationsTasks;
