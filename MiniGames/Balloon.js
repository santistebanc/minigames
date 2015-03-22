MiniGames.Balloon = function (game) {

    this.balloonsize = 0.2;

};
MiniGames.Balloon.prototype = {
    create: function () {
        //load background    
        this.add.image(0, 0, 'greyback');
        //load timer    
        this.gametimer = new MiniGames.GameTimer(this.game, 550, 80, 10);
        this.game.add.existing(this.gametimer);
        //listen to timeup event
        this.gametimer.timeupsignal.addOnce(this.timeup, this);

        //set events
        this.winsignal = new Phaser.Signal();
        this.winsignal.addOnce(this.win, this);

        //draw balloon
        this.balloon = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'balloon');
        this.balloon.anchor.set(0.5);
        this.balloon.scale.x = this.balloonsize;
        this.balloon.scale.y = this.balloonsize;

        //go to inflate when pressed
        this.game.input.onDown.add(this.pressme, this);

    },
    update: function () {
        //deflate balloon when not pressed
        if (this.balloonsize > 0.2) {
            this.balloonsize /= 1 + (this.balloonsize / 80);
            this.balloon.scale.x = this.balloonsize;
            this.balloon.scale.y = this.balloonsize;
        }
        //win if it reaches certain size
        if (this.balloonsize >= 0.5) {
            this.winsignal.dispatch();
        }
    },
    pressme: function () {
        //inflate
        this.balloonsize *= 1.1;
        this.balloon.scale.x = this.balloonsize;
        this.balloon.scale.y = this.balloonsize;
    },
    timeup: function () {
        alert('timeup!');
    },
    win: function () {
        alert('you win!');
    }
};