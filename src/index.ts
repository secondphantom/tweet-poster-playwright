import { LaunchOptions } from "playwright";
import { LoginController } from "./core/controller/login.controller";
import { PostController } from "./core/controller/post.controller";
import { BrowserInstance } from "./core/infrastructure/browser.instance";
import { LoginService } from "./core/service/login.service";
import { PostService } from "./core/service/post.service";

export class TweetPoster {
  private loginController: LoginController;
  tweet: PostController;

  constructor({
    authFilePath,
    launchOptions,
  }: {
    authFilePath: string;
    launchOptions?: LaunchOptions;
  }) {
    const browserInstance = new BrowserInstance({
      authFilePath,
      launchOptions,
    });

    const loginService = new LoginService(browserInstance);
    const postService = new PostService(browserInstance);

    this.loginController = new LoginController(loginService);
    this.tweet = new PostController(postService);
  }

  login = () => this.loginController.login();
}
