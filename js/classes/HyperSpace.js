const HyperSpace = (() => {
    /**
     * Generate fire thruster for rockets and spaceship.
     * @class HyperSpace
     * @extends Emitter
     */
    class HyperSpace extends Emitter {
        /**
         * Initialise a particle effect.
         */
        constructor() {
            super({
                "alpha": {
                    "start": 1,
                    "end": 1
                },
                "scale": {
                    "start": 0.1,
                    "end": 0.01,
                    "minimumScaleMultiplier": 1
                },
                "color": {
                    "start": "e4f9ff",
                    "end": "3fcbff"
                },
                "speed": {
                    "start": 200,
                    "end": 50,
                    "minimumSpeedMultiplier": 1.1
                },
                "acceleration": {
                    "x": 2,
                    "y": 0
                },
                "maxSpeed": 0,
                "startRotation": {
                    "min": 0,
                    "max": 360
                },
                "noRotation": true,
                "rotationSpeed": {
                    "min": 0,
                    "max": 0
                },
                "lifetime": {
                    "min": 1.01,
                    "max": 5
                },
                "blendMode": "normal",
                "frequency": 0.001,
                "emitterLifetime": 0,
                "maxParticles": 1000,
                "pos": {
                    "x": 400,
                    "y": 500
                },
                "addAtBack": false,
                "spawnType": "circle",
                "spawnCircle": {
                    "x": 0,
                    "y": 0,
                    "r": 0
                }
            }, ["particle"]);
        }
    }

    return HyperSpace;
})();