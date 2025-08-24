// // newrelic.js
// require("dotenv").config();

// exports.config = {
//   app_name: [process.env.NEW_RELIC_APP_NAME || "BirdsWorld"],
//   license_key: process.env.NEW_RELIC_LICENSE_KEY || "",
//   logging: {
//     level: process.env.NEW_RELIC_LOG_LEVEL || "info",
//   },
//   allow_all_headers: true,
//   attributes: {
//     // Prefix of attributes to exclude from all destinations
//     exclude: [
//       "request.headers.cookie",
//       "request.headers.authorization",
//       "request.headers.proxyAuthorization",
//       "request.headers.setCookie*",
//       "request.headers.x*",
//       "response.headers.cookie",
//       "response.headers.authorization",
//       "response.headers.proxyAuthorization",
//       "response.headers.setCookie*",
//       "response.headers.x*",
//     ],
//   },
// };


require("dotenv").config();

exports.config = {
  app_name: [process.env.NEW_RELIC_APP_NAME || "BirdsWorld"],
  license_key: process.env.NEW_RELIC_LICENSE_KEY || "",
  logging: {
    level: process.env.NEW_RELIC_LOG_LEVEL || "info",
    application_logging: {
      forwarding: {
        enabled: true,
      },
    },
  },
  allow_all_headers: true,
  attributes: {
    exclude: [
      "request.headers.cookie",
      "request.headers.authorization",
      "request.headers.proxyAuthorization",
      "request.headers.setCookie*",
      "request.headers.x*",
      "response.headers.cookie",
      "response.headers.authorization",
      "response.headers.proxyAuthorization",
      "response.headers.setCookie*",
      "response.headers.x*",
    ],
  },
  /**
   * Datastore / MongoDB specific configuration
   */
  datastore_tracer: {
    enabled: true,                // Enable datastore tracing
    record_sql: "obfuscated",     // Options: off, obfuscated, raw
    explain_enabled: true,        // Capture query explain plans for slow queries
    explain_threshold: 500,       // Milliseconds threshold to run explain plans
  },
  slow_sql: {
    enabled: true,                // Capture slow queries
    threshold: 500,               // Milliseconds threshold to mark as slow
  },
  instrumentation: {
    mongodb: {
      enabled: true,              // Explicitly enable MongoDB instrumentation
    },
  },
  transaction_tracer: {
    enabled: true,
    transaction_threshold: "apdex_f", // Capture slow transactions
    record_sql: "obfuscated",
    stack_trace_threshold: 500,        // Capture stack traces for slow transactions
  },
};
