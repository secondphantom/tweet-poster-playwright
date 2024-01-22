import { PostDto, PostService } from "../service/post.service";
import { z } from "zod";

export class PostController {
  constructor(private videoService: PostService) {}

  private uploadVideoDtoSchema = z
    .object({
      filePath: z
        .object({
          video: z.string().optional(),
          images: z.array(z.string()).optional(),
        })
        .optional(),
      meta: z.object({
        title: z.string(),
        tags: z.array(z.string()).optional(),
      }),
      config: z
        .object({
          visibility: z
            .union([z.literal("public"), z.literal("schedule")])
            .optional(),
          scheduleDate: z.date().optional(),
        })
        .optional(),
    })
    .strict();

  post = async (dto: PostDto) => {
    const validDto = this.uploadVideoDtoSchema.parse(dto);
    await this.videoService.post(validDto);
  };
}
