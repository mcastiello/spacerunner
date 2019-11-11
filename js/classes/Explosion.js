const Explosion = (() => {
    /**
     * Generate an explosion for a spaceship.
     * @class Thruster
     * @extends Emitter
     */
    class Explosion extends Emitter {
        /**
         * Initialise a particle effect
         * @param {Number} x
         * @param {Number} y
         */
        constructor(x, y) {
            super({
                "alpha": {
                    "start": 0.8,
                    "end": 0.1
                },
                "scale": {
                    "start": 1,
                    "end": 0.3
                },
                "color": {
                    "start": "fd1111",
                    "end": "f7a134"
                },
                "speed": {
                    "start": 200,
                    "end": 200
                },
                "startRotation": {
                    "min": 0,
                    "max": 0
                },
                "rotationSpeed": {
                    "min": 0,
                    "max": 0
                },
                "lifetime": {
                    "min": 0.8,
                    "max": 0.8
                },
                "frequency": 0.05,
                "emitterLifetime": 0.3,
                "maxParticles": 1000,
                "pos": {
                    "x": x,
                    "y": y
                },
                "addAtBack": false,
                "spawnType": "burst",
                "particlesPerWave": 20,
                "particleSpacing": 0,
                "angleStart": 0
            }, ["particle"]);

            stage.add(this);
        }
    }

    return Explosion;
})();