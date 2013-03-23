var freeze = /* borschik:include:freeze.files.json */;
for (var i in freeze) {
    var modUrl = '_freeze/' + freeze[i].replace(/\.js$/, '');
    var modName = i.replace(/.*\//, '').replace(/\.js$/, '');
    freeze[modName] = modUrl;
    delete freeze[i];
}

require.config({
    paths: freeze
});

require(['module1', 'module2'], function() {
    console.log('load');
});
