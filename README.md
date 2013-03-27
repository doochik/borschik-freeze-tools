# Borschik freeze tools

Improved freeze tools for [Borschik](https://github.com/veged/borschik)

## How to freeze images in JS?

1. Add script to you HTML-page ```<script src="browser/borschik.js"></script>```
2. Markup images with ```borschik.link```
3. Write ```.borschik``` config
4. Use borschik extenstions to freeze images for production use. See below.

## Borschik config
[Read more](https://github.com/veged/borschik/blob/master/README.ru.md) in Russian
```json
{
    "freeze_paths": {
        ".": "_freeze"
    }
}
```

## Freeze images in JS (static urls)
1.js
```js
document.write('<img src="' + borschik.link('1.png') + '"/>')
```

run borschik
```bash
$ borschik --tech borschik-tech/freeze-js-link --input 1.js > 1.freeze.js
```

result 1.freeze.js
```js
document.write('<img src="' + "_freeze/jUK5O9GsS2gPWOhRMeBxR0GThf0.png" + '"/>')
```

## Freeze images in JS (dynamic urls)
1.js
```js
borschik.addLinks(/* borschik:include:_links.freeze.json */);

var name = 'test';
document.write('<img src="' + borschik.link('@icon-' + name + '-png') + '"/>')
```
Note: if link starts with ```@``` it's dynamic

links.json
```json
{
    "icon-test-png": "1.png"
}
```

run borschik
```sh
# freeze links in links.json
$ borschik --tech borschik-tech/freeze-links --input links.json > links.freeze.json
# build 1.js
$ borschik --input 1.js > 1.freeze.js
```

result 1.freeze.js
```js
borschik.addLinks({
    "icon-test-png": "_freeze/jUK5O9GsS2gPWOhRMeBxR0GThf0.png"
});

var name = 'test';
document.write('<img src="' + borschik.link('@icon-' + name + '-png') + '"/>')
```

