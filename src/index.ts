import { LaunchOptions } from "playwright";
import { LoginController } from "./core/controller/login.controller";
import { PostController } from "./core/controller/post.controller";
import { BrowserInstance } from "./core/infrastructure/browser.instance";
import { LoginService } from "./core/service/login.service";
import { PostService } from "./core/service/post.service";
import { LogLevel, Logger } from "./logger";

export class TweetPoster {
  private loginController: LoginController;
  tweet: PostController;

  constructor({
    authFilePath,
    launchOptions,
    logLevel,
  }: {
    authFilePath: string;
    launchOptions?: LaunchOptions;
    logLevel?: LogLevel;
  }) {
    const browserInstance = new BrowserInstance({
      authFilePath,
      launchOptions,
    });

    const logger = new Logger(logLevel);

    const loginService = new LoginService(browserInstance, logger);
    const postService = new PostService(browserInstance, logger);

    this.loginController = new LoginController(loginService);
    this.tweet = new PostController(postService);
  }

  login = () => this.loginController.login();
}
