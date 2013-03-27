var FS = require('fs');
var PATH = require('path');
var FREEZE = require('borschik/lib/freeze');

/**
 * Result JSON
 * @type {Object}
 */
var result = {};

/**
 * Process file: freeze and write meta-data to result JSON
 * @param absPath
 * @param basePath
 */
function processFile(absPath, basePath) {
    var url = FREEZE.processPath(absPath);

    var resolved = FREEZE.resolveUrl2(url);

    url = (resolved == url ? PATH.relative(PATH.dirname(absPath), url) : resolved);

    var relOriginalPath = PATH.relative(basePath, absPath);

    result[relOriginalPath] = url;
}

/**
 * Read dir recursivly and process files
 * @param dir
 * @param basePath
 */
function readDir(dir, basePath) {
    FS.readdirSync(dir).forEach(function(file) {
        file = PATH.resolve(dir, file);
        var stat = FS.statSync(file);
        if (stat.isFile()) {
            processFile(file, basePath);

        } else if (stat.isDirectory()) {
            readDir(file, basePath);
        }
    });
}

/**
 * Freeze options.input and write meta-data JSON to stdout
 * @param {Object} options
 * @param {String} [options.input] Path to file or dir
 */
module.exports = function(options) {
    var input = options.input || '.';

    var basePath = PATH.dirname(input);
    var stat = FS.statSync(input);
    if (stat.isFile()) {
        processFile(input, process.cwd());

    } else if (stat.isDirectory()) {
        readDir(input, basePath);
    }

    process.stdout.write(JSON.stringify(result, null, 2))
};
