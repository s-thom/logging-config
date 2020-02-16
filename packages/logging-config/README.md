# `@sthom/logging-config`

Logging configuration for Javascript and Typescript.

This exists because the only way to stop my brain from shouting "you need to make a terrible logging library" is to make a terrible logging library.

Using this with React? Have a look at [https://www.npmjs.com/package/@sthom/logging-config-react](https://www.npmjs.com/package/@sthom/logging-config-react).

## Usage

Basic example:

```ts
import Logger from "@sthom/logging-config";

// Create a new logger
const logger = new Logger();

logger.info("Hello world!");
```

Only error and fatal messages:

```ts
import Logger, {
  DEFAULT_CONFIGURATION,
  LevelDefaults
} from "@sthom/logging-config";

// This is applied over all Loggers that don't have custom configuration given
DEFAULT_CONFIGURATION.setLogLevel(LevelDefaults.ERROR);

const logger = new Logger();
logger.info("Hello world!"); // Not logged
logger.error("Hello world!"); // Is logged
```

Different configuration per Logger:

```ts
import Logger, {
  LoggingConfiguration,
  LevelDefaults
} from "@sthom/logging-config";

const config1 = new LoggingConfiguration(LevelDefaults.INFO);
const config2 = new LoggingConfiguration(LevelDefaults.ERROR);

const logger1 = new Logger(config1);
const logger2 = new Logger(config2);

logger1.info("Hello world!"); // Is logged
logger2.info("Hello world!"); // Not logged
```

## Log levels

The following levels, in order of increasing severity, are available:

- TRACE: `logger.trace`
- DEBUG: `logger.debug`
- INFO: `logger.info`
- WARN: `logger.trace`
- ERROR: `logger.error`
- FATAL: `logger.fatal`

Support for custom levels may come in the future.
