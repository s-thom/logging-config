import mockConsole from "jest-mock-console";
import Logger, { LevelDefaults } from "../src/logging-config";

let mockResetFunction;
beforeEach(() => {
  mockResetFunction = mockConsole(["debug", "log", "warn", "error"]);
});
afterEach(() => {
  mockResetFunction();
});

test("Logger logs at trace", () => {
  const logger = new Logger();
  logger.setLogLevel(LevelDefaults.ALL);

  expect(console.debug).toBeCalledTimes(0);

  logger.trace("test");

  expect(console.debug).toBeCalledTimes(1);
  expect(console.debug).toHaveBeenLastCalledWith("test");
});

test("Logger logs at debug", () => {
  const logger = new Logger();
  logger.setLogLevel(LevelDefaults.ALL);

  expect(console.debug).toBeCalledTimes(0);

  logger.debug("test");

  expect(console.debug).toBeCalledTimes(1);
  expect(console.debug).toHaveBeenLastCalledWith("test");
});

test("Logger logs at info", () => {
  const logger = new Logger();
  logger.setLogLevel(LevelDefaults.ALL);

  expect(console.log).toBeCalledTimes(0);

  logger.info("test");

  expect(console.log).toBeCalledTimes(1);
  expect(console.log).toHaveBeenLastCalledWith("test");
});

test("Logger logs at warn", () => {
  const logger = new Logger();
  logger.setLogLevel(LevelDefaults.ALL);

  expect(console.warn).toBeCalledTimes(0);

  logger.warn("test");

  expect(console.warn).toBeCalledTimes(1);
  expect(console.warn).toHaveBeenLastCalledWith("test");
});

test("Logger logs at error", () => {
  const logger = new Logger();
  logger.setLogLevel(LevelDefaults.ALL);

  expect(console.error).toBeCalledTimes(0);

  logger.error("test");

  expect(console.error).toBeCalledTimes(1);
  expect(console.error).toHaveBeenLastCalledWith("test");
});

test("Logger logs at fatal", () => {
  const logger = new Logger();
  logger.setLogLevel(LevelDefaults.ALL);

  expect(console.error).toBeCalledTimes(0);

  logger.fatal("test");

  expect(console.error).toBeCalledTimes(1);
  expect(console.error).toHaveBeenLastCalledWith("test");
});
