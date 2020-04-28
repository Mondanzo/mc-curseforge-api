# Changelog

All notable changes to this project will be documented in this file for the future.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).
The dates will be documented in the European format (DD-MM-YYYY)

## [2.1.0] - 28-04-2020

### Changes

**ModFile.download** now takes a new argument called `simulate` with which you can just try to download a file without creating a new file. If you're not using callbacks everything should work just fine. There's also `url` now which should always refer to `this.download_url` and `tries`. Tries is used to avoid redirects loop and cancels a download if more than 10 redirects are send.

## [2.0.1] - 24-04-2020

### Fixes

**CurseForgeAPI.getModDescription()** now returns a html string instead of throwing a json error.

## [2.0.0] - 24-04-2020

### Added

## Global

`options.searchFilter` can be used to search for keywords, can be an author, name or any string.

## CurseForgeAPI.SORT_TYPES

an "enum" for the different types of sorting. Please check the docs for more information.

## CurseForgeAPI.getModDescription()

Return the html description of a mod identified by id.

## Object::Mod

`mod.popularityScore` is a float of some kind of score Cursforge added.

`mod.gamePopularityRank` is a integer of some kind of rank Curseforge added.

`mod.primaryLanguage` is a string containing the primary language the mod is written in.

`mod.defaultFileId` is some kind id, probably the default advertised file.

`mod.latestFiles` an Array of ModFiles of the latest released files.

`mod.attachments` attachments from the description. The first item will always be the mod logo, therefore you can use `mod.logo`. Please note those are not strings and instead are objects. please log their structure to understand how to use them.

`mod.featured` a boolean telling if the mod is featured.

`mod.available` a boolean telling if the mod is available.

`mod.experimental` a boolean telling if the mod is experimental.

`mod.released` is a Timestamp of when the mod got released.

`mod.authors` is an array of objects. Please log those objects to understand how to use them.

**mod.getDescription()**:
is a short-hand for `CurseforgeAPI.getDescription`

## Object::ModFile

`modFile.available` a boolean telling if the mod file is available.

### Changed

## Global

`identifier` must be an integer now, sadly.

`options.mc_version` now is `options.gameVersion`.

`options.page_size` now is `options.pageSize`.

`options.page_num` now is `options.index`.

## Object::Mod

`logo` is now an object of type "Attachment" (I couldn't get to make Attachment Objects classes yet).

!!! `owner` is now an array of objects called `authors`!!!

## Object::ModFile

**modFile.download**:
`options` got removed and replaced with only `override` now. `auto_check` got removed.

`mod_dependencies` is now an array of objects, it's suggested to use `modFile.getDependencies()`

### Removed

## Global

`options.newest_only` got removed.

`options.mod_name` got removed. Use `options.searchFilter` instead.

`options.owner` got removed. Use `options.searchFilter` instead.

## Object::Mod

`mod.owner` got removed! Please use `mod.authors` instead.

`mod.categories` got removed. There isn't much knowledege yet about how the categories work now.

`mod.description` got removed. Please see `CurseforgeAPI.getModDescription()` or `Mod.getDescription()`

## Object::ModFile

`modFile.mod_id` got removed.

`modFile.mod_key` got removed.

`modFile.file_md5` got removed.

`modFile.java_versions` got removed.

**modFile.check_file()**: got removed.

---

### Final Words

this is my first Changelog and as well first ever really published project so I'd love to recieve feedback and suggestion on how to improve! - Mondanzo
