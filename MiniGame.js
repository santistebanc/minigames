MiniGames.MiniGame = function (game, title, background, timertime) {
    Phaser.State.call(this, game, undefined);

    this.game = game;
    this.title = title;
    this.background = background;
    this.timertime = timertime;

};

MiniGames.MiniGame.prototype = Object.create(Phaser.State.prototype);
MiniGames.MiniGame.constructor = MiniGames.MiniGame;

MiniGames.MiniGame.prototype.create = function () {
    //initiate variables
    this.firsttime = true;
    this.introed = false;
    this.alreadywon = false;
    this.alreadylost = false;


    //events
    this.winsignal = new Phaser.Signal();
    this.winsignal.addOnce(this.win, this);


    //background
    this.add.image(0, 0, this.background);

    this.drawscenery();

    this.drawobjects();

    //restart button
    this.backButton = this.game.add.sprite(5, 855, 'backButton');
    this.backButton.inputEnabled = true;
    this.backButton.events.onInputUp.add(function () {
      MiniGames.transitions.to('MainMenu');
    }, this);


    //timer
    this.gametimer = new MiniGames.GameTimer(this.game, 550, 80, this.timertime);
    this.gametimer.timeupsignal.addOnce(this.timeup, this);


    //intro banner
    this.introbanner = new MiniGames.Banner(this.game, this.title, 120, 0x000000, false);
    this.introbanner.show();
    this.introbanner.done.addOnce(this.startgame, this);

};

MiniGames.MiniGame.prototype.drawscenery = function () {};
MiniGames.MiniGame.prototype.drawobjects = function () {};
MiniGames.MiniGame.prototype.gamefirstaction = function () {};
MiniGames.MiniGame.prototype.gameaction = function () {};

MiniGames.MiniGame.prototype.startgame = function () {
    this.introed = true;
    this.gametimer.start();
};

MiniGames.MiniGame.prototype.update = function () {
    if (this.introed) {
        if (this.firsttime) {
            this.firsttime = false;
            this.gamefirstaction();
        }
        this.gameaction();
    }
};

MiniGames.MiniGame.prototype.timeup = function () {
    this.gametimer.stop();
};

MiniGames.MiniGame.prototype.lose = function (delay) {
    if (!this.alreadywon) {
        this.alreadylost = true;
        this.gametimer.stop();
        var tim = 200;
        if(delay){
            tim = delay;
        }
        this.game.time.events.add(tim, this.showlose, this);
    }

};

MiniGames.MiniGame.prototype.showlose = function () {
    //fail banner
    this.failbanner = new MiniGames.Banner(this.game, 'FAIL', 140, 0xee0000, false,1);
    this.failbanner.show();
    this.failbanner.done.addOnce(this.changegame, this);
};

MiniGames.MiniGame.prototype.showwin = function () {
    //fail banner
    this.failbanner = new MiniGames.Banner(this.game, 'WIN', 140, 0x00ee00, false);
    this.failbanner.show();
    this.failbanner.done.addOnce(this.changegame, this);
};

MiniGames.MiniGame.prototype.win = function (delay) {
    if (!this.alreadylost) {
        /*this.gametimer.stop();
        this.alreadywon = true;
        var tim = 500;
        if(delay){
            tim = delay;
        }
        this.game.time.events.add(tim, this.showwin, this);*/
        this.changegame();
    }
};

MiniGames.MiniGame.prototype.changegame = function () {
  MiniGames.transitions.to('InterScreen');
};
