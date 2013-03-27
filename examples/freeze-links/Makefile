all: _ent.json _1.dev.js _1.prod.js

_ent.json: ent.json
	borschik --minimize no --tech ../../lib/techs/freeze-links --input $< > $@

_1.dev.js: _ent.json 1.dev.js
	borschik --minimize no --input 1.dev.js > $@

_1.prod.js: _ent.json 1.prod.js
	borschik --minimize no --input 1.prod.js > $@

clean:
	rm -rf _ent.json _1.dev.js _1.prod.js _freeze

.PHONY: all clean
