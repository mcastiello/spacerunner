const Background = (() => {
    let galaxy, fast, slow;

    /**
     * Handle the game background.
     * @class Background
     * @extends Element
     */
    class Background extends Element {
        /**
         * Initialise all the background elements.
         */
        constructor() {
            galaxy = TextureLibrary.getTilingSprite("galaxy", 800, 600);
            fast = TextureLibrary.getTilingSprite("fast-stars", 800, 600);
            slow = TextureLibrary.getTilingSprite("slow-stars", 800, 600);

            fast.alpha = 0.7;

            super([
                galaxy,
                slow,
                fast
            ]);
        }

        /**
         * Update the element.
         * @param {Number} delta
         */
        update(delta) {
            galaxy.tilePosition.x -= 0.05;
            slow.tilePosition.x -= 1;
            fast.tilePosition.x -= 15;
        }
    }

    return Background;
})();