let stage;
let intro;
let background;
let spaceship;
let alienInterval;

/**
 * Show the game intro with the pre-loader.
 */
const showIntro = () => {
    intro = new Intro();

    stage.add(intro);
};

/**
 * Start a new game.
 */
const startGame = () => {
    if (!Boolean(background)) {
        background = new Background();
        spaceship = new SpaceShip();
    }

    // Make sure that everything has been removed from screen.
    stage.clear();

    stage.add(background);
    stage.add(spaceship);

    // Add the keyboard listeners.
    window.addEventListener("keydown", onKeyPress);
    window.addEventListener("keyup", onKeyRelease);

    // Trigger an alien ship every 2 seconds.
    alienInterval = setInterval(() => {
        new AlienShip();
    }, 2000);
};

/**
 * Reset the game to the intro page.
 */
const gameOver = () => {
    window.removeEventListener("keydown", onKeyPress);
    window.removeEventListener("keyup", onKeyRelease);

    clearInterval(alienInterval);

    // Changing the view after a couple of seconds just to give
    // the player the sense of defeat while watching the spaship exploding
    setTimeout(() => {
        stage.clear();
        stage.add(intro);
    }, 2000);
};

/**
 * Handle the keyboard controls for the game.
 * @param {KeyboardEvent} event
 */
const onKeyPress = (event) => {
    if (!event.repeat) {
        switch (event.keyCode) {
            case 37: // ARROW LEFT
                spaceship.moveLeft();
                break;
            case 38: // ARROW UP
                spaceship.moveUp();
                break;
            case 39: // ARROW RIGHT
                spaceship.moveRight();
                break;
            case 40: // ARROW DOWN
                spaceship.moveDown();
                break;
            case 32: // SPACE BAR
                spaceship.shoot();
                break;
        }
    }
};

/**
 * Stop the spaceship movevent when the arrow keys are released.
 * @param {KeyboardEvent} event
 */
const onKeyRelease = (event) => {
    switch (event.keyCode) {
        case 37: // ARROW LEFT
        case 38: // ARROW UP
        case 39: // ARROW RIGHT
        case 40: // ARROW DOWN
            spaceship.stop();
            break;
    }
};

window.onload = () => {
    WebFont.load({
        google: {
            families: ['Orbitron']
        },
        active:e=>{ // Waiting for the font to be loaded before initialising the game.
            stage = new Stage("spaceRunner");

            TextureLibrary.preload.then(() => showIntro());
        }
    });
};