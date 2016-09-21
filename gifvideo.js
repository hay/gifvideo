(function(root) {
    var VIDEO_ATTRIBUTES = [
        'webkit-playsinline',
        'playsinline',
        'muted',
        'loop',
        'autoplay'
    ];

    function Gifvideo(element) {
        if (typeof element !== 'object') {
            throw new Error("Gifvideo: invalid element given");
        }

        this.element = element;
        this.addAttributes();
        this.element.play();

        if (this.isIos() && !this.isNewerIos()) {
            // Here come the hacks
            this.addCss();
            this.scrubVideo();
        }
    }

    Gifvideo.prototype = {
        addAttributes : function() {
            VIDEO_ATTRIBUTES.forEach(function(attr) {
                this.element.setAttribute(attr, '');
            }.bind(this));
        },

        addCss : function() {
            // Removes the play button on iOS < 10
            //
            // Add something to use for the selector
            var id = 'v' + String(Math.random()).slice(3);
            this.element.setAttribute(id, '');

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
        },

        getElement : function() {
            return this.element;
        },


        isIos : function() {
            return (/iP(hone|od|ad)/.test(navigator.platform));
        },

        isNewerIos : function() {
            // This CSS property was only added in iOS 10
            return 'object-position' in document.head.style;
        },

        // The ugly hack for iOS < 10
        scrubVideo : function() {
            var video = this.element;

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