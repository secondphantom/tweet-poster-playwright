import { BrowserInstance } from "./browser.instance";
import { PostDto } from "../service/post.service";
export declare class BrowserPost {
    private browserInstance;
    private page;
    constructor(browserInstance: BrowserInstance);
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
