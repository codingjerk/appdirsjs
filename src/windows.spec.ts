import appDirs from "./index";

test("It defaults to AppData/Local and AppData/Roaming", () => {
  const d = appDirs({appName: "htop"});

  expect(d.cache).toBe("C:\\Users\\User\\AppData\\Local\\Temp\\htop");
  expect(d.config).toBe("C:\\Users\\User\\AppData\\Roaming\\htop");
  expect(d.data).toBe("C:\\Users\\User\\AppData\\Local\\htop");
  expect(d.runtime).toBe(undefined);
});

test("It uses APPDATA and LOCALAPPDATA variables", () => {
  process.env.APPDATA = "D:\\AD";
  process.env.LOCALAPPDATA = "E:\\LAD";
  const d = appDirs({appName: "neovim"});

  expect(d.cache).toBe("E:\\LAD\\Temp\\neovim");
  expect(d.config).toBe("D:\\AD\\neovim");
  expect(d.data).toBe("E:\\LAD\\neovim");
});

test("It uses legacy path if exists", () => {
  jest.spyOn(fs, "existsSync").mockReturnValue(true);

  const d = appDirs({appName: "gimp", legacyPath: "C:\\Users\\User\\.gimp"});

  expect(d.cache).toBe("C:\\Users\\User\\.gimp");
  expect(d.config).toBe("C:\\Users\\User\\.gimp");
  expect(d.data).toBe("C:\\Users\\User\\.gimp");
});

import * as os from "os";
import * as path from "path";
import * as fs from "fs";

type TestContext = {
  original_platform: string,
  original_env: any,
};

beforeEach(function(this: TestContext) {
  this.original_platform = process.platform;
  this.original_env = process.env;

  Object.defineProperty(process, "platform", { value: "win32" });
  Object.defineProperty(process, "env", { value: {} });

  jest.spyOn(os, "homedir").mockReturnValue("C:\\Users\\User");
  jest.spyOn(path, "join").mockImplementation((...args) => args.join("\\"));
  jest.spyOn(fs, "existsSync").mockReturnValue(false);
});

afterEach(function(this: TestContext) {
  Object.defineProperty(process, "platform", { value: this.original_platform });
  Object.defineProperty(process, "env", { value: this.original_env });

  jest.spyOn(os, "homedir").mockRestore();
  jest.spyOn(path, "join").mockRestore();
  jest.spyOn(fs, "existsSync").mockRestore();
});
