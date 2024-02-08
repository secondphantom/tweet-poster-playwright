export type LogLevel = "production" | "verbose" | "debug" | undefined;
export declare class Logger {
    static instance: Logger | undefined;
    static getInstance: (logLevel: LogLevel) => Logger;
    private LOG_LEVEL_NUMBER;
    private levelNumber;
    constructor(level: LogLevel);
    log: (message: string) => void;
    error: (message: string) => void;
    verbose: (message: string) => void;
    debug: (message: string) => void;
}
