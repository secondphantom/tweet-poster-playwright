"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TweetPoster = void 0;
const login_controller_1 = require("./core/controller/login.controller");
const post_controller_1 = require("./core/controller/post.controller");
const browser_instance_1 = require("./core/infrastructure/browser.instance");
const login_service_1 = require("./core/service/login.service");
const post_service_1 = require("./core/service/post.service");
const logger_1 = require("./logger");
class TweetPoster {
    constructor({ authFilePath, launchOptions, logLevel, }) {
        this.login = () => this.loginController.login();
        const browserInstance = new browser_instance_1.BrowserInstance({
            authFilePath,
            launchOptions,
        });
        const logger = new logger_1.Logger(logLevel);
        const loginService = new login_service_1.LoginService(browserInstance, logger);
        const postService = new post_service_1.PostService(browserInstance, logger);
        this.loginController = new login_controller_1.LoginController(loginService);
        this.tweet = new post_controller_1.PostController(postService);
    }
}
exports.TweetPoster = TweetPoster;
