import { FrameLocator, Page } from "playwright";
import { BrowserInstance } from "./browser.instance";
import { PostDto } from "../service/post.service";
import { Logger } from "../../logger";

export class BrowserPost {
  private page: Page;
  constructor(
    private browserInstance: BrowserInstance,
    private logger: Logger
  ) {
    this.page = this.browserInstance.getPage();
  }

  run = async (dto: PostDto) => {
    if (!this.page) {
      this.page = this.browserInstance.getPage();
    }
    const { filePath, meta, config } = dto;

    this.logger.debug("going upload page");
    await this.browserInstance.goUploadPage();
    await this.delay(2000);

    this.logger.debug("setting config");
    await this.setConfig(config);
    await this.delay(2000);

    this.logger.debug("setting meta");
    await this.setMeta(meta);
    await this.delay(2000);

    this.logger.debug("uploading file");
    await this.uploadFile(filePath);
    await this.delay(2000);

    this.logger.debug("posting");
    await this.post();
  };

  private uploadFile = async (filePath: PostDto["filePath"]) => {
    if (!filePath) return;
    const setFile = this.getSetFile();

    let uploadFile = false;
    if (filePath.video) {
      await setFile(filePath.video);
      await this.waitUploadComplete();
      uploadFile = true;
    }
    if (uploadFile) return;
    if (!filePath.images) return;
    if (filePath.images.length === 0) return;

    for (const imagePath of filePath.images) {
      await setFile(imagePath);
      await this.delay(1000);
    }
  };

  private getSetFile = () => {
    let isFirstUpload = true;
    return (filePath: string) => {
      if (isFirstUpload) {
        isFirstUpload = false;
        return this.setFileMedia(filePath);
      }
      return this.setFilePhotos(filePath);
    };
  };

  private setFileMedia = async (filePath: string) => {
    const fileChooserPromise = this.page.waitForEvent("filechooser", {
      timeout: 15000,
    });

    await this.delay(500);
    await this.page.click('[aria-label="Add photos or video"]');

    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(filePath);
  };

  private setFilePhotos = async (filePath: string) => {
    const fileChooserPromise = this.page.waitForEvent("filechooser", {
      timeout: 15000,
    });

    await this.delay(500);
    await this.page.click('[aria-label="Add photos"]');

    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(filePath);
  };

  private setMeta = async ({ title, tags }: PostDto["meta"]) => {
    await this.page.click(".DraftEditor-root");
    await this.page.keyboard.type(title);
    if (!tags) return;
    const tagsStr = tags
      .map((str) => str.replace(/ /g, ""))
      .map((str) => `#${str}`)
      .join(" ");
    await this.page.keyboard.type("\n");
    await this.page.keyboard.type(tagsStr);
    await this.delay(2000);
    await this.page.keyboard.press("Escape");
  };

  private setConfig = async (config?: PostDto["config"]) => {
    if (!config) return;

    const { visibility, scheduleDate } = config;
    if (visibility === "public") return;
    if (visibility === "schedule" && !scheduleDate) return;
    if (!scheduleDate) return;
    await this.setSchedule(scheduleDate);
  };

  private setSchedule = async (scheduleDate: Date) => {
    await this.page.click('[aria-label="Schedule post"]');

    await this.delay(3000);
    const [month, day, year] = new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    })
      .format(scheduleDate)
      .replace(",", "")
      .split(" ");

    (await this.page.$$('[aria-label="Date"] select'))[0].selectOption(month);
    (await this.page.$$('[aria-label="Date"] select'))[1].selectOption(day);
    (await this.page.$$('[aria-label="Date"] select'))[2].selectOption(year);

    await this.delay(1000);
    const [hour, minute, amPm] = new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "numeric",
    })
      .format(scheduleDate)
      .replace(":", " ")
      .split(" ");

    (await this.page.$$('[aria-label="Time"] select'))[0].selectOption(hour);
    (await this.page.$$('[aria-label="Time"] select'))[1].selectOption(minute);
    (await this.page.$$('[aria-label="Time"] select'))[2].selectOption(amPm);
    await this.delay(1000);

    await this.page.click('[data-testid="scheduledConfirmationPrimaryAction"]');
  };

  private post = async () => {
    await this.page.click('[data-testid="tweetButton"]');
  };

  private waitUploadComplete = async () => {
    let isUploading = await this.getIsUploading();
    this.logger.debug(`wait until upload complete`);
    while (isUploading) {
      isUploading = await this.getIsUploading();
      await this.delay(1000);
    }
  };

  private getIsUploading = async () => {
    const statusEle = await this.page
      .$$('[aria-live="polite"]')
      .then((v) => v[1]);
    const statusText = await statusEle?.innerText();
    if (!statusText) return true;
    if (!statusText.toLowerCase().includes("uploaded")) {
      return true;
    }
    return false;
  };

  private delay = async (timeout: number) =>
    new Promise((res, rej) => {
      setTimeout(() => {
        res(null);
      }, timeout);
    });
}
