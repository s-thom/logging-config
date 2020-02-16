export enum LogLevels {
  OFF = 0,
  ALL = 0,
  TRACE = 1,
  DEBUG = 2,
  INFO = 4,
  WARN = 8,
  ERROR = 16,
  FATAL = 32
}

type LevelName = keyof typeof LogLevels;

export const LevelDefaults: {
  [level in LevelName]: number;
} = {
  OFF: 0,
  ALL: 0xffffffff,
  TRACE:
    LogLevels.FATAL |
    LogLevels.ERROR |
    LogLevels.WARN |
    LogLevels.INFO |
    LogLevels.DEBUG |
    LogLevels.TRACE,
  DEBUG:
    LogLevels.FATAL |
    LogLevels.ERROR |
    LogLevels.WARN |
    LogLevels.INFO |
    LogLevels.DEBUG,
  INFO: LogLevels.FATAL | LogLevels.ERROR | LogLevels.WARN | LogLevels.INFO,
  WARN: LogLevels.FATAL | LogLevels.ERROR | LogLevels.WARN,
  ERROR: LogLevels.FATAL | LogLevels.ERROR,
  FATAL: LogLevels.FATAL
};

export const DEFAULT_LEVEL = LevelDefaults.TRACE;

export default class Logger {
  private logLevel: number = DEFAULT_LEVEL;

  private log(
    level: LogLevels,
    verb: "error" | "warn" | "log" | "debug",
    args: any[]
  ) {
    if (this.isLevelEnabled(level)) {
      console[verb](...args);
    }
  }

  setLogLevel(level: number) {
    this.logLevel = level;
  }

  isLevelEnabled(level: number): boolean {
    return Boolean(level & this.logLevel);
  }

  trace(...args) {
    this.log(LogLevels.TRACE, "debug", args);
  }

  debug(...args) {
    this.log(LogLevels.DEBUG, "debug", args);
  }

  info(...args) {
    this.log(LogLevels.INFO, "log", args);
  }

  warn(...args) {
    this.log(LogLevels.WARN, "warn", args);
  }

  error(...args) {
    this.log(LogLevels.ERROR, "error", args);
  }

  fatal(...args) {
    this.log(LogLevels.FATAL, "error", args);
  }
}
