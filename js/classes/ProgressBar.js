const ProgressBar = (() => {
    let container, mask, bar;
    let duration = 2000;
    let current = 0;

    /**
     * Handle the game progress bar.
     * @class ProgressBar
     * @extends Element
     */
    class ProgressBar extends Element {
        /**
         * Initialise all the progress bar elements.
         */
        constructor() {
            container = new PIXI.Container();
            mask = TextureLibrary.getSprite("progress");
            bar = TextureLibrary.getTilingSprite("bar", 1, mask.height);

            container.addChild(bar);
            container.addChild(mask);

            container.position.x = Math.round((800 - mask.width) /  2);
            container.position.y = 400;

            super([container]);
        }

        /**
         * Check the current progress.
         * @returns {Number}
         */
        get progress() {
            return Math.round(current / duration * 100);
        }

        /**
         * Get the alpha value of the container.
         * @returns {Number}
         */
        get alpha() {
            return container.alpha;
        }

        /**
         * Set the opacity of the container.
         * @param {Number} value
         */
        set alpha(value) {
            container.alpha = value;
        }

        /**
         * Update the element.
         * @param {Number} delta
         */
        update(delta) {
            let progress = TextureLibrary.progress;
            let currentProgress = Math.round((current + delta) / duration * 100);

            bar.tilePosition.x -= 2;

            if (currentProgress <= progress) {
                bar.width = Math.round(mask.width / 100 * currentProgress);
                current += delta;
            }
        }
    }

    return ProgressBar;
})();