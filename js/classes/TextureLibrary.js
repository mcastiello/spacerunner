const TextureLibrary = (() => {
    let path = "assets/";
    let progress = 0;
    let total = 0;
    let textures = {};
    let assetPromise;
    let assetPreload;

    /**
     * Load a list of assets.
     * @param {Array} list
     * @returns {Promise}
     */
    const loadAssetList= (list) => {
        let loader = new PIXI.Loader();
        // Increase the progress once an element is loaded.
        loader.onProgress.add(() => { progress++; });

        // Add all the assets to load.
        for (let asset of list) {
            loader.add(asset, path + asset + ".png");
            total++;
        }

        return new Promise((resolve, reject) => {
            // Notify that the loader couldn't load the textures.
            loader.onError.add(() => reject(new Error("Unable to load assets")));

            // Once it is loaded, all the textures are stored into the private data.
            loader.load((loader, resources) => {
                for (let name in resources) {
                    if (resources[name].hasOwnProperty("texture")) {
                        textures[name] = resources[name].texture;
                    }
                }

                resolve();
            });
        });
    };

    /**
     * This class is meant to store all the textures and provide an easy way to generate new sprites.
     * @class TextureLibrary
     */
    class TextureLibrary {
        /**
         * Will load all the textures and store into private data.
         * @param {Array} preload
         * @param {Array} assets
         */
        constructor(preload, assets) {
            assetPreload = loadAssetList(preload);
            assetPromise = loadAssetList(assets);
        }

        /**
         * Get the download progress value.
         * @returns {Number}
         */
        get progress() {
            return Math.round(progress/total*100);
        }

        /**
         * Check if the library is fully loaded.
         * @returns {Boolean}
         */
        get loaded() {
            return this.progress === 100;
        }

        /**
         * Get a reference to the library loader promise.
         * @returns {Promise}
         */
        get loader() {
            return assetPromise;
        }

        /**
         * Get a reference to the library preloader promise.
         * @returns {Promise}
         */
        get preload() {
            return assetPreload;
        }

        /**
         * Get the requested texture.
         * @param {String} name
         * @returns {PIXI.Texture}
         */
        getTexture(name) {
            if (textures.hasOwnProperty(name)) {
                return textures[name];
            }
        }

        /**
         * Create a sprite with the requested texture.
         * @param {String} name
         * @returns {PIXI.Sprite}
         */
        getSprite(name) {
            if (textures.hasOwnProperty(name)) {
                return new PIXI.Sprite(textures[name]);
            }
        }

        /**
         * Create a tiling sprite with the requested texture.
         * @param {String} name
         * @param {Number} [width]
         * @param {Number} [height]
         * @returns {PIXI.TilingSprite}
         */
        getTilingSprite(name, width, height) {
            if (textures.hasOwnProperty(name)) {
                return new PIXI.TilingSprite(textures[name], width, height);
            }
        }
    }

    // I'm going to create this as a static instance.
    return new TextureLibrary([
        "title",
        "progress",
        "bar"
    ], [
        "button",
        "controls",
        "enemy-missile",
        "enemy-ship",
        "fast-stars",
        "fire",
        "galaxy",
        "large-missile",
        "particle",
        "slow-stars",
        "spaceship"
    ]);
})();