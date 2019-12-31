const curseforge = require("../index");

const fs = require("fs");
const crypto = require("crypto");
const request = require("request");

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
    
            hash.on("readable", () => {
                let data = hash.read();
                if(data){
                    console.log("Hash File:", this.file_md5);
                    console.log("Hash Download:", data.toString("hex"));
                    resolve(data.toString("hex") == this.file_md5);
                } else {
                    reject("Hash not found.");
                }
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

        options.override = options.hasOwnProperty("override") ? options.override : false;
        options.auto_check = options.hasOwnProperty("auto_check") ? options.auto_check : true;

        let promise = new Promise((resolve, reject) => {
            if (fs.existsSync(path)){
                if(options.override)
                    fs.unlinkSync(path);
                else
                    reject("File exists and override is false");
            }

            console.log("Downloading", `https://media.forgecdn.net/files/${(this.id + "").slice(0, 4)}/${(this.id + "").slice(4)}/${this.file_name}`);
            request(`https://media.forgecdn.net/files/${(this.id + "").slice(0, 4)}/${(this.id + "").slice(4)}/${this.file_name}`).pipe(fs.createWriteStream(path));
        });

        if (callback && typeof callback == 'function')
            promise.then(callback.bind(null, null), callback);

        return promise;
    }

    /**
     * @method ModFile.getDependencies
     * @description Get all dependencies required by this mod.
     * @prop {function} callback - Optional callback to use as alternative to Promise
     * @returns {Promise(Mod[])} Array od Mods who are marked as dependency.
     */
    getDependencies(callback){
        let promise = new Promise((resolve, reject) => {
            let mods = [];
            let amount = this.mod_dependencies.length;
            for (let dep of this.mod_dependencies) {
                curseforge.getMod(dep).then((res) => {
                    mods.push(res);
                    if (--amount == 0) {
                        resolve(mods);
                    }
                }).catch(err => reject);
            }
        });
        if (callback && typeof callback == 'function')
            promise.then(callback.bind(null, null), callback);

        return promise;
    }

    /**
     * @method ModFile.getDependenciesFiles
     * @description Get all dependencies required by this mod.
     * @prop {function} callback - Optional callback to use as alternative to Promise
     * @returns {ModFile[]} Array od ModFiles who are marked as dependency.
     */
    getDependenciesFiles(callback) {
        let promise = new Promise((resolve, reject) => {
            let mods = [];
            let amount = this.mod_dependencies.length;
            for (let dep of this.mod_dependencies) {
                curseforge.getModFiles(dep).then((res) => {
                    mods.push(res);
                    if(--amount == 0){
                        resolve(mods);
                    }
                }).catch(err => reject);
            }
        });
        if (callback && typeof callback == 'function')
            promise.then(callback.bind(null, null), callback);

        return promise;
    }

    /**
     * @class ModFile
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