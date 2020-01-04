const curseforge = require("../index");
const assert = require("assert");

describe("getMods", function(){
    it("should return list of mods with no filtering", async function(){
        let mods = await curseforge.getMods();
        assert.ok(mods.length > 0);
        let mod = mods.pop();
        assert.ok(mod.hasOwnProperty("id"));
        assert.ok(mod.hasOwnProperty("key"));
        assert.ok(mod.hasOwnProperty("name"));
        assert.ok(mod.hasOwnProperty("blurb"));
        assert.ok(mod.hasOwnProperty("description"));
        assert.ok(mod.hasOwnProperty("url"));
        assert.ok(mod.hasOwnProperty("owner"));
        assert.ok(mod.hasOwnProperty("categories"));
        assert.ok(mod.hasOwnProperty("logo"));
        assert.ok(mod.hasOwnProperty("downloads"));
        assert.ok(mod.hasOwnProperty("created"));
        assert.ok(mod.hasOwnProperty("updated"));
        assert.ok(mod.hasOwnProperty("visited"));
    });
    
    it("should have a complete mod object returned from getMod after finding mod using key gathered from getMods", async function(){
        let mod = await curseforge.getMod((await curseforge.getMods()).pop().key);
        assert.ok(mod.hasOwnProperty("id"));
        assert.ok(mod.hasOwnProperty("key"));
        assert.ok(mod.hasOwnProperty("name"));
        assert.ok(mod.hasOwnProperty("blurb"));
        assert.ok(mod.hasOwnProperty("description"));
        assert.ok(mod.hasOwnProperty("url"));
        assert.ok(mod.hasOwnProperty("owner"));
        assert.ok(mod.hasOwnProperty("categories"));
        assert.ok(mod.hasOwnProperty("logo"));
        assert.ok(mod.hasOwnProperty("downloads"));
        assert.ok(mod.hasOwnProperty("created"));
        assert.ok(mod.hasOwnProperty("updated"));
        assert.ok(mod.hasOwnProperty("visited"));
    });
})
