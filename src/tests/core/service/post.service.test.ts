import { BrowserInstance } from "../../../core/infrastructure/browser.instance";
import { UploadDto, PostService } from "../../../core/service/post.service";
import { LoginService } from "../../../core/service/login.service";
import dotenv from "dotenv";
dotenv.config();

describe("Post Service", () => {
  let browserInstance: BrowserInstance;
  let loginService: LoginService;
  let postService: PostService;

  beforeAll(async () => {
    browserInstance = new BrowserInstance({
      authFilePath: process.env.AUTH_FILE_PATH!,
      launchOptions: { headless: true },
    });
    loginService = new LoginService(browserInstance);
    await loginService.login();
    postService = new PostService(browserInstance);
  }, 30000);

  afterAll(async () => {
    await browserInstance.closeBrowser();
  });

  test("Upload Video", async () => {
    const dto: UploadDto = {
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

  test.skip("Upload Images", async () => {
    const dto: UploadDto = {
      meta: {
        title: "test",
        tags: ["리그오브레전드", "leagueoflegends"],
      },
      filePath: {
        image: process.env.IMAGE_FILE_PATH!,
      },
      config: {
        visibility: "schedule",
        scheduleDate: new Date("2024-02-22T04:58:44.518Z"),
      },
    };

    await postService.post(dto);
  }, 180000);
});
