import { BrowserInstance } from "./browser.instance";
import { UploadDto } from "../service/post.service";
export declare class BrowserPost {
    private browserInstance;
    private page;
    constructor(browserInstance: BrowserInstance);
    run: (dto: UploadDto) => Promise<void>;
    private uploadFile;
    private setFile;
    private setMeta;
    private setConfig;
    private setSchedule;
    private post;
    private waitUploadComplete;
    private getIsUploading;
    private delay;
}
