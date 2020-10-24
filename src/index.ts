import * as fs from "fs";
import * as os from "os";
import * as path from "path";

type Options = {
  appName: string,
  legacyPath?: string,
};

type Directories = {
  // Temporary, non-essential files (caches, logs)
  cache: string,
  // User-specific configuration
  config: string,
  // User data
  data: string,

  // Special files (sockets, named pipes, etc.)
  // Can be undefined
  runtime?: string,
};

/**
 * Returns application-specific paths for directories.
 *
 * For Linux, it returns paths according to
 * [XDG Base Directory Specification](https://specifications.freedesktop.org/basedir-spec/basedir-spec-latest.html)
 *
 * For MacOS, it returns paths according to
 * [Apple Technical Q&A](https://developer.apple.com/library/archive/qa/qa1170/_index.html#//apple_ref/doc/uid/DTS10001702)
 *
 * For Windows, it returns paths according to
 * [Stackoverflow's answer](https://stackoverflow.com/questions/43853548/xdg-basedir-directories-for-windows)
 *
 * Specific information about each OS can be found
 * in corresponding functions.
 *
 * @param appName  Application name
 * @param legacyPath  Path to provide backward compability
 *                    and not to force users to move files.
 *                    Will be used if exists if filesystem.
 */
export default function appDirs(options: Options): Directories {
  if (process.platform === "linux") {
    return linux(options);
  }

  return fallback(options)
}

function fallback({ appName, legacyPath }: Options): Directories {
  console.warn(`[appdirsjs]: can't get directories for "${process.platform}" platform, using fallback values`)

  function fallbackPath() {
    if (legacyPath) {
      return legacyPath;
    }

    // Sane default for Unix-like systems
    return path.join(os.homedir(), "." + appName);
  }

  return Object.freeze({
    cache: fallbackPath(),
    config: fallbackPath(),
    data: fallbackPath(),
  });
}

function linux({ appName, legacyPath }: Options): Directories {
  const home = os.homedir();
  const uid = process.getuid();
  const env = process.env;

  function xdgPath(
    allowLegacy: boolean,
    env: string | undefined,
    defaultRoot: string,
  ): string {
    if (allowLegacy && legacyPath && fs.existsSync(legacyPath)) {
      return legacyPath;
    }

    const root = env || defaultRoot;
    return path.join(root, appName);
  }

  return Object.freeze({
    cache: xdgPath(true, env.XDG_CACHE_HOME, path.join(home, ".cache")),
    config: xdgPath(true, env.XDG_CONFIG_HOME, path.join(home, ".config")),
    data: xdgPath(true, env.XDG_DATA_HOME, path.join(home, ".local", "share")),
    runtime: xdgPath(false, env.XDG_RUNTIME_DIR, path.join("/run", "user", uid.toString())),
  });
}
