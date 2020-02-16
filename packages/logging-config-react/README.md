# `@sthom/logging-config-react`

Logging configuration for Javascript and Typescript.

This exists because the only way to stop my brain from shouting "you need to make a terrible logging library" is to make a terrible logging library.

Make sure to look at the original module: [https://www.npmjs.com/package/@sthom/logging-config](https://www.npmjs.com/package/@sthom/logging-config).

## Usage

Basic example:

```ts
import useLogger from "@sthom/logging-config-react";

// In your component
const logger = useLogger();

logger.info("Hello world!");
```

Configuration using context:

```tsx
import { LoggingConfiguration } from "@sthom/logging-config";
import { LoggingConfigurationContext } from "@sthom/logging-config-react";

<LoggingConfigurationContext value={new LoggingConfiguration("ERROR")}>
  {/* Rest of your app */}
</LoggingConfigurationContext>;
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
