const curseforge = require("../index");
const ModFile = require("../objects/Files");

module.exports = class {
	/**
	 * @method Mod.getFiles
	 * @description Simple function to call GetModFiles with predefined identifier.
	 * @see CurseForgeAPI.getModFiles
	 */
	getFiles(options, callback) {
		return curseforge.getModFiles(this.id, options, callback);
	}

	/**
	 * @method Mod.getDescription
	 * @description Simple function to call GetModDescription with predefined identifier.
	 * @see CurseForgeAPI.getModDescription
	 */
	getDescription(callback) {
		return curseforge.getModDescription(this.id, callback);
	}

	/**
	 * @name Mod
	 * @class Mod
	 * @description A Mod Object representing a file of a specific mod
	 * @param {Object} mod_object - Mod object to create object from
	 * @property {number} id - The Curse Id of the mod.
	 * @property {string} name - The display name of the mod.
	 * @property {object[]} authors - An array of authors names.
	 * @property {object[]} attachments - An array of attachments objects from the description.
	 * @property {string} url - The url to the mods page.
	 * @property {string} summary - A short description to advertise the mod.
	 * @property {number} defaultFileId - The default file id of the mod.
	 * @property {number} downloads - The amount of downloads of the mod.
	 * @property {ModFile[]} latestFiles - An array of ModFile's containing the latest files.
	 * @property {string} key - The Curse slug of the mod.
	 * @property {boolean} featured - Is the mod featured?
	 * @property {number} popularityScore - Some kind of score? Not sure.
	 * @property {number} gamePopularityRank - The rank of the mod.
	 * @property {string} primaryLanguage - the primary language of the mod
	 * @property {object} logo - The attachment object of the logo of the mod.
	 * @property {timestamp} created - A timestamp of the time the mod got created.
	 * @property {timestamp} updated - A timestamp of the time the mod got updated.
	 * @property {timestamp} released - A timestamp of the time the mod got released.
	 * @property {boolean} available - true if the mod is available.
	 * @property {boolean} experimental - true if the mod is experimental.
	 */
	constructor(mod_object) {
		this.id = mod_object.id;
		this.name = mod_object.name;
		this.authors = mod_object.authors;
		this.attachments = mod_object.attachments;
		this.url = mod_object.websiteUrl;
		this.summary = mod_object.summary;
		this.defaultFileId = mod_object.defaultFileId;
		this.downloads = mod_object.downloadCount;
		this.latestFiles = [];
		for (let f of mod_object.latestFiles) {
			this.latestFiles.push(new ModFile(f));
		}
		this.key = mod_object.slug;
		this.featured = mod_object.isFeatured;
		this.popularityScore = mod_object.popularityScore;
		this.gamePopularityRank = mod_object.gamePopularityRank;
		this.primaryLanguage = mod_object.primaryLanguage;
		this.logo = this.attachments[0];
		this.updated = mod_object.dateModified;
		this.created = mod_object.dateCreated;
		this.released = mod_object.dateReleased;
		this.available = mod_object.isAvailable;
		this.experimental = mod_object.isExperimental;
	}
};
