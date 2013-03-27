all: 1.freeze.js

1.freeze.js: 1.js 1.png
	borschik --minimize no --tech ../../lib/techs/freeze-js-link --input $< > $@

clean:
	rm -rf 1.freeze.js _freeze

.PHONY: all clean
