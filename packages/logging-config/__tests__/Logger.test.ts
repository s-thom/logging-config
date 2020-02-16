import mockConsole from "jest-mock-console";
import Logger, {
  LevelDefaults,
  LoggingConfiguration
} from "../src/logging-config";

const loggerConfiguration = new LoggingConfiguration();
let mockResetFunction;
beforeEach(() => {
  mockResetFunction = mockConsole(["debug", "log", "warn", "error"]);
});
afterEach(() => {
  mockResetFunction();
});

test("Logger logs at trace", () => {
  const logger = new Logger(loggerConfiguration);

  expect(console.debug).toBeCalledTimes(0);

  logger.trace("test");

  expect(console.debug).toBeCalledTimes(1);
  expect(console.debug).toHaveBeenLastCalledWith("test");
});

test("Logger logs at debug", () => {
  const logger = new Logger(loggerConfiguration);

  expect(console.debug).toBeCalledTimes(0);

  logger.debug("test");

  expect(console.debug).toBeCalledTimes(1);
  expect(console.debug).toHaveBeenLastCalledWith("test");
});

test("Logger logs at info", () => {
  const logger = new Logger(loggerConfiguration);

  expect(console.log).toBeCalledTimes(0);

  logger.info("test");

  expect(console.log).toBeCalledTimes(1);
  expect(console.log).toHaveBeenLastCalledWith("test");
});

test("Logger logs at warn", () => {
  const logger = new Logger(loggerConfiguration);

  expect(console.warn).toBeCalledTimes(0);

  logger.warn("test");

  expect(console.warn).toBeCalledTimes(1);
  expect(console.warn).toHaveBeenLastCalledWith("test");
});

test("Logger logs at error", () => {
  const logger = new Logger(loggerConfiguration);

  expect(console.error).toBeCalledTimes(0);

  logger.error("test");

  expect(console.error).toBeCalledTimes(1);
  expect(console.error).toHaveBeenLastCalledWith("test");
});

test("Logger logs at fatal", () => {
  const logger = new Logger(loggerConfiguration);

  expect(console.error).toBeCalledTimes(0);

  logger.fatal("test");

  expect(console.error).toBeCalledTimes(1);
  expect(console.error).toHaveBeenLastCalledWith("test");
});

test("Changing the log level affect what is logged", () => {
  const config = new LoggingConfiguration();
  const logger = new Logger(config);

  expect(console.log).toBeCalledTimes(0);

  logger.info("test");

  expect(console.log).toBeCalledTimes(1);
  expect(console.log).toHaveBeenLastCalledWith("test");

  config.setLogLevel(LevelDefaults.ERROR);

  logger.info("test");

  expect(console.log).toBeCalledTimes(1);
});

test("The log level can be changed with a number", () => {
  const config = new LoggingConfiguration();
  const logger = new Logger(config);

  expect(console.log).toBeCalledTimes(0);

  logger.info("test");

  expect(console.log).toBeCalledTimes(1);
  expect(console.log).toHaveBeenLastCalledWith("test");

  config.setLogLevel(0);

  logger.info("test");

  expect(console.log).toBeCalledTimes(1);
});

test("The log level can be changed with the name of a log level", () => {
  const config = new LoggingConfiguration();
  const logger = new Logger(config);

  expect(console.log).toBeCalledTimes(0);

  logger.info("test");

  expect(console.log).toBeCalledTimes(1);
  expect(console.log).toHaveBeenLastCalledWith("test");

  config.setLogLevel("ERROR");

  logger.info("test");

  expect(console.log).toBeCalledTimes(1);
});

test("The log level is changed to the default when an unknown error level name is given", () => {
  const config = new LoggingConfiguration();
  const logger = new Logger(config);

  expect(console.log).toBeCalledTimes(0);

  logger.info("test");

  expect(console.log).toBeCalledTimes(1);
  expect(console.log).toHaveBeenLastCalledWith("test");

  config.setLogLevel("something unknown" as any);

  logger.info("test");

  expect(console.log).toBeCalledTimes(2);
});

test("Logger adds the tag when given a tag", () => {
  const logger = new Logger("Tag");

  expect(console.log).toBeCalledTimes(0);

  logger.info("test");

  expect(console.log).toBeCalledTimes(1);
  expect(console.log).toHaveBeenLastCalledWith("[Tag]", "test");
});

test("Logger adds the tag when given a tag and a configuration", () => {
  const config = new LoggingConfiguration();
  const logger = new Logger("Tag", config);

  expect(console.log).toBeCalledTimes(0);

  logger.info("test");

  expect(console.log).toBeCalledTimes(1);
  expect(console.log).toHaveBeenLastCalledWith("[Tag]", "test");
});
