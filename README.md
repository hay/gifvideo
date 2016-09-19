# Gifvideo
> Play videos inline on iOS, just like GIF files

## Install
Using `npm`:
```
$ npm install --save gifvideo
```

Using `bower`:
```
$ bower install --save gifvideo
```

`Gifvideo` can be used as a CommonJS module, AMD (with Require.js) or as a plain old Javacript global.

## Usage
Make sure you have a `&lt;video%gt;` element with a `src` and `poster` attribute (or the relevant `source` tags).

Then
```
var gifvideo = new Gifvideo(document.querySelector('video'));
```

That's it. Note that `Gifvideo` only accepts HTML elements, no selector strings.

For an example see `test.html`.

## API

### .getElement()
Returns the element you've given in the constructor.

## License
`Gifvideo` is based on the method used in [iphone-inline-video](https://github.com/bfred-it/iphone-inline-video) coded by [Federico Brigante](https://github.com/bfred-it).

MIT © [Hay Kranen](http://www.haykranen.nl)