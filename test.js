const curseAPI = require("./index");

curseAPI.getMod("tinkers-construct").then((result) => {
    result.getFiles().then((res) => {
        console.log(res[0].minecraft_versions);
        res[0].getDependenciesFiles().then((resp) => {
            console.log(resp[0][0].minecraft_versions);
        });
    })
});