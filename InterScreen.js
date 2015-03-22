var rangame = 'FallingRocks';
MiniGames.InterScreen = function (game) {
    this.game = game;
};
MiniGames.InterScreen.prototype = {
    create: function () {

        var bgtile = this.add.tileSprite(0, 0, this.game.width, this.game.height, 'bluestripeback', 1);
        bgtile.autoScroll(100, 0);
        this.add.image(0, 0, 'whitemask');

        this.banner = this.game.add.bitmapText(100, 150, 'oswald', 'get ready', 80);
        this.banner.align = 'center';
        this.banner.x = this.game.width / 2 - this.banner.textWidth / 2;

        this.scaleit = this.game.add.tween(this.banner.scale).from({
            x: 0.8,
            y: 0.8
        }, 500, Phaser.Easing.Sinusoidal.InOut, true);
        this.bounce = this.game.add.tween(this.banner).from({
            alpha: 0,
            y: 0
        }, 500, Phaser.Easing.Sinusoidal.InOut, true);

        this.game.time.events.add(2000, this.startGame, this);
    },
    startGame: function () {
        // start the Game state
        if(rangame == 'FlappyBird'){
          rangame = 'FallingRocks';
        }else{
          rangame = 'FlappyBird';
        }
        MiniGames.transitions.to(rangame);
        //this.state.start('FallingRocks');
    }
};
