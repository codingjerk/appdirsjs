# appdirsjs

![GitHub Workflow Status](https://img.shields.io/github/workflow/status/codingjerk/appdirsjs/ci)

![Codecov](https://img.shields.io/codecov/c/gh/codingjerk/appdirsjs?token=123)

![npm](https://img.shields.io/npm/v/appdirsjs)

![npm bundle size](https://img.shields.io/bundlephobia/min/appdirsjs)

![GitHub](https://img.shields.io/github/license/codingjerk/appdirsjs)

A node.js library to get paths to directories to store configs, caches and data according to OS standarts.

## Installation

```sh
npm install appdirsjs
```

or

```sh
yarn install appdirsjs
```

if you're using yarn.

## Usage

```javascript
import appDirs from "appdirsjs";

const dirs = appDirs({ app: "expo" });

console.log(dirs.cache);
// /home/user/.cache/expo on Linux
// /home/User/Library/Caches/expo on MacOS
// C:\User\User\AppData\Local\Temp on Windows

console.log(dirs.config);
// /home/user/.config/expo on Linux
// /home/User/Library/Preferences/expo on MacOS
// C:\Users\User\AppData\Roaming\expo

console.log(dirs.data);
// /home/user/.local/share/expo on Linux
// /home/User/Library/Application Support/expo on MacOS
// C:\Users\User\AppData\Local\expo
```

### Keep backward compability

Then switching from old-style dotfile directory,
such as `~/.myapp` to new, like `~/.config/myapp`,
you can pass `legacyPath` parameter
to keep using old directory if it exists:

```javascript
import * as path from "path";
import appDirs from "appdirsjs";

const dirs = appDirs({
  app: "expo",
  // Notice usage of full path
  legacyPath: path.join(os.homedir(), ".expo"),
});

console.log(dirs.config);
// /home/user/.expo
```

## TODO

- [ ] GitHub actions integration and codecov
- [ ] Android support
- [ ] MacOS support
- [ ] Windows support
