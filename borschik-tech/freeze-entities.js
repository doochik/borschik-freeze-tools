/**
 * @fileOverview Borschik tech to freeze image entities from json.
 */

var INHERIT = require('borschik/node_modules/inherit');
var CSSBASE = require('borschik/lib/techs/css-base');

exports.Tech = INHERIT(CSSBASE.Tech, {

    minimize: function(content) {
        // remove formating if minimize
        return JSON.stringify(JSON.parse(content));
    },

    File: exports.File = INHERIT(CSSBASE.File, {

        parseInclude: function(content) {
            // prepare conent as text
            return content instanceof Buffer ? content.toString('utf-8') : content;
        },

        processInclude: function(baseFile) {
            // parse json
            var entities = JSON.parse(this.content);

            for (var entity in entities) {
                var ent = entities[entity];
                // freeze images with cssBase.processLink
                entities[entity] = JSON.parse(this.child('linkUrl', this.pathTo(ent)).process(baseFile));
            }

            // formatted output
            return JSON.stringify(entities, null, 4);
        }
    })
});
