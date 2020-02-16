# `@sthom/logging-config-react`

Logging configuration for Javascript and Typescript.

This exists because the only way to stop my brain from shouting "you need to make a terrible logging library" is to make a terrible logging library.

Make sure to look at the original module: [https://www.npmjs.com/package/@sthom/logging-config](https://www.npmjs.com/package/@sthom/logging-config).

## Usage

All exports from `@sthom/logging-config` are re-exported in `@sthom/logging-config-react`, so you don't need both in your dependencies.

Basic example:

```ts
import useLogger from "@sthom/logging-config-react";

// In your component
const logger = useLogger();

logger.info("Hello world!");
```

With a tag at the start:

```ts
import Logger from "@sthom/logging-config";

const logger = useLogger("MyComponent");

logger.info("Hello world!"); // Logs: [MyComponent] Hello world!
```

Configuration using context:

```tsx
import {
  LoggingConfiguration,
  LoggingConfigurationContext
} from "@sthom/logging-config-react";

const config = new LoggingConfiguration("ERROR");

// In your component
<LoggingConfigurationContext value={config}>
  {/* Rest of your app */}
</LoggingConfigurationContext>;

// If your log level changes at run-time, you'll want to memoise the config object.
// This is just a measure to prevent unnecessary re-renders of your app.
const level = /* your logic */;
const config = useMemo(() => new LoggingConfiguration(level), [level]);
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
