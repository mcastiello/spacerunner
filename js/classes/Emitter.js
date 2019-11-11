const Emitter = (() => {
    let dataMap = new WeakMap();

    /**
     * Used to emit particles.
     * @class Emitter
     * @extends Element
     */
    class Emitter extends Element {
        /**
         * Initialise a particle effect.
         * @param config
         * @param assets
         */
        constructor(config, assets) {
            let container = new PIXI.Container();
            let sprites = [];

            for (let asset of assets) {
                sprites.push(TextureLibrary.getTexture(asset));
            }

            super([container]);

            dataMap.set(this, {
                "emitter": new PIXI.particles.Emitter(
                    container,
                    sprites,
                    config
                )
            });
        }

        /**
         * Update the element.
         * @param {Number} delta
         */
        update(delta) {
            dataMap.get(this).emitter.update(delta / 1000);
        }
    }

    return Emitter;
})();