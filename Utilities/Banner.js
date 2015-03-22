MiniGames.Banner = function (game, text, size, tint, waitend, animation) {
    this.game = game;
    this.waitend = waitend;
    this.banner = game.add.bitmapText(100, 300, 'oswald', text, size);
    this.banner.tint = tint;
    this.banner.align = 'center';
    this.banner.x = game.width / 2 - this.banner.textWidth / 2;
    this.done = new Phaser.Signal();
    if (animation) {
        this.animation = animation;
    } else {
        this.animation = 0;
    }
};

MiniGames.Banner.prototype = {
    show: function () {
        if (this.animation == 0) {
            this.scaleit = this.game.add.tween(this.banner.scale).from({
                x: 0.8,
                y: 0.8
            }, 500, Phaser.Easing.Sinusoidal.InOut, true);
            this.bounce = this.game.add.tween(this.banner).from({
                alpha: 0,
                y: 350,
                x: this.game.width / 2 - this.banner.textWidth * 0.8 / 2
            }, 500, Phaser.Easing.Sinusoidal.InOut, true);
        } else {
            this.scaleit = this.game.add.tween(this.banner.scale).from({
                x: 2,
                y: 2
            }, 500, Phaser.Easing.Sinusoidal.InOut, true);
            this.bounce = this.game.add.tween(this.banner).from({
                alpha: 0,
                y: 350,
                x: this.game.width / 2 - this.banner.textWidth * 2 / 2
            }, 500, Phaser.Easing.Sinusoidal.InOut, true);
        }
        this.bounce.onComplete.addOnce(this.firstcomplete, this);
    },
    firstcomplete: function () {
        this.fadeout = this.game.add.tween(this.banner).to({
            alpha: 0
        }, 500, Phaser.Easing.Sinusoidal.InOut, true, 500);
        if (this.waitend) {
            this.fadeout.onComplete.addOnce(this.end, this);
        } else {
            this.fadeout.onStart.addOnce(this.end, this);
        }
    },
    end: function () {
        this.done.dispatch();
    }
};