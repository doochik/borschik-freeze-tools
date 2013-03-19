/**
 * @fileOverview Borschik methods for freezed images to use is JS.
 */

(function() {
    /**
     * Borschik
     * @namespace
     */
    var borschik = window['borschik'] = {};

    var entities = {};

    /**
     * Add entities to hash.
     * @param {object} obj
     */
    borschik.addEntity = function(obj) {
        for (var entity in obj) {
            entities[entity] = obj[entity];
        }
    };

    /**
     * Return entity by name.
     * @param {string} entity
     * @returns {string}
     */
    borschik.entity = function(entity) {
        return entities[entity];
    };

    /**
     * Dummy function to use in development.
     * @param {string} imgSrc
     * @returns {string}
     */
    borschik.freeze = function(imgSrc) {
        return imgSrc;
    };
})();
