import { BrowserInstance } from "../../../core/infrastructure/browser.instance";
import { LoginService } from "../../../core/service/login.service";
import dotenv from "dotenv";
import { Logger } from "../../../logger";
dotenv.config();
describe("Login Service", () => {
  let browserInstance: BrowserInstance;
  let loginService: LoginService;
  let logger = new Logger("debug");

  beforeAll(() => {
    browserInstance = new BrowserInstance({
      authFilePath: process.env.AUTH_FILE_PATH!,
      launchOptions: { headless: true },
    });
    loginService = new LoginService(browserInstance, logger);
  });

  afterAll(async () => {
    await browserInstance.closeBrowser();
  });

  test("Login", async () => {
    const { isLogin } = await loginService.login();

    expect(isLogin).toEqual(true);
  }, 180000);
});
