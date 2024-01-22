import { BrowserInstance } from "../infrastructure/browser.instance";
export type UploadDto = {
    meta: {
        title: string;
        tags?: string[];
    };
    filePath?: {
        video?: string;
        image?: string;
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
    post: (dto: UploadDto) => Promise<void>;
}
