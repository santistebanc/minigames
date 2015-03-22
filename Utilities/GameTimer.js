MiniGames.GameTimer = function (game, x, y, time) {

    this.game = game;
    this.timeleft = time;
    this.xpos = x;
    this.ypos = y;
    this.dashed = this.game.add.image(this.xpos, this.ypos, 'bluedashed');
    this.dashed.anchor.setTo(0.5);
    //alert(this.timeleft);
    this.counter = this.game.add.bitmapText(this.xpos, this.ypos, 'oswald', '00', 65);
    this.counter.x = this.dashed.x - 30;
    this.counter.text = this.timeleft.toString();
    this.counter.y = this.dashed.y - this.counter.textHeight / 2 + 13;
    this.timer = new Phaser.Timer(this.game);
    this.timer.loop(Phaser.Timer.SECOND, this.tick, this);
    this.timing = this.game.time.add(this.timer);

    this.timeupsignal = new Phaser.Signal();


};
MiniGames.GameTimer.prototype.tick = function () {
    this.timeleft--;
    if (this.timeleft == 0) {
        this.timeupsignal.dispatch();
    }
    this.counter.text = this.timeleft.toString();
    if (this.counter.text == '9') {
        this.counter.x = this.dashed.x - this.counter.textWidth / 2 + 10;
    } else if (this.counter.text == '7') {
        this.counter.x = this.dashed.x - this.counter.textWidth / 2 + 5;
    } else if (this.counter.text == '6') {
        this.counter.x = this.dashed.x - this.counter.textWidth / 2 - 5;
    }else if (this.counter.text == '1') {
        this.counter.x = this.dashed.x - this.counter.textWidth / 2 + 5;
    } else {
        this.counter.x = this.dashed.x - this.counter.textWidth / 2;
    }
};
MiniGames.GameTimer.prototype.start = function () {
    this.timer.start();
};
MiniGames.GameTimer.prototype.pause = function () {
    this.timer.pause();
};
MiniGames.GameTimer.prototype.stop = function () {
    this.timer.destroy()
};