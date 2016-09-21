# Gifvideo
> Play videos inline on iOS, just like GIF files

This library does only thing: it plays muted looping video files inline, also on iOS (even older versions). Basically, what you can do with GIF files, but without the large file size and a maximum of 256 colors.

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
Make sure you have a `<video>` element with a `src` and `poster` attribute (or the relevant `source` tags).

```
<video src="cat.mp4" poster="cat.jpg"></video>
```

Then
```
var gifvideo = new Gifvideo(document.querySelector('video'));
```

That's it. Note that `Gifvideo` only accepts HTML elements, no selector strings.

For example see the `examples` folder.

## API

### Gifvideo(element, options)
Constructor. `options` is an optional object with these options and defaults:
```
{
    alwaysScrub : false, // Always use 'scrub' on iOS, even if > 9
    debug : false        // Log debug information to console
}
```

### .getElement()
Returns the element you've given in the constructor.

## License
`Gifvideo` is based on the method used in [iphone-inline-video](https://github.com/bfred-it/iphone-inline-video) coded by [Federico Brigante](https://github.com/bfred-it).

MIT © [Hay Kranen](http://www.haykranen.nl)