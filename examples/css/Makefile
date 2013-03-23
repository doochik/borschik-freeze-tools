all: 1.freeze.css

1.freeze.css: 1.css 1.png
	borschik --minimize no --input $< > $@

clean:
	rm -rf 1.freeze.css _freeze

.PHONY: all clean
