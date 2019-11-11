const SpaceShip = (() => {
    let dataMap = new WeakMap();

    /**
     * Handle the player spaceship.
     * @class SpaceShip
     * @extends Element
     */
    class SpaceShip extends Element {
        /**
         * Initialise the ship.
         */
        constructor() {
            let container = new PIXI.Container();
            let ship = TextureLibrary.getSprite("spaceship");
            let thruster = new Thruster(["particle", "fire"], 8, 0.25, 60, ship.height/2);

            thruster.setContainer(container);
            container.addChild(ship);

            super([container], {
                "x": Math.round(ship.width/4),
                "y": Math.round(ship.height/4),
                "width": Math.round(ship.width/2) - 20,
                "height": Math.round(ship.height/2)
            });

            dataMap.set(this, {
                "ship": container,
                "thruster": thruster,
                "moveX": 0,
                "moveY": 0,
                "positionX": 30,
                "positionY": Math.round(300 - ship.height/2)
            });
        }

        /**
         * Get the position of the SpaceShip
         * @returns {Number}
         */
        get x() {
            return dataMap.get(this).positionX;
        }

        /**
         * Set the position of the spaceship.
         * @param {Number} value
         */
        set x(value) {
            value = Math.max(30, value);
            value = Math.min(value, 770-dataMap.get(this).ship.width);

            dataMap.get(this).positionX = value;

            dataMap.get(this).ship.position.x = value;
        }

        /**
         * Get the position of the SpaceShip
         * @returns {Number}
         */
        get y() {
            return dataMap.get(this).positionY;
        }

        /**
         * Set the position of the spaceship.
         * @param {Number} value
         */
        set y(value) {
            value = Math.max(10, value);
            value = Math.min(value, 590-dataMap.get(this).ship.height);

            dataMap.get(this).positionY = value;

            dataMap.get(this).ship.position.y = value;
        }

        /**
         * Shoot 2 missiles.
         * @returns [Array]
         */
        shoot() {
            return [
                new Rocket(this.x + 95, this.y + 5),
                new Rocket(this.x + 95, this.y + 85)
            ];
        }

        /**
         * Move the ship up.
         */
        moveUp() {
            dataMap.get(this).moveY = -5;
        }

        /**
         * Move the ship down.
         */
        moveDown() {
            dataMap.get(this).moveY = 5;
        }

        /**
         * Move the ship left.
         */
        moveLeft() {
            dataMap.get(this).moveX = -5;
        }

        /**
         * Move the ship right.
         */
        moveRight() {
            dataMap.get(this).moveX = 5;
        }

        /**
         * Stop the ship from moving.
         */
        stop() {
            dataMap.get(this).moveX = 0;
            dataMap.get(this).moveY = 0;
        }

        /**
         * When a missile hit an alien spaceship, we remove the ship and trigger an explosion.
         */
        impact() {
            let area = this.hitArea;

            new Explosion(area.x + area.width/2, area.y + area.height/2);

            this.stop();

            this.x = 30;
            this.y = Math.round(300 - dataMap.get(this).ship.height/2);

            stage.remove(this);

            gameOver();
        }

        /**
         * Update the element.
         * @param {Number} delta
         */
        update(delta) {
            this.x += dataMap.get(this).moveX;
            this.y += dataMap.get(this).moveY;
            dataMap.get(this).thruster.update(delta);
        }
    }

    return SpaceShip;
})();