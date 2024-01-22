import { PostDto, PostService } from "../service/post.service";
export declare class PostController {
    private videoService;
    constructor(videoService: PostService);
    private uploadVideoDtoSchema;
    post: (dto: PostDto) => Promise<void>;
}
