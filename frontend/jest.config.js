module.exports = {
  roots: ["<rootDir>/src"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
    "^.+\\.js?$": "./config/jest/transformJSFiles.js",
  },
  testMatch: ["**/?(*.)+(spec).ts"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  moduleNameMapper: {
    "Core/(.*)": "<rootDir>/src/js/core/$1",
    "Services/(.*)": "<rootDir>/src/js/services/$1",
    "Constants/(.*)": "<rootDir>/src/js/constants/$1",
    "Components/(.*)": "<rootDir>/src/components/$1",
    "Helper/(.*)": "<rootDir>/src/js/helper/$1",
    "Abstracts/(.*)": "<rootDir>/src/components/abstract/$1",
    "Interfaces/(.*)": "<rootDir>/src/js/interfaces/$1",
    "Icons/(.*)": "<rootDir>/resources/icons/$1",
    "Config/(.*)": "<rootDir>/src/js/config/$1",
  },
  transformIgnorePatterns: ["/node_modules/(?!lit-html).+\\.js"],
};
