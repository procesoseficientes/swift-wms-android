var webpackConfig = require("./webpack.coverage.js");

module.exports = function(config) {
    var _config = {
        basePath: "../",

        frameworks: ["jasmine"],

        files: [
            {
                pattern: "./test-config/karma-test-shim.js",
                watched: true
            },
            {
                pattern: "./src/assets/**/*",
                watched: false,
                included: false,
                served: true,
                nocache: false
            }
        ],

        proxies: {
            "/assets/": "/base/src/assets/"
        },

        preprocessors: {
            "./test-config/karma-test-shim.js": ["webpack", "sourcemap"],
            "src/**/!(*spec|*mock).(js|ts)": ["coverage"]
        },

        webpack: webpackConfig,

        webpackMiddleware: {
            stats: "errors-only"
        },

        webpackServer: {
            noInfo: true
        },

        browserConsoleLogOptions: {
            level: "log",
            format: "%b %T: %m",
            terminal: true
        },
        reporters: ["kjhtml", "dots", "istanbul"],
        istanbulReporter: {
            dir: "coverage/", // changed default output dir from 'coverage/'
            reporters: [{ type: "json", file: "coverage.json" }],
            instrumenterOptions: { istanbul: { noCompact: true } }
        },
        port: 9876,
        colors: true,
        logLevel: config.LOG_DEBUG,
        autoWatch: true,
        browsers: ["Chrome"],
        customLaunchers: {
            Chrome_with_debugging: {
                base: "Chrome",
                flags: ["--remote-debugging-port=9222"],
                debug: true
            }
        },
        singleRun: false
    };

    config.set(_config);
};
