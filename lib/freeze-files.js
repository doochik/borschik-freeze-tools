var FS = require('fs');
var PATH = require('path');
var CRYPTO = require('crypto');

var data = {};
var cnt = 0;
var OPTIONS = {};

function incCnt() {
    cnt++;
}

function decCnt() {
    cnt--;
    if (cnt === 0) {
        thatsAll();
    }
}

function addToResult(info, cb) {

    var newFileName = info.hash + info.ext;
    data[info.path] = newFileName;

    var freezeFile = OPTIONS.freeze + '/' + newFileName;

    if (OPTIONS.copy) {
        copy(info.absPath, freezeFile, cb);

    } else if (OPTIONS.move) {
        FS.rename(info.absPath, freezeFile, function() {

            if (OPTIONS['move-with-symlink']) {
                var fileDir = PATH.dirname(info.absPath);
                var relativePath = PATH.relative(fileDir, freezeFile);
                FS.symlinkSync(relativePath, info.absPath);
            }

            cb();
        });

    } else {
        cb();
    }
}

function copy(src, dst, cb) {
    FS.createReadStream(src).pipe(FS.createWriteStream(dst).on('close', cb));
}

function md5(absPath, cb) {
    var shasum = CRYPTO.createHash('md5');

    var s = FS.ReadStream(absPath);
    s.on('data', function(d) {
        shasum.update(d);
    });

    s.on('end', function() {
        var d = shasum.digest('hex');
        cb(d);
    });
}

function processFile(absPath, basePath) {
    var extension = PATH.extname(absPath);
    incCnt();
    md5(absPath, function(hash) {
        var relativePath = PATH.relative(basePath, absPath);
        addToResult({
            ext: extension,
            path: relativePath,
            hash: hash,
            absPath: absPath
        }, decCnt);
    });
}

/**
 * Read dir recursivly and process files
 * @param dir
 * @param basePath
 */
function readDir(dir, basePath) {
    incCnt();
    FS.readdirSync(dir).forEach(function(file) {
        file = PATH.resolve(dir, file);
        var stat = FS.statSync(file);
        if (stat.isFile()) {
            processFile(file, basePath);

        } else if (stat.isDirectory()) {
            readDir(file, basePath);
        }
    });
    decCnt();
}

/**
 * Write JSON to stdout
 */
function thatsAll() {
    process.stdout.write(JSON.stringify(data))
}

/**
 *
 * @param {Object} options
 * @param {Array} options.hubs Path to files or dir
 * @param {String} [options.freeze] Path to freeze path
 * @param {Boolean} [options.copy] Add version to output JSON
 * @param {Boolean} [options.move] Move files from hubs to freeze
 * @param {Boolean} [options.move-with-symlink] Move files from hubs to freeze and create symlink
 * @param {String} [options.add-version] Copy files from hubs to freeze
 */
module.exports = function(options) {

    OPTIONS = options;

    // добавляем версию, если указана
    if (options['add-version']) {
        data['version'] = options['add-version'];
    }

    options.hubs.forEach(function(hub) {
        var basePath = PATH.dirname(hub);
        var stat = FS.statSync(hub);
        if (stat.isFile()) {
            processFile(hub, PATH.dirname(basePath));

        } else if (stat.isDirectory()) {
            readDir(hub, basePath);
        }
    });
};
