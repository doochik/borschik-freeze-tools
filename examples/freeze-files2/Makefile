all: ent.freeze.json 1.freeze.js

ent.freeze.json: ent.json
	borschik --tech ../../borschik-tech/freeze-entities --input ent.json > $@

1.freeze.js: 1.js ent.freeze.json
	borschik --minimize no --input 1.js > $@

clean:
	rm -rf 1.freeze.js ent.freeze.json _freeze

.PHONY: all clean
