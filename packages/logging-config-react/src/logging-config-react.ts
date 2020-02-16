import Logger, { DEFAULT_CONFIGURATION } from "@sthom/logging-config";
import { useMemo } from "react";

export default function useLogger(config = DEFAULT_CONFIGURATION) {
  return useMemo(() => new Logger(config), [config]);
}
