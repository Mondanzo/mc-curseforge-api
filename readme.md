# mc-curseforge-api [![Codacy Badge](https://api.codacy.com/project/badge/Grade/229792d8c6484b99b47313081248b2fd)](https://www.codacy.com/manual/Mondanzo/mcCurseforgeAPI?utm_source=github.com&utm_medium=referral&utm_content=Mondanzo/mcCurseforgeAPI&utm_campaign=Badge_Grade) [![npm bundle size](https://img.shields.io/bundlephobia/min/mc-curseforge-api) ![npm (tag)](https://img.shields.io/npm/v/mc-curseforge-api/latest)](https://www.npmjs.com/package/mc-curseforge-api)

Yeah a terrible package name but whatever.

This package should make dealing with the Minecraft Mods Curseforge API a lot easier.
Just quickly require it and you're good to go!

## Installation

**Using yarn (which is obviously better)**\
`yarn add mc-curseforge-api`

**Using npm**\
`npm install mc-curseforge-api --save`

## Examples

**Get a list of mods:**

```javascript
const curseforge = require("mc-curseforge-api");

curseforge.getMods().then((mods) => {
    console.log(mods);
});
```

**Search for mods by a string:**

```javascript
curseforge.getMods({ searchFilter: "Vazkii_" }).then((mods) => {
    console.log(mods);
});
```

**Get a list of mods for a specific minecraft version:**

```javascript
curseforge.getMods({ gameVersion: "1.12.2" }).then((mods) => {
    console.log(mods);
});
```

**Use paging for getting mods:**

```javascript
curseforge.getMods({ index: 3, pageSize: 5 }).then((mods) => {
    console.log(mods);
});
```

See [curseforge.getMods](https://mondanzo.github.io/mc-curseforge-api/module-CurseForgeAPI.html#~getMods) for more options.

**Download the mod file for a mod:**

```javascript
mod.getFiles().then((files) => {
    files[0].download("./Mod.jar");
});
```

**Get mod files for a specific minecraft version:**

```javascript
curseforge.getModFiles(225643).then((files) => {
    console.log(files);
});
```

See [curseforge.getModFiles](https://mondanzo.github.io/mc-curseforge-api/module-CurseForgeAPI.html#~getModFiles) for more options.

## Documentation

See the docs for more information [here](https://mondanzo.github.io/mc-curseforge-api/).\
(Those got made with JSDoc and I have no clue how to make them look better.)
