"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
class Logger {
    constructor(level) {
        this.LOG_LEVEL_NUMBER = {
            production: 1,
            verbose: 2,
            debug: 3,
        };
        this.log = (message) => {
            if (this.levelNumber < this.LOG_LEVEL_NUMBER["production"]) {
                return;
            }
            console.debug(`[log] ${new Date().toISOString()}: ${message}`);
        };
        this.error = (message) => {
            if (this.levelNumber < this.LOG_LEVEL_NUMBER["production"]) {
                return;
            }
            console.error(`[error] ${new Date().toISOString()}: ${message}`);
        };
        this.verbose = (message) => {
            if (this.levelNumber < this.LOG_LEVEL_NUMBER["debug"]) {
                return;
            }
            console.info(`[verbose] ${new Date().toISOString()}: ${message}`);
        };
        this.debug = (message) => {
            if (this.levelNumber < this.LOG_LEVEL_NUMBER["debug"]) {
                return;
            }
            console.debug(`[debug] ${new Date().toISOString()}: ${message}`);
        };
        this.levelNumber = level
            ? this.LOG_LEVEL_NUMBER[level]
            : this.LOG_LEVEL_NUMBER["production"];
    }
}
exports.Logger = Logger;
_a = Logger;
Logger.getInstance = (logLevel) => {
    if (_a.instance)
        return _a.instance;
    _a.instance = new _a(logLevel);
    return _a.instance;
};
