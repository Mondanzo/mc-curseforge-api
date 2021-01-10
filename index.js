const https = require("https");
const querystring = require("querystring");

const Mod = require("./objects/Mod");
const ModFile = require("./objects/Files");

const base_url = "https://addons-ecs.forgesvc.net/api/v2/addon/";

/**
 * @description Generic Conversion Function (The Epic GCF)
 * @private
 * @param {Object} object - The object
 * @returns {Object} Returns the object
 */
function basic_conversion_function(object) {
	return object;
}

/**
 * @description Helper function to get content
 * @private
 * @param {string} url - Url to get
 * @param {Object} options - Object to stringify to url options
 */
function innerGet(
	url,
	options = {},
	conversionFunction = basic_conversion_function,
	PARSE = true
) {
	return new Promise((resolve, reject) => {
		if (Object.keys(options).length)
			url += "&" + querystring.stringify(options);
		https.get(url, function (response) {
			if (response && response.statusCode === 200) {
				let data = "";
				response.on("data", (chunk) => {
					data += chunk;
				});

				response.on("end", () => {
					if (PARSE) resolve(conversionFunction(JSON.parse(data)));
					else resolve(conversionFunction(data));
				});
			} else {
				reject(response.statusCode);
			}
		});
	});
}

/**
 * @description the purpose of this package is to interact with the Curseforge API with simple functions instead of having to write all the requests yourself.
 * @module CurseForgeAPI
 * @see getMods
 */

/**
 * @description Helper Object for variations of sort options
 * @readonly
 * @enum {number}
 */
module.exports.SORT_TYPES = {
	FEATURED: 0, // Sort by Featured
	POPULARITY: 1, // Sort by Popularity
	LAST_UPDATE: 2, // Sort by Last Update
	NAME: 3, // Sort by Name
	AUTHOR: 4, // Sort by Author
	TOTAL_DOWNLOADS: 5, // Sort by Total Downloads
};

/**
 * @description Helper Object for types of dependencies and incompatibilities.
 * @readonly
 * @enum {number}
 */
module.exports.DEPENDENCY_TYPE = {
	EMBEDDED_LIBRARY: 1,
	OPTIONAL: 2,
	REQUIRED: 3,
	TOOL: 4,
	INCOMPATIBLE: 5,
	INCLUDE: 6
}

/**
 * @function getMods
 *
 * @description Get an overview of all possible mods.
 * @param {Object} options - A Object containing optional parameters.
 * @param {string} options.gameVersion - The Minecraft version string to use. ("1.12.2", "1.13")
 * @param {string} options.searchFilter - Term to search for.
 * @param {number} options.index - The page to use.
 * @param {number} options.pageSize - The amount of items to show per page. (Limit 500)
 * @param {number} options.sort - The method to sort with @see SORT_TYPES
 * @param {function} callback - Optional callback to use instead of Promise.
 * @returns {Promise.<Mod[], Error>} A promise containing the json object returned by the Curse API on successful 200 response.
 */
module.exports.getMods = function (options = {}, callback) {
	if (options && typeof options === "function") {
		callback = options;
		options = {};
	}
	let promise = innerGet(
		base_url + "search?gameId=432&sectionId=6",
		options,
		function (obj) {
			let mods = [];
			for (let m of Object.values(obj)) {
				mods.push(new Mod(m));
			}
			return mods;
		}
	);
	if (callback && typeof callback === "function")
		promise.then(callback.bind(null, null), callback);
	return promise;
};

/**
 * @function getMod
 *
 * @description Get information about a specific mod using the identifier.
 * @param {number} identifier - The mods curse id to find the mod with.
 * @param {function} callback - Optional callback to use instead of Promise.
 * @returns {Promise.<Mod, Error>} A promise containing the json object returned by the Curse API on successful 200 response.
 */
module.exports.getMod = function (identifier, callback) {
	let promise = innerGet(base_url + identifier, {}, function (obj) {
		return new Mod(obj);
	});
	if (callback && typeof callback === "function")
		promise.then(callback.bind(null, null), callback);
	return promise;
};

/**
 * @function getModFiles
 *
 * @description Get information about the releases of a specific mod.
 * @param {number} identifier - The mods curse id to find the mod with.
 * @param {function} callback - Optional callback to use instead of Promise.
 * @returns {Promise.<ModFile[], Error>} A promise containing the json object returned by the Curse API on successful 200 response.
 */
module.exports.getModFiles = function (identifier, callback) {
	let promise = innerGet(
		base_url + identifier + "/files",
		undefined,
		function (obj) {
			let files = [];
			for (let f of Object.values(obj)) {
				files.push(new ModFile(f));
			}
			return files;
		}
	);
	if (callback && typeof callback === "function")
		promise.then(callback.bind(null, null), callback);
	return promise;
};

/**
 * @function getModDescription
 *
 * @description Get the html string for the mod description.
 * @param {number} identifier - The mods curse id to find the mod with.
 * @param {function} callback - Optional callback to use instead of Promise.
 * @returns {Promise.<string, Error>} A promise containing the html string returned by the Curse API on successful 200 response.
 */
module.exports.getModDescription = function (identifier, callback) {
	let promise = innerGet(
		base_url + identifier + "/description",
		undefined,
		function (obj) {
			return obj;
		},
		false
	);
	if (callback && typeof callback === "function")
		promise.then(callback.bind(null, null), callback);
	return promise;
};
