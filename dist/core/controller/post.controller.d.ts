import { UploadDto, PostService } from "../service/post.service";
export declare class PostController {
    private videoService;
    constructor(videoService: PostService);
    private uploadVideoDtoSchema;
    upload: (dto: UploadDto) => Promise<void>;
}
