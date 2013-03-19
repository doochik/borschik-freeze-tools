var expect = require("chai").expect;

describe('freeze-entities', function() {

    var PATH = require('path');
    var FS = require('fs');
    var BORSCHIK = require('borschik');

    const fakeFile = PATH.resolve('tests/test.js');
    const fakeResFile = PATH.resolve('tests/_test.js');
    const freezeDir = PATH.resolve('tests/_');

    afterEach(function(cb) {
        require('child_process').exec('rm -rf ' + [freezeDir, fakeFile, fakeResFile].join(' '), function() {
            cb();
        });
    });

    const TESTS = [
        // simple json
        {
            'in': '{"img1": "1.png","css": "1.css"}',
            'out': '{"img1":"//yandex.st/prj/_/jUK5O9GsS2gPWOhRMeBxR0GThf0.png","css":"//yandex.st/prj/1.0.0/1.css"}'
        }
    ];

    TESTS.forEach(function(test) {
        it('should process "' + test.in + '" as "' + test.out + '"', function(cb) {

            // write test file
            FS.writeFileSync(fakeFile, test.in, 'utf-8');

            // proccess it
            BORSCHIK
                .api({
                    'freeze': true,
                    'input': fakeFile,
                    'minimize': true,
                    'output': fakeResFile,
                    'tech': 'borschik-tech/freeze-entities'
                })
                .then(function() {
                    try {
                        expect(FS.readFileSync(fakeResFile, 'utf-8')).to.equal(test.out);
                        cb();
                    } catch(e) {
                        cb(e.message);
                    }
                })
                .fail(function(error) {
                    throw error;
                });
        })
    });

});
