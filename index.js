const https = require("https");
const querystring = require("querystring");

const base_url = "https://ddph1n5l22.execute-api.eu-central-1.amazonaws.com/dev/";

/**
 * @description Helper function to get content
 * @private
 * @param {string} url - Url to get
 * @param {Object} options - Object to stringify to url options
 */
function innerGet(url, options = {}){
    return new Promise((resolve, reject) => {
        url += "?" + querystring.stringify(options)
        console.log("Requesting", url);
        let req = https.get(url, {});
        req.on("response", (resp) => {
            let data = "";
            resp.on("data", (chunk) => {
                data += chunk;
            });
            
            resp.on("end", () => {
                if(resp.statusCode == 200 && data){
                    resolve(JSON.parse(data));
                } else {
                    reject(data);
                }
            });
            
            resp.on("error", (err) => {
                reject(err);
            })
        })
    })
}

/**
 * @description the purpose of this package is to interact with the Curseforge API with simple functions instead of having to write all the requests yourself.
 * @module CurseForgeAPI
 * @see getMods
 */


/**
* @function getMods
* 
* @description Get an overview of all possible mods.
* @param {Object} options - A Object containing optional parameters.
* @param {string} options.mc_version - The Minecraft version string to use. ("1.12.2", "1.13")
* @param {string} options.mod_name - The mod name to search for. ("immersive", "botania")
* @param {string} options.owner - The creators name to search for. ("Vazkii", "Mondanzo")
* @param {number} options.page_num - The page to use. (in combination with options.page_size)
* @param {number} options.page_size - The amount of items to show per page. (in combination with options.page_num)
* @param {function} callback - Optional callback to use instead of Promise.
* @returns {Promise} A promise containing the json object returned by the Curse API on successful 200 response.
*/
module.exports.getMods = function (options = {}, callback) {
    if (options && typeof options == 'function') {
        callback = options;
        options = {};
    }
    let promise = innerGet(base_url + "mods", options);
    if (callback && typeof callback == 'function')
        promise.then(callback.bind(null, null), callback);
    return promise;
}

/**
 * @function getMod
 * 
 * @description Get information about a specific mod using the identifier.
 * @param {string|number} identifier - The mods slug or curse id to find the mod with.
 * @param {function} callback - Optional callback to use instead of Promise.
 * @returns {Promise} A promise containing the json object returned by the Curse API on successful 200 response.
 */
module.exports.getMod = function (identifier, callback) {
    let promise = innerGet(base_url + "mod/" + identifier);
    if (callback && typeof callback == 'function')
        promise.then(callback.bind(null, null), callback);
    return promise;
}

/**
 * @function getModFiles
 *
 * @description Get information about the releases of a specific mod.
 * @param {string|number} identifier - The mods slug or curse id to find the mod with.
 * @param {Object} options - Optional Options object to use for filtering.
 * @param {string} options.mc_version - The Minecraft version string to use. ("1.12.2", "1.13")
 * @param {string} options.channel - The channel to use. ("Beta", "Release")
 * @param {boolean} options.newest_only - only get the newest one.
 * @param {function} callback - Optional callback to use instead of Promise.
 * @returns {Promise} A promise containing the json object returned by the Curse API on successful 200 response.
 */
module.exports.getModFiles = function(identifier, options, callback){
    if (options && typeof options == 'function') {
        callback = options;
        options = {};
    }

    if(options.hasOwnProperty("newest_only"))
        options.newest_only = options.newest_only ? 1 : 0
    let promise = innerGet(base_url + "mod/" + identifier + "/files", options);
    if (callback && typeof callback == 'function')
        promise.then(callback.bind(null, null), callback);
    return promise;
}