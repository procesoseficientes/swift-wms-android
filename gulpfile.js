let gulp = require("gulp-param")(require("gulp"), process.argv);
let i18n = require("./gulp/i18n");
let buildTests = require("./gulp/build-tests");
let mocks = require("./gulp/generate-mock");
let spec = require("./gulp/generate-spec");
let swiftGenerateProvider = require("./gulp/swift-generate-provider");

gulp.task("translate", i18n);
gulp.task("generateTests", buildTests);
gulp.task("generateMock", mocks);
gulp.task("generateSpec", spec);
gulp.task("generateProvider", swiftGenerateProvider);
