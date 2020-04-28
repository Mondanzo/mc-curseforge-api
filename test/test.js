const curseforge = require("../index");
const assert = require("assert");

describe("getMods", function () {
	it("should return list of mods with no filtering containing only 25 items", async function () {
		this.timeout(10000);

		let mods = await curseforge.getMods({ pageSize: 25 });
		assert.ok(mods.length == 25);
		let mod = mods.pop();
		assert.ok(mod.hasOwnProperty("id"));
		assert.ok(mod.hasOwnProperty("key"));
		assert.ok(mod.hasOwnProperty("name"));
		assert.ok(mod.hasOwnProperty("summary"));
		assert.ok(mod.hasOwnProperty("attachments"));
		assert.ok(mod.hasOwnProperty("defaultFileId"));
		assert.ok(mod.hasOwnProperty("featured"));
		assert.ok(mod.hasOwnProperty("primaryLanguage"));
		assert.ok(mod.hasOwnProperty("gamePopularityRank"));
		assert.ok(mod.hasOwnProperty("popularityScore"));
		assert.ok(mod.hasOwnProperty("latestFiles"));
		assert.ok(mod.hasOwnProperty("url"));
		assert.ok(mod.hasOwnProperty("authors"));
		assert.ok(mod.hasOwnProperty("logo"));
		assert.ok(mod.hasOwnProperty("downloads"));
		assert.ok(mod.hasOwnProperty("created"));
		assert.ok(mod.hasOwnProperty("updated"));
		assert.ok(mod.hasOwnProperty("released"));
		assert.ok(mod.hasOwnProperty("available"));
		assert.ok(mod.hasOwnProperty("experimental"));
	});

	it("should have a complete mod object returned from getMod after finding mod using key gathered from getMods", async function () {
		this.timeout(10000);

		let mod = await curseforge.getMod(
			(await curseforge.getMods({ pageSize: 1 })).pop().id
		);
		assert.ok(mod.hasOwnProperty("id"));
		assert.ok(mod.hasOwnProperty("key"));
		assert.ok(mod.hasOwnProperty("name"));
		assert.ok(mod.hasOwnProperty("summary"));
		assert.ok(mod.hasOwnProperty("attachments"));
		assert.ok(mod.hasOwnProperty("defaultFileId"));
		assert.ok(mod.hasOwnProperty("featured"));
		assert.ok(mod.hasOwnProperty("primaryLanguage"));
		assert.ok(mod.hasOwnProperty("gamePopularityRank"));
		assert.ok(mod.hasOwnProperty("popularityScore"));
		assert.ok(mod.hasOwnProperty("latestFiles"));
		assert.ok(mod.hasOwnProperty("url"));
		assert.ok(mod.hasOwnProperty("authors"));
		assert.ok(mod.hasOwnProperty("logo"));
		assert.ok(mod.hasOwnProperty("downloads"));
		assert.ok(mod.hasOwnProperty("created"));
		assert.ok(mod.hasOwnProperty("updated"));
		assert.ok(mod.hasOwnProperty("released"));
		assert.ok(mod.hasOwnProperty("available"));
		assert.ok(mod.hasOwnProperty("experimental"));
	});

	it("should return a list of dependencies for Tinkers Construct only containing mantle", async function () {
		this.timeout(10000);
		let file = (await curseforge.getModFiles("74072")).pop();
		let deps = await file.getDependencies();
		assert.ok(deps.length > 0);
		assert.ok(deps.pop().key === "mantle");
	});

	it("should return a list of dependencies files for Tinkers Construct only containing mantle", async function () {
		this.timeout(10000);
		let file = (await curseforge.getModFiles("74072")).pop();
		let deps = await file.getDependenciesFiles();
		assert.ok(deps.length > 0);
	});

	it("should return a html string", async function () {
		this.timeout(10000);
		let description = await curseforge.getModDescription("74072");
		assert.ok(typeof description === "string");
		assert.ok(description[0] === "<");
	});

	it("Should simulate a download", async function () {
		this.timeout(10000);
		let file = (await curseforge.getModFiles("74072")).pop();
		let p = await file.download("/file.jar", false, true);
		assert.ok(p === "/file.jar");
	});
});
