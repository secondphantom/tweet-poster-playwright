import { BrowserInstance } from "../infrastructure/browser.instance";
import { Logger } from "../../logger";
export declare class LoginService {
    private browserInstance;
    private logger;
    private rl;
    constructor(browserInstance: BrowserInstance, logger: Logger);
    login: () => Promise<{
        isLogin: boolean;
    }>;
    private updateAuth;
}
