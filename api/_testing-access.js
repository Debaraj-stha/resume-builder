/* global process */

// Temporary launch-validation switch. Set RESUAI_TESTING_ACCESS=false before
// public launch to restore the normal freemium limits without changing code.
export const isTestingAccessEnabled = () =>
  String(process.env.RESUAI_TESTING_ACCESS ?? "false").toLowerCase() === "true";
