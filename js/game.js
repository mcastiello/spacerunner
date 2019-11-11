let stage;
let intro;
let background;
let spaceship;
let alienInterval;

const showIntro = () => {
    intro = new Intro();

    stage.add(intro);
};

const startGame = () => {
    if (!Boolean(background)) {
        background = new Background();
        spaceship = new SpaceShip();
    }

    stage.clear();

    stage.add(background);
    stage.add(spaceship);

    window.addEventListener("keydown", onKeyPress);
    window.addEventListener("keyup", onKeyRelease);

    alienInterval = setInterval(() => {
        new AlienShip();
    }, 2000);
};

const gameOver = () => {
    window.removeEventListener("keydown", onKeyPress);
    window.removeEventListener("keyup", onKeyRelease);

    clearInterval(alienInterval);

    setTimeout(() => {
        stage.clear();
        stage.add(intro);
    }, 2000);
};

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
        active:e=>{
            stage = new Stage("spaceRunner");

            TextureLibrary.preload.then(() => showIntro());
        }
    });
};