const Thruster = (() => {
    /**
     * Generate fire thruster for rockets and spaceship.
     * @class Thruster
     * @extends Emitter
     */
    class Thruster extends Emitter {
        /**
         * Initialise a particle effect
         * @param {Array} assets
         * @param {Number} radius
         * @param {Number} length
         * @param {Number} x
         * @param {Number} y
         */
        constructor(assets, radius, length, x, y) {
            super({
                "alpha": {
                    "start": 0.62,
                    "end": 0
                },
                "scale": {
                    "start": 0.25,
                    "end": 0.25
                },
                "color": {
                    "start": "fff191",
                    "end": "ff622c"
                },
                "speed": {
                    "start": 500,
                    "end": 500
                },
                "startRotation": {
                    "min": 175,
                    "max": 185
                },
                "rotationSpeed": {
                    "min": 50,
                    "max": 50
                },
                "lifetime": {
                    "min": 0.05,
                    "max": length
                },
                "blendMode": "normal",
                "frequency": 0.001,
                "emitterLifetime": 0,
                "maxParticles": 500,
                "pos": {
                    "x": x,
                    "y": y
                },
                "addAtBack": false,
                "spawnType": "circle",
                "spawnCircle": {
                    "x": 0,
                    "y": 0,
                    "r": radius
                }
            }, assets);
        }
    }

    return Thruster;
})();