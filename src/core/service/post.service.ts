import { BrowserInstance } from "../infrastructure/browser.instance";
import { BrowserPost } from "../infrastructure/browser.post";

export type UploadDto = {
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
  constructor(private browserInstance: BrowserInstance) {
    this.browserPost = new BrowserPost(this.browserInstance);
  }

  post = async (dto: UploadDto) => {
    await this.browserPost.run(dto);
  };
}
