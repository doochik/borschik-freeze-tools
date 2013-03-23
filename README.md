# Borschik freeze tools

Improved freeze tools for [Borschik](https://github.com/veged/borschik)

## Freeze images in JS (static urls)
1.js
```js
document.write('<img src="' + borschik.freeze('1.png') + '"/>')
```

run borschik
```bash
$ borschik --tech borschik-tech/freeze-js-imgs --input 1.js > 1.freeze.js
```

result 1.freeze.js
```js
document.write('<img src="' + "_freeze/jUK5O9GsS2gPWOhRMeBxR0GThf0.png" + '"/>')
```

## Freeze images in JS (dynamic urls)
1.js
```js
borschik.addEntity(/* borschik:include:ent.freeze.json */);

var name = 'test';
document.write('<img src="' + borschik.entity('icon-' + name + '-png') + '"/>')
```

ent.json
```json
{
    "icon-test-png": "1.png"
}
```

run borschik
```bash
$ borschik --tech borschik-tech/freeze-entities --input ent.json > ent.freeze.json
$ borschik --input 1.js > 1.freeze.js
```

result 1.freeze.js
```(js)
borschik.addEntity({
    "icon-test-png": "_freeze/jUK5O9GsS2gPWOhRMeBxR0GThf0.png"
}
);

var name = 'test';
document.write('<img src="' + borschik.entity('icon-' + name + '-png') + '"/>')

```

