"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrowserPost = void 0;
class BrowserPost {
    constructor(browserInstance) {
        this.browserInstance = browserInstance;
        this.run = (dto) => __awaiter(this, void 0, void 0, function* () {
            if (!this.page) {
                this.page = this.browserInstance.getPage();
            }
            const { filePath, meta, config } = dto;
            yield this.browserInstance.goUploadPage();
            yield this.setConfig(config);
            yield this.delay(2000);
            yield this.setMeta(meta);
            yield this.delay(2000);
            yield this.uploadFile(filePath);
            yield this.delay(2000);
            yield this.post();
        });
        this.uploadFile = (filePath) => __awaiter(this, void 0, void 0, function* () {
            if (!filePath)
                return;
            const setFile = this.getSetFile();
            let uploadFile = false;
            if (filePath.video) {
                yield setFile(filePath.video);
                yield this.waitUploadComplete();
                uploadFile = true;
            }
            if (uploadFile)
                return;
            if (!filePath.images)
                return;
            if (filePath.images.length === 0)
                return;
            for (const imagePath of filePath.images) {
                yield setFile(imagePath);
                yield this.delay(1000);
            }
        });
        this.getSetFile = () => {
            let isFirstUpload = true;
            return (filePath) => {
                if (isFirstUpload) {
                    isFirstUpload = false;
                    return this.setFileMedia(filePath);
                }
                return this.setFilePhotos(filePath);
            };
        };
        this.setFileMedia = (filePath) => __awaiter(this, void 0, void 0, function* () {
            const fileChooserPromise = this.page.waitForEvent("filechooser", {
                timeout: 15000,
            });
            yield this.delay(500);
            yield this.page.click('[aria-label="Add photos or video"]');
            const fileChooser = yield fileChooserPromise;
            yield fileChooser.setFiles(filePath);
        });
        this.setFilePhotos = (filePath) => __awaiter(this, void 0, void 0, function* () {
            const fileChooserPromise = this.page.waitForEvent("filechooser", {
                timeout: 15000,
            });
            yield this.delay(500);
            yield this.page.click('[aria-label="Add photos"]');
            const fileChooser = yield fileChooserPromise;
            yield fileChooser.setFiles(filePath);
        });
        this.setMeta = ({ title, tags }) => __awaiter(this, void 0, void 0, function* () {
            yield this.page.click(".DraftEditor-root");
            yield this.page.keyboard.type(title);
            if (!tags)
                return;
            const tagsStr = tags
                .map((str) => str.replace(/ /g, ""))
                .map((str) => `#${str}`)
                .join(" ");
            yield this.page.keyboard.type("\n");
            yield this.page.keyboard.type(tagsStr);
            yield this.delay(2000);
            yield this.page.keyboard.press("Escape");
        });
        this.setConfig = (config) => __awaiter(this, void 0, void 0, function* () {
            if (!config)
                return;
            const { visibility, scheduleDate } = config;
            if (visibility === "public")
                return;
            if (visibility === "schedule" && !scheduleDate)
                return;
            if (!scheduleDate)
                return;
            yield this.setSchedule(scheduleDate);
        });
        this.setSchedule = (scheduleDate) => __awaiter(this, void 0, void 0, function* () {
            yield this.page.click('[aria-label="Schedule post"]');
            yield this.delay(3000);
            const [month, day, year] = new Intl.DateTimeFormat("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
            })
                .format(scheduleDate)
                .replace(",", "")
                .split(" ");
            (yield this.page.$$('[aria-label="Date"] select'))[0].selectOption(month);
            (yield this.page.$$('[aria-label="Date"] select'))[1].selectOption(day);
            (yield this.page.$$('[aria-label="Date"] select'))[2].selectOption(year);
            yield this.delay(1000);
            const [hour, minute, amPm] = new Intl.DateTimeFormat("en-US", {
                hour: "numeric",
                minute: "numeric",
            })
                .format(scheduleDate)
                .replace(":", " ")
                .split(" ");
            (yield this.page.$$('[aria-label="Time"] select'))[0].selectOption(hour);
            (yield this.page.$$('[aria-label="Time"] select'))[1].selectOption(minute);
            (yield this.page.$$('[aria-label="Time"] select'))[2].selectOption(amPm);
            yield this.delay(1000);
            yield this.page.click('[data-testid="scheduledConfirmationPrimaryAction"]');
        });
        this.post = () => __awaiter(this, void 0, void 0, function* () {
            yield this.page.click('[data-testid="tweetButton"]');
        });
        this.waitUploadComplete = () => __awaiter(this, void 0, void 0, function* () {
            let isUploading = yield this.getIsUploading();
            while (isUploading) {
                isUploading = yield this.getIsUploading();
                yield this.delay(500);
            }
        });
        this.getIsUploading = () => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const statusText = yield ((_a = (yield this.page.$('[aria-live="polite"]'))) === null || _a === void 0 ? void 0 : _a.innerText());
            if (!statusText)
                return true;
            if (!statusText.toLowerCase().includes("uploaded")) {
                return true;
            }
            return false;
        });
        this.delay = (timeout) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((res, rej) => {
                setTimeout(() => {
                    res(null);
                }, timeout);
            });
        });
        this.page = this.browserInstance.getPage();
    }
}
exports.BrowserPost = BrowserPost;
