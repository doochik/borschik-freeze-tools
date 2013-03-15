/**
 * @fileOverview Borschik tech to freeze images in js files.
 */

var INHERIT = require('borschik/node_modules/inherit');
var cssbase = require('borschik/lib/techs/css-base');

const uniqStr = '\00borschik\00';

/**
 * RegExp to find borschikFreeze("path/to/image.png")
 * @const
 * @type {RegExp}
 */
const allIncRe = /borschikFreeze\(['"](.*?)['"]\)/g;

exports.Tech = INHERIT(cssbase.Tech, {

    minimize: function(content) {
        return content;
    },

    File: exports.File = INHERIT(cssbase.File, {

        parseInclude: function(content) {

            var includes = [];
            var _this = this;

            var text = content instanceof Buffer ? content.toString('utf-8') : content;

            var texts = text
                .replace(allIncRe, function(_, include) {
                    includes.push({
                        url: _this.pathTo(include),
                        type: 'linkUrl'
                    });

                    return uniqStr;

                })
                .split(uniqStr);

            // zip texts and includes
            var res = [], t, i;
            while((t = texts.shift()) != null) {
                t && res.push(t);
                (i = includes.shift()) && res.push(i);
            }

            return res;

        },

        processInclude: function(baseFile, content) {
            var parsed = content || this.content;

            for(var i = 0; i < parsed.length; i++) {
                var item = parsed[i];

                // process only linkUrl type
                if (!item || item.type != 'linkUrl') {
                    continue;
                }

                parsed[i] = this.child(item.type, item.url).process(baseFile);
            }

            return parsed.join('');
        },

        processLink: function(path) {
            // this function is just for debug
            return this.__base(path);
        }

    })
});
