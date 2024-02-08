import { LaunchOptions } from "playwright";
import { PostController } from "./core/controller/post.controller";
import { LogLevel } from "./logger";
export declare class TweetPoster {
    private loginController;
    tweet: PostController;
    constructor({ authFilePath, launchOptions, logLevel, }: {
        authFilePath: string;
        launchOptions?: LaunchOptions;
        logLevel?: LogLevel;
    });
    login: () => Promise<{
        isLogin: boolean;
    }>;
}
