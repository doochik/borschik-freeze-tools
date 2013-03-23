all: example.freeze.html

example.freeze.html: example.html 1.css 1.js 1.png
	borschik --tech ../../borschik-tech/freeze-html.js --input $< > $@

clean:
	rm -rf example.freeze.html _freeze

.PHONY: all clean
