import { Logger } from "../../logger";
import { BrowserInstance } from "../infrastructure/browser.instance";
export type PostDto = {
    meta: {
        title: string;
        tags?: string[];
    };
    filePath?: {
        video?: string;
        images?: string[];
    };
    config?: {
        visibility?: "public" | "schedule";
        scheduleDate?: Date;
    };
};
export declare class PostService {
    private browserInstance;
    private logger;
    private browserPost;
    constructor(browserInstance: BrowserInstance, logger: Logger);
    post: (dto: PostDto) => Promise<void>;
}
