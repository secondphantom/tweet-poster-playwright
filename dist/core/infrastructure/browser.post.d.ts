import { BrowserInstance } from "./browser.instance";
import { PostDto } from "../service/post.service";
import { Logger } from "../../logger";
export declare class BrowserPost {
    private browserInstance;
    private logger;
    private page;
    constructor(browserInstance: BrowserInstance, logger: Logger);
    run: (dto: PostDto) => Promise<void>;
    private uploadFile;
    private getSetFile;
    private setFileMedia;
    private setFilePhotos;
    private setMeta;
    private setConfig;
    private setSchedule;
    private post;
    private waitUploadComplete;
    private getIsUploading;
    private delay;
}
