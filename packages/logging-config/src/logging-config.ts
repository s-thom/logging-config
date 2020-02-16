/**
 * Log levels
 */
export enum LogLevels {
  /**
   * A message to assist with debugging, at a finer level than DEBUG
   */
  TRACE = 1,
  /**
   * A message to assist with debugging
   */
  DEBUG = 2,
  /**
   * An informational message
   */
  INFO = 4,
  /**
   * A problem has occurred, but it is recoverable
   */
  WARN = 8,
  /**
   * A problem has occurred at the application level, and it is unrecoverable
   */
  ERROR = 16,
  /**
   * A problem has occurred at the system level, and it is unrecoverable
   */
  FATAL = 32
}

/**
 * Pre-defined log levels for convenience
 */
export enum LevelDefaults {
  /**
   * No messages will be logged
   */
  OFF = 0,
  /**
   * All messages will be logged
   */
  ALL = 0xffffffff,
  /**
   * The following log levels will logged:
   *
   * * FATAL
   * * ERROR
   * * WARN
   * * INFO
   * * DEBUG
   * * TRACE
   */
  TRACE = LogLevels.FATAL |
    LogLevels.ERROR |
    LogLevels.WARN |
    LogLevels.INFO |
    LogLevels.DEBUG |
    LogLevels.TRACE,
  /**
   * The following log levels will logged:
   *
   * * FATAL
   * * ERROR
   * * WARN
   * * INFO
   * * DEBUG
   */
  DEBUG = LogLevels.FATAL |
    LogLevels.ERROR |
    LogLevels.WARN |
    LogLevels.INFO |
    LogLevels.DEBUG,
  /**
   * The following log levels will logged:
   *
   * * FATAL
   * * ERROR
   * * WARN
   * * INFO
   */
  INFO = LogLevels.FATAL | LogLevels.ERROR | LogLevels.WARN | LogLevels.INFO,
  /**
   * The following log levels will logged:
   *
   * * FATAL
   * * ERROR
   * * WARN
   */
  WARN = LogLevels.FATAL | LogLevels.ERROR | LogLevels.WARN,
  /**
   * The following log levels will logged:
   *
   * * FATAL
   * * ERROR
   */
  ERROR = LogLevels.FATAL | LogLevels.ERROR,
  /**
   * The following log levels will logged:
   *
   * * FATAL
   */
  FATAL = LogLevels.FATAL
}

/**
 * The default level for all new LoggingConfigurations
 */
export const DEFAULT_LEVEL = LevelDefaults.TRACE;

/**
 * Configuration for Logger instances
 */
export class LoggingConfiguration {
  /**
   * Log level of this configuration
   */
  private logLevel: number;

  /**
   * Create a new instance of LoggingConfiguration
   * @param level Log level for all loggers using this configuration
   */
  constructor(level: LevelDefaults | number = DEFAULT_LEVEL) {
    this.logLevel = level;
  }

  /**
   * Whether a log level is allowed to log with the current configuration
   * @param level Log level to check
   */
  isLevelEnabled(level: LogLevels): boolean {
    return Boolean(level & this.logLevel);
  }

  /**
   * Set the log level configuration
   * @param level Level to set the configuration to
   */
  setLogLevel(level: LevelDefaults | number | keyof typeof LevelDefaults) {
    if (typeof level === "string") {
      if (LevelDefaults[level] !== undefined) {
        this.logLevel = LevelDefaults[level];
      } else {
        this.logLevel = DEFAULT_LEVEL;
      }
    } else {
      this.logLevel = level;
    }
  }
}

/**
 * Default configuration for all Loggers
 */
export const DEFAULT_CONFIGURATION = new LoggingConfiguration();

type Tag = string | (() => void) | { name: string } | undefined;

function isTag(tag: any): tag is Tag {
  // Basic typeof check
  switch (typeof tag) {
    case "string":
    case "function":
    case "undefined":
      return true;
  }

  // Get rid of null (also false and 0, but that doesn't matter)
  if (!tag) {
    return false;
  }

  if (typeof tag.name === "string") {
    return true;
  }

  return false;
}

/**
 * Main entrypoint into the library
 */
export default class Logger {
  /**
   * Configuration of this Logger
   */
  private readonly config: LoggingConfiguration;
  /**
   * Tag to add as first parameter to all messages logged by this Logger
   */
  private readonly tag?: string;

  /**
   * Create a new instance of Logger
   * @param tag Tag for this Logger
   * @param config Configuration for this Logger
   */
  constructor(tag?: string | { name: string } | (() => void));
  constructor(config: LoggingConfiguration);
  constructor(
    tag: string | { name: string } | (() => void),
    config?: LoggingConfiguration
  );
  constructor(
    tag?: string | { name: string } | LoggingConfiguration,
    config: LoggingConfiguration = DEFAULT_CONFIGURATION
  ) {
    let actualTag: string | undefined;
    let actualConfig: LoggingConfiguration;

    if (isTag(tag)) {
      if (typeof tag === "object" || typeof tag === "function") {
        actualTag = tag.name;
      } else {
        actualTag = tag;
      }
      actualConfig = config;
    } else {
      actualConfig = tag;
    }

    this.tag = actualTag;
    this.config = actualConfig;
  }

  /**
   * Checks to see if a message should be logged, and if so log it
   * @param level Log level to log at. Used to determine whether this message should be logged
   * @param verb Method on the `console` object to use
   * @param args Data to log
   */
  private log(
    level: LogLevels,
    verb: "error" | "warn" | "log" | "debug",
    args: any[]
  ) {
    if (this.config.isLevelEnabled(level)) {
      const additionalData = [];
      if (this.tag !== undefined) {
        additionalData.push(`[${this.tag}]`);
      }

      console[verb](...additionalData, ...args);
    }
  }

  /**
   * Logs data at TRACE
   * @param args Data to log
   */
  trace(...args) {
    this.log(LogLevels.TRACE, "debug", args);
  }

  /**
   * Logs data at DEBUG
   * @param args Data to log
   */
  debug(...args) {
    this.log(LogLevels.DEBUG, "debug", args);
  }

  /**
   * Logs data at INFO
   * @param args Data to log
   */
  info(...args) {
    this.log(LogLevels.INFO, "log", args);
  }

  /**
   * Logs data at WARN
   * @param args Data to log
   */
  warn(...args) {
    this.log(LogLevels.WARN, "warn", args);
  }

  /**
   * Logs data at ERROR
   * @param args Data to log
   */
  error(...args) {
    this.log(LogLevels.ERROR, "error", args);
  }

  /**
   * Logs data at FATAL
   * @param args Data to log
   */
  fatal(...args) {
    this.log(LogLevels.FATAL, "error", args);
  }
}
