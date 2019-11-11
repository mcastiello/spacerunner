const Intro = (() => {
    let container, logo, background, bar;
    let logoMove = 15;
    let introContainer;
    let galaxy, controls;
    let hyperspace;

    /**
     * Initialise the intro page with all the buttons.
     * @private
     */
    const initialiseIntro = () => {
        galaxy = TextureLibrary.getTilingSprite("galaxy", 800, 600);
        controls = TextureLibrary.getSprite("controls");
        hyperspace = new HyperSpace();

        introContainer.addChild(galaxy);

        hyperspace.setContainer(introContainer);

        introContainer.addChild(controls);

        // Add all the buttons
        let button1 = new Button("Game 1", 400, 220, () => startGame());
        let button2 = new Button("Game 2", 400, 325, () => startGame());
        let button3 = new Button("Game 3", 400, 430, () => startGame());
        let button4 = new Button("Exit", 400, 535, () => {
            location.href = "https://github.com/mcastiello/spacerunner";
        });

        button1.setContainer(introContainer);
        button2.setContainer(introContainer);
        button3.setContainer(introContainer);
        button4.setContainer(introContainer);

        controls.position.x = Math.round((800 - controls.width) / 2);
        controls.position.y = Math.round((600 - controls.height) / 2);
    };

    /**
     * Handle the game intro.
     * @class Intro
     * @extends Element
     */
    class Intro extends Element {
        /**
         * Initialise all the background elements.
         */
        constructor() {
            container = new PIXI.Container();
            introContainer = new PIXI.Container();
            logo = TextureLibrary.getSprite("title");
            background = new PIXI.Sprite(PIXI.Texture.WHITE);
            background.tint = 0x000000;
            background.width = 800;
            background.height = 600;
            bar = new ProgressBar();

            logo.position.x = Math.round((800 - logo.width) / 2);
            logo.position.y = Math.round((500 - logo.height) / 2);

            container.addChild(background);
            container.addChild(logo);

            bar.setContainer(container);

            super([introContainer, container]);
        }

        /**
         * Update the element.
         * @param {Number} delta
         */
        update(delta) {
            bar.update(delta);

            if (Boolean(hyperspace)) { // Tween the background and update the particle effect.
                hyperspace.update(delta);
                galaxy.tilePosition.y -= 0.2;
            } else if (TextureLibrary.loaded) { // Initialise all the intro elements.
                initialiseIntro();
            }

            // Fade out the splash screen.
            if (bar.progress === 100) {
                if (background.alpha > 0) {
                    background.alpha -= 0.05;
                    bar.alpha -= 0.05;

                    logo.position.y -= logoMove;

                    logoMove -= 0.75;
                }
            }
        }
    }

    return Intro;
})();