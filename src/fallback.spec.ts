import appDirs from "./index";

let warn_mock: jest.SpyInstance;

test("It generates warning on unknown OS", () => {
  appDirs({appName: "zathura"});
  expect(warn_mock).toBeCalled();
});

test("It provides fallback paths on unknown OS", () => {
  const d = appDirs({appName: "zathura"});

  expect(d.cache).toEqual("/home/user/.zathura");
  expect(d.config).toEqual("/home/user/.zathura");
  expect(d.data).toEqual("/home/user/.zathura");
});

test("It returns legacy path on unknown OS if provided (even if not existed)", () => {
  const d = appDirs({appName: "zathura", legacyPath: "/not/existed/path/zathura"});

  expect(d.cache).toEqual("/not/existed/path/zathura");
});

import * as os from "os";

type TestContext = {
  original_platform: string,
};

beforeEach(function(this: TestContext) {
  this.original_platform = process.platform;
  Object.defineProperty(process, "platform", { value: "imaginary_os" });

  const pass = () => { /* pass */ };
  warn_mock = jest.spyOn(console, "warn").mockImplementation(pass);
  jest.spyOn(os, "homedir").mockReturnValue("/home/user");
});

afterEach(function(this: TestContext) {
  Object.defineProperty(process, "platform", { value: this.original_platform });
  jest.spyOn(console, "warn").mockRestore();
  jest.spyOn(os, "homedir").mockRestore();
});
