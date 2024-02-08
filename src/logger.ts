export type LogLevel = "production" | "verbose" | "debug" | undefined;

export class Logger {
  static instance: Logger | undefined;

  static getInstance = (logLevel: LogLevel) => {
    if (this.instance) return this.instance;
    this.instance = new Logger(logLevel);
    return this.instance;
  };

  private LOG_LEVEL_NUMBER = {
    production: 1,
    verbose: 2,
    debug: 3,
  } as const;
  private levelNumber: number;

  constructor(level: LogLevel) {
    this.levelNumber = level
      ? this.LOG_LEVEL_NUMBER[level]
      : this.LOG_LEVEL_NUMBER["production"];
  }

  log = (message: string) => {
    if (this.levelNumber < this.LOG_LEVEL_NUMBER["production"]) {
      return;
    }
    console.debug(`[log] ${new Date().toISOString()}: ${message}`);
  };

  error = (message: string) => {
    if (this.levelNumber < this.LOG_LEVEL_NUMBER["production"]) {
      return;
    }
    console.error(`[error] ${new Date().toISOString()}: ${message}`);
  };

  verbose = (message: string) => {
    if (this.levelNumber < this.LOG_LEVEL_NUMBER["debug"]) {
      return;
    }
    console.info(`[verbose] ${new Date().toISOString()}: ${message}`);
  };

  debug = (message: string) => {
    if (this.levelNumber < this.LOG_LEVEL_NUMBER["debug"]) {
      return;
    }
    console.debug(`[debug] ${new Date().toISOString()}: ${message}`);
  };
}
