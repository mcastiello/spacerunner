const Missile = (() => {
    let dataMap = new WeakMap();

    /**
     * Handle a single missile.
     * @class Missile
     * @extends Element
     */
    class Missile extends Element {
        /**
         * Initialise the missile on the requested coordinates.
         * @param {Number} x
         * @param {Number} y
         * @param {Number} direction
         * @param {String} asset
         * @param {Boolean} useThrusters
         */
        constructor(x, y, direction, asset, useThrusters) {
            let container = new PIXI.Container();
            let missile = TextureLibrary.getSprite(asset);
            let thruster;

            container.position.x = x;
            container.position.y = y;

            if (useThrusters) {
                thruster = new Thruster(["particle"], 1, 0.05, 5, missile.height/2);
                thruster.setContainer(container);
            }
            container.addChild(missile);

            super([container], {
                "x": 0,
                "y": 0,
                "width": missile.width,
                "height": missile.height
            });

            dataMap.set(this, {
                "missile": container,
                "thruster": thruster,
                "direction": direction
            });

            stage.add(this);
        }

        /**
         * Get the position of the missile.
         * @returns {Number}
         */
        get position() {
            return dataMap.get(this).missile.position.x;
        }

        /**
         * When a missile hit, we only want it to disappear.
         */
        impact() {
            stage.remove(this);
        }

        /**
         * Update the element.
         * @param {Number} delta
         */
        update(delta) {
            dataMap.get(this).missile.position.x += 15 * dataMap.get(this).direction;

            if (Boolean(dataMap.get(this).thruster)) {
                dataMap.get(this).thruster.update(delta);
            }

            if (this.position > 1000 || this.position < -50) {
                stage.remove(this);
            }
        }
    }

    return Missile;
})();