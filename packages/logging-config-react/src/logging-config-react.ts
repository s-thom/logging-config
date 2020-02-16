import Logger, {
  DEFAULT_CONFIGURATION,
  LoggingConfiguration
} from "@sthom/logging-config";
import React, { useMemo, useContext } from "react";

const loggerContext = React.createContext(DEFAULT_CONFIGURATION);

/**
 * Context for LoggingConfiguration
 */
export const LoggingConfigurationContext = loggerContext.Provider;

/**
 * Hook to get a Logger instance.
 *
 * Use in conjunction with LoggingConfigurationContext to simplify logging
 * @param config Configuration object for this logger
 */
export default function useLogger(config?: LoggingConfiguration) {
  const contextConfig = useContext(loggerContext);

  // Use the configuration passed in first, otherwise use the context provided one
  const configToUse = config ?? contextConfig;

  return useMemo(() => new Logger(configToUse), [configToUse]);
}
