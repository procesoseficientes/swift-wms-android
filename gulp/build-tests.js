let log = require("fancy-log");
let gulp = require("gulp-param")(require("gulp"), process.argv);

let typescript = require("gulp-tsc");

gulp.task("compileTests", function() {
  gulp
    .src(["test/*.ts"])
    .pipe(typescript({ target: "ES6", module: "commonjs" }))
    .pipe(gulp.dest("dist/test"));
});

let compileTests = ["compileTests"];

module.exports = compileTests;
