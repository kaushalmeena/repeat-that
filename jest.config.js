/** @type {import("jest").Config} */
module.exports = {
  preset: "jest-expo",
  moduleNameMapper: {
    // Mirrors the "@/*" alias in tsconfig.json, which Jest does not read.
    "^@/(.*)$": "<rootDir>/src/$1"
  }
};
