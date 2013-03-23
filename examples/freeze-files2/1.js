require.config({
    paths: /* borschik:include:ent.freeze.json */
});

require(['module1', 'module2'], function() {
    console.log('load');
});
