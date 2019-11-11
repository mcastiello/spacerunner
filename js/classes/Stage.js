const Stage = (() => {
    let renderer;
    let container;
    let elements = [];
    let lastTimestamp = 0;

    /**
     * Method the updates all the elements added to the stage.
     * @param {Number} timestamp
     * @private
     */
    const update = (timestamp) => {
        if (lastTimestamp > 0) {
            for (let element of elements) {
                element.update(timestamp-lastTimestamp);
                checkHits(element);
            }

            renderer.render(container);
        }

        lastTimestamp = timestamp;
    };

    /**
     * Check if there's been any impact.
     * @param {Element} source
     */
    const checkHits = (source) => {
        let area = source.hitArea;

        if (Boolean(area)) {
            for (let element of elements) {
                if (element !== source && element.checkHit(area)) {
                    element.impact();
                    source.impact();

                    break;
                }
            }
        }
    };

    /**
     * Trigger a frame of the animation loop and request the next one.
     * @param {Number} timestamp
     * @private
     */
    const animationLoop = (timestamp) => {
        update(timestamp);

        requestAnimationFrame(animationLoop);
    };

    /**
     * This class is meant to work as core renderer of the whole game.
     * All the object that will be added to the stage will be automatically updated.
     * @class Stage
     */
    class Stage {
        /**
         * Initialise the renderer and the stage container.
         * I'm not using the PIXI application as I want to have more control over the update loop.
         * @param {String} domElement
         */
        constructor(domElement) {
            renderer = new PIXI.Renderer({
                "view": document.getElementById(domElement),
                "width": 800,
                "height": 600,
                "transparent": true
            });

            container = new PIXI.Container();

            animationLoop(0);
        }

        /**
         * Add an element to the stage.
         * @param {Element} element
         */
        add(element) {
            if (elements.indexOf(element) < 0) {
                elements.push(element);

                element.setContainer(container);
            }
        }

        /**
         * Remove an element from the stage.
         * @param {Element} element
         */
        remove(element) {
            if (elements.indexOf(element) >= 0) {
                elements.splice(elements.indexOf(element), 1);

                element.setContainer(null);
            }
        }

        /**
         * Clear the stage.
         */
        clear() {
            let list = elements.slice();

            for (let element of list) {
                this.remove(element);
            }
        }
    }

    return Stage;
})();