var freeze = /* borschik:include:freeze.files.json */;
for (var i in freeze) {
    var modUrl = freeze[i].replace(/\.js$/, '');
    var modName = i.replace(/.*\//, '').replace(/\.js$/, '');
    freeze[modName] = modUrl;
    delete freeze[i];
}

require.config({
    baseUrl: '_freeze',
    paths: freeze
});

require(['module1', 'module2'], function() {
    console.log('load');
});
