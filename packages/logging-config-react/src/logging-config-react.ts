import Logger, {
  DEFAULT_CONFIGURATION,
  LoggingConfiguration
} from "@sthom/logging-config";
import React, { useContext, useMemo } from "react";

const loggerContext = React.createContext(DEFAULT_CONFIGURATION);

/**
 * Context for LoggingConfiguration
 */
export const LoggingConfigurationContext = loggerContext.Provider;

/**
 * Hook to get a Logger instance.
 *
 * In order to change configuration of the logger, it's recommended to use LoggingConfigurationContext.
 * @param tag Tag for this logger
 * @param config Configuration object for this logger
 */
export default function useLogger(tag?: string);
export default function useLogger(tag?: string, config?: LoggingConfiguration);
export default function useLogger(tag?: string, config?: LoggingConfiguration) {
  const contextConfig = useContext(loggerContext);
  const configToUse = config ?? contextConfig;

  return useMemo(() => new Logger(tag, configToUse), [tag, configToUse]);
}
