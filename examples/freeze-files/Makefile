all: freeze.files.json 1.freeze.js

freeze.files.json: _freeze
	../../bin/freeze-files --hubs js --freeze _freeze --copy > $@

_freeze:
	mkdir _freeze

1.freeze.js: 1.js freeze.files.json
	borschik --minimize no --input 1.js > $@

clean:
	rm -rf 1.freeze.js freeze.files.json _freeze

.PHONY: all clean
