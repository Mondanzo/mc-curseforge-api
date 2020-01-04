const curseforge = require("../index");

module.exports = class {

    /**
     * @method Mod.getFiles
     * @description Simple function to call GetModFiles with predefined identifier.
     * @see CurseForgeAPI.getModFiles
     */
    getFiles(options, callback){
        return curseforge.getModFiles(this.id, options, callback);
    }

    /**
     * @name Mod
     * @class Mod
     * @description A Mod Object representing a file of a specific mod
     * @param {Object} mod_object - Mod object to create object from
     * @property {number} id - The Curse Id of the mod.
     * @property {string} key - The Curse slug of the mod.
     * @property {string} name - The display name of the mod.
     * @property {string} description - A detailed description of the mod in html.
     * @property {string} url - The url to the mods page.
     * @property {string} owner - The name of the creator.
     * @property {string[]} categories - Array of user-defined categories for this mod.
     * @property {string} logo - The url to the logo of the mod.
     * @property {number} downloads - The amount of downloads of the mod.
     * @property {timestamp} created - A timestamp of the time the mod got created.
     * @property {timestamp} updated - A timestamp of the time the mod got updated.
     * @property {timestamp} visited - ...A timestamp? Honestly, I don't know.
     */
    constructor(mod_object){
        this.id = mod_object.id;
        this.key = mod_object.key;
        this.name = mod_object.name;
        this.blurb = mod_object.blurb;
        this.description = mod_object.description;
        this.url = mod_object.url;
        this.owner = mod_object.owner;
        this.categories = mod_object.categories;
        this.logo = mod_object.avatar;
        this.downloads = mod_object.download_count;
        this.created = mod_object.created;
        this.updated = mod_object.updated;
        this.visited = mod_object.visited;
    }
}