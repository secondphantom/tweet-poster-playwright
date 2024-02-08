import fs from "fs";
import { stdin as input, stdout as output } from "process";
import * as readline from "readline/promises";
import { BrowserInstance } from "../infrastructure/browser.instance";
import { Logger } from "../../logger";
export class LoginService {
  private rl = readline.createInterface({ input, output });

  constructor(
    private browserInstance: BrowserInstance,
    private logger: Logger
  ) {}

  login = async () => {
    try {
      this.logger.log("try login");
      await this.browserInstance.launch();
    } catch (error: any) {
      this.logger.error(error.message);
      await this.updateAuth();
      await this.browserInstance.launch();
    }
    return { isLogin: true };
  };

  private updateAuth = async () => {
    await this.browserInstance.goLoginPage();
    await this.rl.question(`Login twitter\nDid you login? (Enter)\n`);
    await this.browserInstance.saveAuthFile();
  };
}
