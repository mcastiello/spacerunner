const Element = (() => {
    let dataMap = new WeakMap();

    /**
     * Abstract class used to create all the elements.
     * @class Element
     */
    class Element {
        /**
         * Add all the provided PIXI elements to the general container.
         * @param {Array} pixiElements
         * @param {Object} [hitArea]
         * @param {Number} [hitArea.x]
         * @param {Number} [hitArea.y]
         * @param {Number} [hitArea.width]
         * @param {Number} [hitArea.height]
         */
        constructor(pixiElements, hitArea) {
            let container = new PIXI.Container();
            dataMap.set(this, {
                "container": container,
                "hitArea": hitArea
            });

            for (let element of pixiElements) {
                container.addChild(element);
            }
        }

        /**
         * Get the hit area of the element.
         * @returns {PIXI.Rectangle}
         */
        get hitArea() {
            let hitArea = dataMap.get(this).hitArea;
            let position = dataMap.get(this).container.getChildAt(0).position;

            if (Boolean(hitArea)) {
                return new PIXI.Rectangle(
                    hitArea.x + position.x,
                    hitArea.y + position.y,
                    hitArea.width,
                    hitArea.height,
                );
            }
        }

        /**
         * Check if there's been an impact.
         * @param {PIXI.Rectangle} rectangle
         * @returns {Boolean}
         */
        checkHit(rectangle) {
            let area = this.hitArea;
            let points;

            if (Boolean(rectangle) && Boolean(area)) {
                points = [
                    { "x": rectangle.x, "y": rectangle.y },
                    { "x": rectangle.x, "y": rectangle.y + rectangle.height },
                    { "x": rectangle.x + rectangle.width, "y": rectangle.y + rectangle.height },
                    { "x": rectangle.x + rectangle.width, "y": rectangle.y }
                ];

                for (let i=0; i<4; i++) {
                    if (area.contains(points[i].x, points[i].y)) {
                        return true;
                    }
                }
            }

            return false;
        }

        /**
         * Set the parent container.
         * @param {PIXI.Container} parent
         */
        setContainer(parent) {
            let container = dataMap.get(this).container;
            let currentParent = container.parent;

            if (Boolean(currentParent)) {
                currentParent.removeChild(container);
            }
            if (Boolean(parent)) {
                parent.addChild(container);
            }
        }

        /**
         * Brace! Brace! There's been an impact.
         */
        impact() {}

        /**
         * Update the element.
         * @param {Number} delta
         * @abstract
         */
        update(delta) {}
    }

    return Element;
})();