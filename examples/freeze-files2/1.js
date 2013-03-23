var freeze = /* borschik:include:ent.freeze.json */;
for (var i in freeze) {
    freeze[i] = freeze[i].replace(/\.js$/, '')
}

require.config({
    paths: freeze
});

require(['module1', 'module2'], function() {
    console.log('load');
});
