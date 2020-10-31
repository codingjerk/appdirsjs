import appDirs from "./index";

test("It uses XDG default paths", () => {
  const d = appDirs({appName: "python"});

  expect(d.cache).toBe("/Users/User/Library/Caches/python");
  expect(d.config).toBe("/Users/User/Library/Preferences/python");
  expect(d.data).toBe("/Users/User/Library/Application Support/python");
});

test("It uses legacy path if exists", () => {
  jest.spyOn(fs, "existsSync").mockReturnValue(true);
  const d = appDirs({appName: "alacritty", legacyPath: "/Users/User/.alacritty"});

  expect(d.cache).toBe("/Users/User/.alacritty");
  expect(d.config).toBe("/Users/User/.alacritty");
  expect(d.data).toBe("/Users/User/.alacritty");
});

import * as os from "os";
import * as fs from "fs";

type TestContext = {
  original_platform: string,
};

beforeEach(function(this: TestContext) {
  this.original_platform = process.platform;

  Object.defineProperty(process, "platform", { value: "darwin" });

  jest.spyOn(os, "homedir").mockReturnValue("/Users/User");
  jest.spyOn(fs, "existsSync").mockReturnValue(false);
});

afterEach(function(this: TestContext) {
  Object.defineProperty(process, "platform", { value: this.original_platform });

  jest.spyOn(os, "homedir").mockRestore();
  jest.spyOn(fs, "existsSync").mockRestore();
});
