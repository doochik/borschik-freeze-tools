all: 1.freeze.js

1.freeze.js: 1.js 1.png
	borschik --minimize no --tech ../../borschik-tech/freeze-js-imgs --input $< > $@

clean:
	rm -rf 1.freeze.js _freeze

.PHONY: all clean
