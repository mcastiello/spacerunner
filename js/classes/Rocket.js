const Rocket = (() => {
    /**
     * Handle a single missile.
     * @class Rocket
     * @extends Missile
     */
    class Rocket extends Missile {
        /**
         * Initialise the missile on the requested coordinates.
         * @param {Number} x
         * @param {Number} y
         */
        constructor(x, y) {
            super(x, y, 1, "large-missile", true);
        }
    }

    return Rocket;
})();