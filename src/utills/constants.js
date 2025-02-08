// PRODUCTION
// export const BASE_URL = "/api";

// LOCAL DEVELOPMENT
export const BASE_URL =
  location?.hostname === "localhost" ? "http://localhost:7777" : "/api";
