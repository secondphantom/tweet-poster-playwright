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
    private browserPost;
    constructor(browserInstance: BrowserInstance);
    post: (dto: PostDto) => Promise<void>;
}
