# app-dirs

A node.js library to get paths to directories to store configs, caches and data according to OS standarts.

## Installation

```sh
npm install app-dirs

or

```sh
yarn install app-dirs
```

if you're using yarn.

## Usage

```javascript
import appDirs from "app-dirs";

const dirs = appDirs({ app: "expo" });

console.log(dirs.cache);
// - /home/user/.cache/expo on Linux
// - /home/User/Library/Caches/expo on MacOS
// - C:\User\User\AppData\Local\Temp on Windows

console.log(dirs.config);
// - /home/user/.config/expo on Linux
// - /home/User/Library/Preferences/expo on MacOS
// - C:\Users\User\AppData\Roaming\expo

console.log(dirs.data);
// - /home/user/.local/share/expo on Linux
// - /home/User/Library/Application Support/expo on MacOS
// - C:\Users\User\AppData\Local\expo
```

### Keep backward compability

Then switching from old-style dotfile directory,
such as `~/.myapp` to new, like `~/.config/myapp`,
you can pass `legacyPath` parameter
to keep using old directory if it exists:

```javascript
import * as path from "path";
import appDirs from "app-dirs";

const dirs = appDirs({
  app: "expo",
  // Notice usage of full path
  legacyPath: path.join(os.homedir(), ".expo"),
});

console.log(dirs.config);
// - /home/user/.expo
```

## TODO

- [ ] GitHub actions integration and codecov
- [ ] Android support
- [ ] MacOS support
- [ ] Windows support
