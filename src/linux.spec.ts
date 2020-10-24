import appDirs from "./index";

test("It uses XDG default paths", () => {
  const d = appDirs({appName: "chromium"});

  expect(d.cache).toBe("/home/user/.cache/chromium");
  expect(d.config).toBe("/home/user/.config/chromium");
  expect(d.data).toBe("/home/user/.local/share/chromium");
  expect(d.runtime).toBe("/run/user/1000/chromium");
});

test("It uses XDG variables if setted", () => {
  process.env.XDG_CACHE_HOME = "/tmp/cache";
  process.env.XDG_CONFIG_HOME = "/home/user/config";
  process.env.XDG_DATA_HOME = "/home/user/.data";
  process.env.XDG_RUNTIME_DIR = "/tmp/user-1000";
  const d = appDirs({appName: "zsh"});

  expect(d.cache).toBe("/tmp/cache/zsh");
  expect(d.config).toBe("/home/user/config/zsh");
  expect(d.data).toBe("/home/user/.data/zsh");
  expect(d.runtime).toBe("/tmp/user-1000/zsh");
});

test("It uses legacy path if exists", () => {
  jest.spyOn(fs, "existsSync").mockReturnValue(true);
  const d = appDirs({appName: "expo", legacyPath: "/home/user/.expo"});

  expect(d.cache).toBe("/home/user/.expo");
  expect(d.config).toBe("/home/user/.expo");
  expect(d.data).toBe("/home/user/.expo");
  expect(d.runtime).toBe("/run/user/1000/expo");
});

import * as os from "os";
import * as fs from "fs";

type TestContext = {
  original_platform: string,
  original_env: any,
};

beforeEach(function(this: TestContext) {
  this.original_platform = process.platform;
  this.original_env = process.env;

  Object.defineProperty(process, "platform", { value: "linux" });
  Object.defineProperty(process, "env", { value: {} });

  jest.spyOn(os, "homedir").mockReturnValue("/home/user");
  jest.spyOn(process, "getuid").mockReturnValue(1000);
  jest.spyOn(fs, "existsSync").mockReturnValue(false);
});

afterEach(function(this: TestContext) {
  Object.defineProperty(process, "platform", { value: this.original_platform });
  Object.defineProperty(process, "env", { value: this.original_env });

  jest.spyOn(os, "homedir").mockRestore();
  jest.spyOn(fs, "existsSync").mockRestore();
});
