const AlienShip = (() => {
    let dataMap = new WeakMap();

    /**
     * Handle the enemy spaceship.
     * @class AlienShip
     * @extends Element
     */
    class AlienShip extends Element {
        /**
         * Initialise the ship.
         */
        constructor() {
            let container = new PIXI.Container();
            let ship = TextureLibrary.getSprite("enemy-ship");

            container.position.x = 850;
            container.position.y = Math.round((600 - ship.height) * Math.random());

            container.addChild(ship);

            super([container], {
                "x": Math.round(ship.width/4),
                "y": Math.round(ship.height/4),
                "width": Math.round(ship.width/2),
                "height": Math.round(ship.height/2)
            });

            dataMap.set(this, {
                "ship": container,
                "direction": Math.round(Math.random() * 100) % 2 === 0 ? 1 : -1,
                "steer": Math.round(Math.random() * 50) + 10,
                "changeCounter": 0,
                "shootInterval": setInterval(() => { // Adding an interval to allow alien ships to shoot
                    new Torpedo(
                        container.position.x - 10,
                        container.position.y + ship.height/2 - 10)
                }, 200 + Math.round(Math.random() * 1000))
            });

            stage.add(this);
        }

        /**
         * When a missile hit an alien spaceship, we remove the ship and trigger an explosion.
         */
        impact() {
            let area = this.hitArea;

            new Explosion(area.x + area.width/2, area.y + area.height/2);

            stage.remove(this);
        }

        /**
         * Overriding in order to make sure that, when it disappear, it also stops firing its torpedos.
         * @param parent
         */
        setContainer(parent) {
            super.setContainer(parent);

            if (!Boolean(parent)) {
                clearInterval(dataMap.get(this).shootInterval);
            }
        }

        /**
         * Update the element.
         * @param {Number} delta
         */
        update(delta) {
            let ship = dataMap.get(this).ship;
            let direction = dataMap.get(this).direction;
            let steer = dataMap.get(this).steer;
            let position = ship.position.y + direction;

            position = Math.max(10, position);
            position = Math.min(position, 590-ship.height);

            ship.position.x -= 5;
            ship.position.y = position;

            // Check randomly if the ship should change direction.
            if (dataMap.get(this).changeCounter === 10) {
                if (Math.round(Math.random() * 10000) % steer === 0) {
                    dataMap.get(this).direction *= -1;
                }
                dataMap.get(this).changeCounter = 0;
            }
            dataMap.get(this).changeCounter++;

            if (ship.position.x < - 150) {
                stage.remove(this);
            }
        }
    }

    return AlienShip;
})();