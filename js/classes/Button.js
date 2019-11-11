const Button = (() => {
    let dataMap = new WeakMap();

    /**
     * Class used to create a clickable button.
     * @class Button
     * @extends Element
     */
    class Button extends Element {
        /**
         * Initialise the button elements.
         */
        constructor(text, x, y, callback) {
            let container = new PIXI.Container();
            let background = TextureLibrary.getSprite("button");
            let style = new PIXI.TextStyle({
                fontFamily: "Orbitron",
                fontSize: 36,
                fill: 'white',
                fontWeight: 'bold',
                stroke: 'black',
                strokeThickness: 6,
                align: 'center'
            });
            let content = new PIXI.Text(text, style);

            container.addChild(background);
            container.addChild(content);

            container.buttonMode = true;
            container.cursor = "pointer";
            container.interactive = true;
            container.position.x = x - Math.round(background.width/2);
            container.position.y = y - Math.round(background.height/2);

            content.position.x = Math.round((background.width - content.width) / 2);
            content.position.y = Math.round((background.height - content.height) / 2);

            container.on("click", () => callback());

            super([container]);
        }

        /**
         * Update the element.
         * @param {Number} delta
         */
        update(delta) {}
    }

    return Button;
})();