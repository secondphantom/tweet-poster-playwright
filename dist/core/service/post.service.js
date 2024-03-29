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
exports.PostService = void 0;
const browser_post_1 = require("../infrastructure/browser.post");
class PostService {
    constructor(browserInstance, logger) {
        this.browserInstance = browserInstance;
        this.logger = logger;
        this.post = (dto) => __awaiter(this, void 0, void 0, function* () {
            this.logger.verbose(`Posting start`);
            yield this.browserPost.run(dto);
            this.logger.verbose("Posting end");
        });
        this.browserPost = new browser_post_1.BrowserPost(this.browserInstance, this.logger);
    }
}
exports.PostService = PostService;
