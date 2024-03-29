import { BrowserInstance } from "../../../core/infrastructure/browser.instance";
import { PostDto, PostService } from "../../../core/service/post.service";
import { LoginService } from "../../../core/service/login.service";
import dotenv from "dotenv";
import { Logger } from "../../../logger";
dotenv.config();

describe("Post Service", () => {
  let browserInstance: BrowserInstance;
  let loginService: LoginService;
  let postService: PostService;
  let logger = new Logger("debug");

  beforeAll(async () => {
    browserInstance = new BrowserInstance({
      authFilePath: process.env.AUTH_FILE_PATH!,
      launchOptions: { headless: false },
    });
    loginService = new LoginService(browserInstance, logger);
    await loginService.login();
    postService = new PostService(browserInstance, logger);
  }, 30000);

  afterAll(async () => {
    await browserInstance.closeBrowser();
  });

  test.only("Upload Video", async () => {
    const dto: PostDto = {
      meta: {
        title: "test",
        tags: ["리그오브레전드", "leagueoflegends"],
      },
      filePath: {
        video: process.env.VIDEO_FILE_PATH!,
      },
      config: {
        visibility: "schedule",
        scheduleDate: new Date("2024-02-22T04:58:44.518Z"),
      },
    };

    await postService.post(dto);
  }, 180000);

  test.skip("Upload Video", async () => {
    const dto: PostDto = {
      meta: {
        title: "test",
        tags: ["리그오브레전드", "leagueoflegends"],
      },
      filePath: {
        video: process.env.VIDEO_FILE_PATH_NETWORK_HDD!,
      },
      config: {
        visibility: "schedule",
        scheduleDate: new Date("2024-02-29T04:58:44.518Z"),
      },
    };

    await postService.post(dto);
  }, 180000);

  test("Upload Images", async () => {
    const dto: PostDto = {
      meta: {
        title: "test",
        tags: ["리그오브레전드", "leagueoflegends"],
      },
      filePath: {
        images: [process.env.IMAGE_FILE_PATH!, process.env.IMAGE_FILE_PATH!],
      },
      config: {
        visibility: "schedule",
        scheduleDate: new Date("2024-02-22T04:58:44.518Z"),
      },
    };

    await postService.post(dto);
  }, 180000);
});
