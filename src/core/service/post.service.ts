import { Logger } from "../../logger";
import { BrowserInstance } from "../infrastructure/browser.instance";
import { BrowserPost } from "../infrastructure/browser.post";

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

export class PostService {
  private browserPost: BrowserPost;
  constructor(
    private browserInstance: BrowserInstance,
    private logger: Logger
  ) {
    this.browserPost = new BrowserPost(this.browserInstance, this.logger);
  }

  post = async (dto: PostDto) => {
    this.logger.verbose(`Posting start`);
    await this.browserPost.run(dto);
    this.logger.verbose("Posting end");
  };
}
