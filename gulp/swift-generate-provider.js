let gulp = require("gulp-param")(require("gulp"), process.argv);
let exec = require("gulp-exec");
let log = require("fancy-log");
let path = require("path");

async function execute(provider) {
    let options = {
        continueOnError: false, // default = false, true means don't emit error event
        pipeStdout: false, // default = false, true means stdout is written to file.contents
        provider: provider, // content passed to lodash.template()
        object: "provider"
    };

    let reportOptions = {
        err: true, // default = true, false means don't write err
        stderr: true, // default = true, false means don't write stderr
        stdout: true // default = true, false means don't write stdout
    };

    log(`ionic generate provider ${provider}`);

    return gulp
        .src(path.dirname(__dirname))
        .pipe(
            exec(
                `ionic generate <%= options.object %> <%= options.provider %>`,
                options
            )
        )
        .pipe(exec.reporter(reportOptions));
}

gulp.task("swiftGenerateProvider", function(provider) {
    return execute(provider);
});

let swiftGenerateProviderTask = ["swiftGenerateProvider"];

module.exports = swiftGenerateProviderTask;
