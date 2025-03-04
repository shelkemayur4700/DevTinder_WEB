// PRODUCTION
// export const BASE_URL = "/api";

// LOCAL DEVELOPMENT
export const BASE_URL =
  location?.hostname === "localhost" ? "http://localhost:7777" : "/api";
export const STRIPE_REDIRECT_URL =
  location?.hostname === "localhost"
    ? "http://localhost:5173"
    : "https://devtinder.digital";
