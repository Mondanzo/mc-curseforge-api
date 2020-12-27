const curseforge = require("../index");

const fs = require("fs");
const ph = require("path");
const crypto = require("crypto");
const https = require("https");

module.exports = class {
	/**
	 * @method ModFile.download
	 * @description Download the file to a specific file
	 * @param {string} path - absolute path to save the mod to.
	 * @param {boolean} override - Should the file be overwritten if it already exists? Defaults to false.
	 * @param {boolean} simulate - Doesn't download a file it just tries to find the proper website. Used for testing.
	 * @param {function} callback - Optional callback to use as alternative to Promise.
	 * @returns {Promise.<path>} A Promise containing the selected absolute path for convenience.
	 */
	download(
		path,
		override = false,
		simulate = false,
		callback,
		url = this.download_url,
		tries = 10
	) {
		if (override && typeof override === "function") {
			callback = override;
			override = false;
		} else if (override && typeof override === "object") {
			override = override.override;
		}

		let promise = new Promise((resolve, reject) => {
			if (tries < 1) reject("Download canceled after 10 redirects.");
			if (!ph.isAbsolute(path)) reject("Path is not absolute.");
			if (fs.existsSync(path)) {
				if (override) fs.unlinkSync(path);
				else reject("File exists and override is false");
			}
			https.get(url, (response) => {
				if (response.statusCode >= 300 && response.statusCode < 400) {
					if (response.headers["location"])
						resolve(
							this.download(
								path,
								override,
								simulate,
								callback,
								response.headers["location"],
								tries - 1
							)
						);
					return;
				} else if (response.statusCode !== 200) {
					reject("File couldn't be downloaded.");
				}
				if (simulate) {
					resolve(path);
					return;
				} else {
					response.pipe(fs.createWriteStream(path));
					response.on("end", () => {
						resolve(path);
					});
				}
			});
		});

		if (callback && typeof callback === "function")
			promise.then(callback.bind(null, null), callback);

		return promise;
	}

	/**
	 * @private
	 * @param {curseforge.getMod} method
	 * @param {function} callback
	 */
	__please_dont_hate_me(method, callback) {
		let promise = new Promise((resolve, reject) => {
			let mods = [];
			let amount = this.mod_dependencies.length;
			if(amount <= 0){
				resolve([]);	
			}
			for (let dep of this.mod_dependencies) {
				method(dep.addonId)
					.then((res) => {
						mods.push(res);
						if (--amount === 0) {
							resolve(mods);
						}
					})
					.catch((err) => reject);
			}
		});
		if (callback && typeof callback === "function")
			promise.then(callback.bind(null, null), callback);

		return promise;
	}

	/**
	 * @method ModFile.getDependencies
	 * @description Get all dependencies required by this mod.
	 * @param {function} callback - Optional callback to use as alternative to Promise
	 * @returns {Promise.<Mod[], Error>} Array of Mods who are marked as dependency or an empty array if no dependencies exist.
	 */
	getDependencies(callback) {
		return this.__please_dont_hate_me(curseforge.getMod, callback);
	}

	/**
	 * @method ModFile.getDependenciesFiles
	 * @description Get all dependencies required by this mod.
	 * @param {function} callback - Optional callback to use as alternative to Promise
	 * @returns {Promise.<ModFile[], Error>} Array of ModFiles who are marked as dependency or an empty array if no dependencies exist.
	 */
	getDependenciesFiles(callback) {
		return this.__please_dont_hate_me(curseforge.getModFiles, callback);
	}

	/**
	 * @name ModFile
	 * @class ModFile
	 * @description A File Object representing a file of a specific mod
	 * @param {Object} file_object - File object to create object from
	 * @property {string[]} minecraft_versions - The minecraft versions this mod file is compatible with.
	 * @property {string} file_name - The name of the mod file it got stored with.
	 * @property {string} file_size - The size of the mod file as string. (Yeah it's gross)
	 * @property {string} release_type - the type of the mod file release.
	 * @property {string} mod_key - The Curse slug of the mod the file belongs to.
	 * @property {string} download_url - The url to the mod file to download.
	 * @property {number} downloads - The amount of downloads of this mod file.
	 * @property {timestamp} timestamp - A timestamp of the time the file got uploaded.
	 * @property {string[]} mod_dependencies - A list of dependencies for this file.
	 * @property {boolean} available - true if the file is available.
	 */
	constructor(file_object) {
		this.id = file_object.id;
		this.minecraft_versions = file_object.gameVersion;
		this.file_name = file_object.file_name;
		this.file_size = file_object.fileLength;
		this.timestamp = file_object.fileDate;
		this.release_type = file_object.releaseType;
		this.download_url = file_object.downloadUrl;
		this.downloads = file_object.download_count;
		this.mod_dependencies = file_object.dependencies || [];
		this.alternate = file_object.isAlternate;
		this.alternate_id = file_object.alternateFileId;
		this.available = file_object.isAvailable;
	}
};
