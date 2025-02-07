# appdirsjs

[![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/codingjerk/appdirsjs/ci.yml)](https://github.com/codingjerk/appdirsjs/actions)
[![Codecov](https://img.shields.io/codecov/c/gh/codingjerk/appdirsjs)](https://codecov.io/gh/codingjerk/appdirsjs)
[![npm](https://img.shields.io/npm/v/appdirsjs)](https://www.npmjs.com/package/appdirsjs)
[![npm bundle size](https://img.shields.io/bundlephobia/min/appdirsjs)](https://www.npmjs.com/package/appdirsjs)
[![GitHub](https://img.shields.io/badge/license-MIT-blue)](https://github.com/codingjerk/appdirsjs/blob/master/_LICENSE.md)

A lightweight Node.js library providing standardized paths for directories to store configs, caches, and data files according to OS standards. On Linux it's following XDG Base Directory Specification. On MacOS and Windows it's following Apple and Microsoft guidelines.

## Installation

Using npm:

```sh
npm install appdirsjs
```

Or if you use Yarn:

```sh
yarn install appdirsjs
```

## Usage

```javascript
import appDirs from "appdirsjs";

const dirs = appDirs({ appName: "expo" });

// Display the OS-specific cache directory for temporary files
console.log("Cache Directory:", dirs.cache);
//   Linux:    /home/user/.cache/expo
//   macOS:    /Users/User/Library/Caches/expo
//   Windows:  C:\Users\User\AppData\Local\Temp\expo

// Display the OS-specific configuration directory for user settings
console.log("Config Directory:", dirs.config);
//   Linux:    /home/user/.config/expo
//   macOS:    /Users/User/Library/Preferences/expo
//   Windows:  C:\Users\User\AppData\Roaming\expo

// Display the OS-specific data directory for application data
console.log("Data Directory:", dirs.data);
//   Linux:    /home/user/.local/share/expo
//   macOS:    /Users/User/Library/Application Support/expo
//   Windows:  C:\Users\User\AppData\Local\expo
```

### Keep backward compatibility

Then switching from old-style dotfile directory,
such as `~/.myapp` to new, like `~/.config/myapp`,
you can pass `legacyPath` parameter
to keep using old directory if it exists:

```javascript
import * as os from "os";
import * as path from "path";
import appDirs from "appdirsjs";

const dirs = appDirs({
  appName: "expo",
  // Use legacy directory if it exists
  legacyPath: path.join(os.homedir(), ".expo"),
});

console.log("Configuration Directory:", dirs.config);
// For instance, on Linux: /home/user/.expo
```

## TODO

- [ ] Android support
- [ ] XDG on BSD support
