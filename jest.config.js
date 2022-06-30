module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.+\\.ts?$": "ts-jest",
    "^.+\\.js?$": "<rootDir>/node_modules/babel-jest",
    "^.+\\.tsx?$": "<rootDir>/node_modules/babel-jest",
  },
  transformIgnorePatterns: ["<rootDir>/node_modules"],
  moduleFileExtensions: ["js", "ts", "tsx"],
};
