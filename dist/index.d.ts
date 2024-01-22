import { LaunchOptions } from "playwright";
import { PostController } from "./core/controller/post.controller";
export declare class TweetPoster {
    private loginController;
    tweet: PostController;
    constructor({ authFilePath, launchOptions, }: {
        authFilePath: string;
        launchOptions: LaunchOptions;
    });
    login: () => Promise<{
        isLogin: boolean;
    }>;
}
