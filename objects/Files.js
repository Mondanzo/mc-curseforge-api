const fs = require("fs");
const crypto = require("crypto");
const https = require("https");

module.exports = class {

    /**
     * @method ModFile.check_file
     * @description Check if a file got properly downloaded
     * @param {string} path - Path to file to check hash of.
     * @param {function} callback - Optional Callback to use instead of Promise.
     * @returns {Promise(boolean)} A Promise containing true if hash is same. False otherwise.
     */ 
    check_file(path, callback){
        let promise = new Promise((resolve, reject) => {
            let stream = fs.createReadStream(path);
            let hash = crypto.createHash("md5");
            hash.setEncoding("hex");
    
            hash.on("finish", function(){
                resolve(hash.read() == this.file_md5);
            })
            
            stream.pipe(hash);
        });
        if (callback && typeof callback == 'function')
            promise.then(callback.bind(null, null), callback);

        return promise;
    }

    /**
     * @method ModFile.download
     * @description Download the file to a specific file
     * @param {string} path - path to file to store in.
     * @param {object} options - Optional options to use.
     * @param {boolean} options.override - Should the file be overwritten if it already exists? Defaults to false.
     * @param {boolean} options.auto_check - Should the file be automatically checked after the download finished? Defaults to true.
     * @param {function} callback - Optional callback to use as alternative to Promise.
     * @returns {Promise(path)} A Promise containing the selected path for convenience.  
     */
    download(path, options = {override: false, auto_check: true}, callback){
        if (options && typeof options == 'function') {
            callback = options;
            options = { override: false, auto_check: true };
        }

        let promise = new Promise((resolve, reject) => {
            if (override || !fs.existsSync(path)){
                let stream = fs.createWriteStream(path);
                let wwwStream = https.get(this.download_url);
                wwwStream.on("finish", () => {
                    wwwStream.end();
                    stream.end();
                    if(options.auto_check){
                        this.check_file(path).then((result) => {
                            if(result) resolve(path);
                            else reject("File download is corrupted! Check failed!");
                        })
                    } else {
                        resolve(path);
                    }
                });
                wwwStream.pipe(stream);
            } else {
                reject("File exists and override is false");
            }
        });

        if (callback && typeof callback == 'function')
            promise.then(callback.bind(null, null), callback);

        return promise;
    }

    /**
     * @name ModFile
     * @class
     * @description A File Object representing a file of a specific mod
     * @param {Object} file_object - File object to create object from
     * @property {number} id - The Curse Id of the mod file.
     * @property {number} mod_id - The Curse Id of the mod the file belongs to.
     * @property {string[]} minecraft_versions - The minecraft versions this mod file is compatible with.
     * @property {string[]} java_versions - The java versions this mod file is compatible with.
     * @property {string} file_name - The name of the mod file it got stored with.
     * @property {string} file_size - The size of the mod file as string. (Yeah it's gross)
     * @property {string} file_md5 - The md5 hash of the mod file.
     * @property {string} release_type - the type of the mod file release.
     * @property {string} mod_key - The Curse slug of the mod the file belongs to.
     * @property {string} download_url - The url to the mod file to download.
     * @property {number} downloads - The amount of downloads of this mod file.
     * @property {timestamp} timestamp - A timestamp of the time the file got uploaded.
     * @property {string[]} mod_dependencies - A list of dependencies for this file.
     */
    constructor(file_object){
        this.id = file_object.id;
        this.mod_id = file_object.mod_id;
        this.mod_key = file_object.mod_key;
        this.minecraft_versions = file_object.minecraft_version;
        this.java_versions = file_object.java_version;
        this.file_name = file_object.file_name;
        this.file_size = file_object.file_size;
        this.file_md5 = file_object.file_md5;
        this.release_type = file_object.release_type;
        this.download_url = file_object.download_url;
        this.timestamp = file_object.uploaded;
        this.downloads = file_object.download_count;
        this.mod_dependencies = file_object.mod_dependencies;
    }
}