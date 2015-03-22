MiniGames.Preloader = function (game) {
    // define width and height of the game
    MiniGames.GAME_WIDTH = 640;
    MiniGames.GAME_HEIGHT = 960;
};
MiniGames.Preloader.prototype = {
    preload: function () {
        // set background color and preload image
        this.stage.backgroundColor = '#75acc9';
        this.preloadBar = this.add.sprite((MiniGames.GAME_WIDTH - 311) / 2, (MiniGames.GAME_HEIGHT - 27) / 2, 'preloaderBar');
        this.load.setPreloadSprite(this.preloadBar);
        // load images
        this.load.image('title', 'assets/minigames-logo-small.png');
        this.load.image('balloon', 'assets/balloon.png');
        this.load.image('bluedashed', 'assets/bluedashed.png');
        this.load.image('greyback', 'assets/greyback.png');
        this.load.image('ground', 'assets/dirt.png');
        this.load.image('volcano', 'assets/volcano.png');
        this.load.image('backButton', 'assets/back-button.png');
        this.load.image('flappyground', 'assets/flappyground.png');
        this.load.image('pipe', 'assets/pipe.png');
        this.load.image('pipecap', 'assets/pipecap.png');
        this.load.image('blackpattern', 'assets/blackpattern.png');
        this.load.image('bluestripeback', 'assets/bluestripeback.png');
        this.load.image('whitemask', 'assets/whitemask.png');
        this.load.image('sky', 'assets/sky.png');
        // load spritesheets
        this.load.spritesheet('button-start', 'assets/button-start.png', 401, 143, 3);
        this.load.spritesheet('monito', 'assets/monito.png', 40, 50, 4);
        this.load.spritesheet('meteorite', 'assets/meteorite.png', 50, 100, 8);
        this.load.spritesheet('flappybird', 'assets/flappybird.png',50,35,1);
        // load fonts
        this.load.bitmapFont('oswald', 'assets/fonts/oswald.png','assets/fonts/oswald.fnt');

    },
    create: function () {
        // start the MainMenu state
        this.state.start('MainMenu');
    }
};