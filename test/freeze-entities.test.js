var expect = require("chai").expect;

describe('freeze-entities', function() {

    var PATH = require('path');
    var FS = require('fs');
    var BORSCHIK = require('borschik');

    const fakeFile = PATH.resolve('test/test.json');
    const fakeResFile = PATH.resolve('test/_test.json');
    const freezeDir = PATH.resolve('test/_');

    afterEach(function(cb) {
        require('child_process').exec('rm -rf ' + [freezeDir, fakeFile, fakeResFile].join(' '), function() {
            cb();
        });
    });

    const TESTS = [
        // single quote
        {
            'in': "var a = borschik.entity('1.png');",
            'out': 'var a = "//yandex.st/prj/1.0.0/_/jUK5O9GsS2gPWOhRMeBxR0GThf0.png";'
        },
        // double quote
        {
            'in': 'var a = borschik.entity("1.png");',
            'out': 'var a = "//yandex.st/prj/1.0.0/_/jUK5O9GsS2gPWOhRMeBxR0GThf0.png";'
        },
        // inline comment
        {
            'in': '//var a = borschik.entity("1.png");',
            'out': '//var a = borschik.entity("1.png");'
        },
        // block comment
        {
            'in': '/*var a = borschik.entity("1" + ".png");*/',
            'out': '/*var a = borschik.entity("1" + ".png");*/'
        },
        // block comment with line breaks
        {
            'in': '/*\nvar e = borschik.entity("1" + ".png");\n*/',
            'out': '/*\nvar e = borschik.entity("1" + ".png");\n*/'
        },
        // dynamic entity
        {
            'in': 'var f = borschik.entity("1" + ".png");',
            'out': 'var f = borschik.entity("1" + ".png");'
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
                    'tech': 'tech/freeze-js-imgs'
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
