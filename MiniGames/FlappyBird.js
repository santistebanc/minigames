MiniGames.FlappyBird = function (game) {
    MiniGames.MiniGame.call(this, game, 'flap', undefined, 10);
    this.groundheight = 790;
    this.scrollspeed = 300;
    this.separation = 100;
    this.gap = 250;
    this.jump = 600;
    this.pipewidth = 70;
};

MiniGames.FlappyBird.prototype = Object.create(MiniGames.MiniGame.prototype);
MiniGames.FlappyBird.constructor = MiniGames.FlappyBird;


MiniGames.FlappyBird.prototype.drawscenery = function () {
    this.game.add.image(0, 0, 'sky',1);
    this.ground = this.game.add.sprite(0, this.groundheight, 'flappyground');
};


MiniGames.FlappyBird.prototype.drawobjects = function () {
    this.count = 0;
    this.sepcount = 0;
    this.crashed = false;

    this.game.physics.arcade.setBounds(0, 0, this.game.width, this.groundheight)


    this.game.physics.arcade.enable(this.ground);

    //objects

    this.pipesdown = this.game.add.group();
    this.pipesup = this.game.add.group();
    this.pipecaps = this.game.add.group();

    this.pipesdown.enableBody = true;
    this.pipesdown.physicsBodyType = Phaser.Physics.ARCADE;

    this.pipesup.enableBody = true;
    this.pipesup.physicsBodyType = Phaser.Physics.ARCADE;

    this.pipecaps.enableBody = true;
    this.pipecaps.physicsBodyType = Phaser.Physics.ARCADE;


    for (var i = 0; i < 10; i++) {
        var newpipe = this.pipesdown.create(700, this.groundheight, 'pipe');
        newpipe.anchor.set(0.5, 1);
        newpipe.width = this.pipewidth;
        newpipe.kill();
    }
    for (var i = 0; i < 10; i++) {
        var newpipe = this.pipesup.create(700, 0, 'pipe');
        newpipe.anchor.set(0.5, 0);
        newpipe.width = this.pipewidth;
        newpipe.kill();
    }
    for (var i = 0; i < 10; i++) {
        var newcap = this.pipecaps.create(400, 100, 'pipecap');
        newcap.anchor.set(0.5, 0.5);
        newcap.width = this.pipewidth + 10;
        newcap.kill();
    }
    
    this.bird = this.game.add.sprite(100, 400, 'flappybird');
    this.bird.anchor.set(0.5);
    this.game.physics.arcade.enable(this.bird);
    this.bird.body.allowGravity = true;
    this.bird.body.collideWorldBounds = true;

};

MiniGames.FlappyBird.prototype.gamefirstaction = function () {
    this.bird.body.gravity.y = 2000;
    this.downpress = this.game.input.onDown;
    this.downpress.add(this.flap, this);

    //scroll
    this.ground.body.velocity.x = -this.scrollspeed;

};

MiniGames.FlappyBird.prototype.gameaction = function () {
    //this.game.physics.arcade.overlap(this.bird, this.ground, this.crash, null, this);
    if (!this.crashed) {
        this.game.physics.arcade.collide(this.bird, this.pipesdown, this.crash, null, this);
        this.game.physics.arcade.collide(this.pipesup, this.bird, this.crash, null, this);
        this.game.physics.arcade.collide(this.bird, this.pipecaps, this.crash, null, this);
        if(this.bird.body.onFloor()){
            this.crash();
        }
        this.generatepipes();
        this.scroll();
        
        this.bird.angle = this.bird.body.velocity.y/50;
    }else{
        this.fallbird();
    }
};

MiniGames.FlappyBird.prototype.fallbird = function(){
    if(this.bird.angle < 80){
        this.bird.body.drag.x = 500;
        this.bird.angle += this.bird.body.velocity.y/200;
    }
};

MiniGames.FlappyBird.prototype.scroll = function () {
    if (this.ground.x <= -this.ground.width / 2) {
        this.ground.x = 0;
    }
    this.pipesdown.forEachAlive(function (pipe) {
        if (pipe.x < -40) {
            pipe.kill();
        }
    }, this);
    this.pipesup.forEachAlive(function (pipe) {
        if (pipe.x < -40) {
            pipe.kill();
        }
    }, this);
    this.pipecaps.forEachAlive(function (pipe) {
        if (pipe.x < -40) {
            pipe.kill();
        }
    }, this);
};

MiniGames.FlappyBird.prototype.flap = function () {
    this.bird.body.velocity.y = -this.jump;
};

MiniGames.FlappyBird.prototype.crash = function () {
    this.crashed = true;
    this.ground.body.velocity.x = 0;
    this.pipesdown.forEachAlive(function (pipe) {
        pipe.body.velocity.x = 0;
    }, this);
    this.pipesup.forEachAlive(function (pipe) {
        pipe.body.velocity.x = 0;
    }, this);
    this.pipecaps.forEachAlive(function (pipe) {
        pipe.body.velocity.x = 0;
    }, this);
    this.downpress.removeAll();
    this.lose();
};

MiniGames.FlappyBird.prototype.generatepipes = function () {
    if (this.sepcount % this.separation == 0) {
        var mypipe = this.pipesdown.getFirstDead();
        var mycap = this.pipecaps.getFirstDead();
        if (mypipe) {
            mypipe.revive();
            mypipe.x = 700;
            mypipe.height = 500 - Math.random() * 300;
            mypipe.body.velocity.x = -this.scrollspeed;
            mypipe.body.immovable = true;
            mycap.revive();
            mycap.x = 700;
            mycap.y = this.groundheight - mypipe.height;
            mycap.body.velocity.x = -this.scrollspeed;
            mycap.body.immovable = true;
            var mypipe2 = this.pipesup.getFirstDead();
            var mycap2 = this.pipecaps.getFirstDead();
            if (mypipe2) {
                mypipe2.revive();
                mypipe2.x = 700;
                mypipe2.y = 0;
                mypipe2.height = 800 - mypipe.height - this.gap;
                mypipe2.body.velocity.x = -this.scrollspeed;
                mypipe2.body.immovable = true;
                mycap2.revive();
                mycap2.x = 700;
                mycap2.y = mypipe2.height;
                mycap2.body.velocity.x = -this.scrollspeed;
                mycap2.body.immovable = true;
            }
        }
    }
    this.sepcount++;
};

MiniGames.FlappyBird.prototype.timeup = function(){
    this.win(0);
};