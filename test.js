const curseAPI = require("./index");

curseAPI.getMods({mc_version: "1.12.2"}).then((result) => {
    console.log(result);
});