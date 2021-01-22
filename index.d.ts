declare class ModFile {
	/**
	 * @name ModFile
	 * @class ModFile
	 * @description A File Object representing a file of a specific mod
	 * @param {Object} file_object - File object to create object from
	 * @property {string[]} minecraft_versions - The minecraft versions this mod file is compatible with.
   * @property {number} id - The id of the file object
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
  minecraft_versions: string[];
  id: number;
  file_name: string;
  file_size: string;
  release_type: string;
  mod_key: string;
  download_url: string;
  downloads: number;
  timestamp: Date;
  mod_dependencies: string[];
  available: boolean;

  download(path: string, override: boolean, simulate: boolean, callback: Function, url: string, tries: number): Promise<string>;
  getDependencies(callback?: Function, categories?: number[]): Promise<Mod[]>;
  getDependenciesFiles(callback?: Function, categories?: number[]): Promise<ModFile[]>;
}

declare class Mod {
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
  id: number;
  name: string;
  authors: Record<string,any>[];
  attachments: Record<string,any>[];
  url: string;
  summary: string;
  defaultFileId: number;
  downloads: number;
  latestFiles: ModFile[];
  key: string;
  featured: boolean;
  popularityScore: number;
  gamePopularityRank: number;
  primaryLanguage: string;
  logo: Record<string,any>;
  created: Date;
  updated: Date;
  released: Date;
  available: boolean;
  experimental: boolean;
	
	getFiles(callback?: Function): Promise<ModFile[]>;
	getDescription(callback?: Function): Promise<string>;
}

declare module 'mc-curseforge-api' {
  export const SORT_TYPES: {
    FEATURED: 0,
    POPULARITY: 1,
    LAST_UPDATE: 2,
    NAME: 3,
    AUTHOR: 4,
    TOTAL_DOWNLOADS: 5
  }
	
	export const DEPENDENCY_TYPE: {
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
  export function getMods(options?: {  
    gameVersion?: string;
    searchFilter?: string;
    index?: number;
    pageSize?: number;},
		callback?: Function): Promise<Mod[]|Error>

  /**
   * @function getMod
   *
   * @description Get information about a specific mod using the identifier.
	 * @param {number} identifier - The mods curse id to find the mod with.
   * @param {function} callback - Optional callback to use instead of Promise.
   * @returns {Promise.<Mod, Error>} A promise containing the json object returned by the Curse API on successful 200 response.
   */
  export function getMod(identifier: number, callback?: Function): Promise<Mod>;

  /**
   * @function getModFiles
   *
   * @description Get information about the releases of a specific mod.
   * @param {number} identifier - The mods curse id to find the mod with.
   * @param {function} callback - Optional callback to use instead of Promise.
   * @returns {Promise.<ModFile[], Error>} A promise containing the json object returned by the Curse API on successful 200 response.
   */
  export function getModFiles(identifier: number, callback?: Function): Promise<ModFile[]>;

  /**
   * @function getModDescription
   *
   * @description Get the html string for the mod description.
   * @param {number} identifier - The mods curse id to find the mod with.
   * @param {function} callback - Optional callback to use instead of Promise.
   * @returns {Promise.<string, Error>} A promise containing the html string returned by the Curse API on successful 200 response.
   */
  export function getModDescription(identifier: number, callback?: Function): Promise<string>;

}
