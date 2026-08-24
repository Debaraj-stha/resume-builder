// Testing access must be explicitly enabled. Production is freemium by default.
export const TESTING_ACCESS_ENABLED =
  String(import.meta.env.VITE_RESUAI_TESTING_ACCESS ?? "false").toLowerCase() === "true";
