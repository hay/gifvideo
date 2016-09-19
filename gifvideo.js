(function(root) {
    function addCss(el) {
        // Add something to use for the selector
        var id = 'v' + String(Math.random()).slice(3);
        el.setAttribute(id, '');

        var css = document.createElement('style');
        css.type = 'text/css';
        var html = ''.concat(
            '[' + id + ']::-webkit-media-controls-play-button,',
            '[' + id + ']::-webkit-media-controls-start-playback-button {',
            'opacity: 0;',
            'pointer-events: none;',
            'width: 5px;',
            '}'
        );
        css.innerHTML = html;
        document.body.appendChild(css);
    }

    function isIOS() {
        return (/iP(hone|od|ad)/.test(navigator.platform));
    }

    function backgroundVideo(video) {
        video.setAttribute('loop', '');

        // We do some really ugly stuff to make sure this trick works on all
        // platforms.
        // First check for iOS, if we're not on that, simply return.
        // Regular video playback is supported
        if (!isIOS()) {
            video.play();
            return;
        }

        // Add the CSS to hide the play button
        addCss(video);

        // Now, on iOS < 10 we need the trick, otherwise we can simply use the
        // webkit-playsinline property
        // To detect that, we do a feature detect on a CSS property that was
        // only added in iOS 10 Safari
        if ('object-position' in document.head.style) {
            video.setAttribute('webkit-playsinline', '');
            video.setAttribute('playsinline', '');
            video.setAttribute('muted', '');
            video.play();
            return;
        }

        // Okay, now get to the ugly hack for iOS < 10
        var start;
        var previousTime;
        video.load();

        // requestAnimationFrame automatically provides Date.now()
        function play(now) {
            // only play if it has the data,
            // without waiting for ambiguous events
            if (video.readyState >= video.HAVE_FUTURE_DATA) {
                if (video.currentTime >= video.duration - 0.05) {
                    // safer way to check whether the video is ended
                    video.currentTime = 0; // restart video
                } else {
                    //make it start at 0
                    previousTime = previousTime || now;
                    // increase it by the time it passed since the last
                    // animationFrame
                    video.currentTime += (now - previousTime) / 1000;
                }
            }
            previousTime = now;
            requestAnimationFrame(play);
        }

        play(Date.now());
    }

    function Gifvideo(element) {
        if (typeof element !== 'object') {
            throw new Error("Gifvideo: invalid element given");
        }

        this.element = element;
        backgroundVideo(this.element);
    }

    Gifvideo.prototype = {
        getElement : function() {
            return this.element;
        }
    };

    // Export for CommonJS, AMD or regular global
    if (typeof module === 'object' && module.exports) {
        // CommonJS
        module.exports = Gifvideo;
    } else if (typeof define === 'function' && define.amd) {
        define(function() {
            return Gifvideo;
        });
    } else {
        root.Gifvideo = Gifvideo;
    }
})(this);