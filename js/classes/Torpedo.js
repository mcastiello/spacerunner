const Torpedo = (() => {
    /**
     * Handle a single missile.
     * @class Torpedo
     * @extends Missile
     */
    class Torpedo extends Missile {
        /**
         * Initialise the missile on the requested coordinates.
         * @param {Number} x
         * @param {Number} y
         */
        constructor(x, y) {
            super(x, y, -1, "enemy-missile", false);
        }
    }

    return Torpedo;
})();