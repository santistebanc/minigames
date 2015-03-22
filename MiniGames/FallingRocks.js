MiniGames.FallingRocks = function (game) {
    MiniGames.MiniGame.call(this, game, 'dodge', 'volcano', 10);
    this.groundheight = 660;
    this.frequency = 30;
    this.count = 0;
};

MiniGames.FallingRocks.prototype = Object.create(MiniGames.MiniGame.prototype);
MiniGames.FallingRocks.constructor = MiniGames.FallingRocks;


MiniGames.FallingRocks.prototype.drawscenery = function () {
    this.ground = this.game.add.sprite(0, this.groundheight, 'ground');
};


MiniGames.FallingRocks.prototype.drawobjects = function () {
    //objects

    //hero
    this.hero = this.game.add.sprite(320, this.groundheight, 'monito');
    this.hero.anchor.set(0.5, 1);
    this.hero.animations.add('run');
    this.game.physics.arcade.enable(this.hero, Phaser.Physics.ARCADE);
    this.hero.body.collideWorldBounds = true;

    //rocks
    this.rocks = this.game.add.group();
    this.rocks.enableBody = true;
    this.rocks.physicsBodyType = Phaser.Physics.ARCADE;
    for (var i = 0; i < 30; i++) {
        var rock = this.rocks.create(Math.random() * 640, 10, 'meteorite', 1, true);
        this.game.physics.arcade.enable(rock, Phaser.Physics.ARCADE);
        rock.anchor.set(0.5, 1);
        rock.outOfBoundsKill = true;
        rock.animations.add('burn', [0, 1, 2], 10, true);
        rock.animations.add('crash', [3, 4, 5, 6, 7], 30, true);
        rock.checkWorldBounds = true;
        rock.kill();
    }
};
MiniGames.FallingRocks.prototype.gameaction = function () {
    this.rockmotion();
    this.heromotion();
};

MiniGames.FallingRocks.prototype.rockmotion = function () {

    //rock generator
    if (this.count % Math.round(Math.random() * this.frequency) == 0) {
        this.count = 0;
        this.createRock();
    }
    this.count++;

    //rock fall and hit
    this.rocks.forEachAlive(function (rock) {
        //hit hero
        if (rock.health > 0 && this.hero.health > 0 && rock.y >= this.groundheight - 50 && Math.abs(rock.x - this.hero.x) <= 20) {
            rock.health = 0;
            this.hero.animations.stop('run');
            this.hero.health = 0;
            this.hero.body.allowGravity = true;
            var speed = Math.random() * 600 - 300;
            this.hero.anchor.y = 0.5;
            this.hero.body.velocity.y += -600;
            this.hero.body.velocity.x += speed;
            this.hero.body.gravity.y = 500;
            this.hero.body.angularVelocity = speed * 5;
            this.hero.body.collideWorldBounds = false;
            this.lose();
        }
        //hit ground
        if (rock.y >= this.groundheight) {
            rock.health = 0;
            rock.body.velocity.y = 0;
            rock.y = this.groundheight;
            rock.animations.play('crash', null, false, true);
        }
    }, this);
};


MiniGames.FallingRocks.prototype.heromotion = function () {
    if (this.hero.health) {
        this.hero.body.velocity.x = 0;
            var dif = Math.abs(this.game.input.activePointer.x - this.hero.x);
            var mov;
            if (dif < 10) {
                mov = dif * 2;
                this.hero.animations.stop('run');
            } else {
                mov = 350;
                this.hero.animations.play('run', 25, true);
            }
            if (this.game.input.activePointer.x > this.hero.x) {
                this.hero.body.velocity.x = mov;
            } else if (this.game.input.activePointer.x < this.hero.x) {
                this.hero.body.velocity.x = -mov;
            }
    }
};


MiniGames.FallingRocks.prototype.killRock = function () {

    var rock = this.rocks.getFirstAlive();
    if (rock) {
        rock.kill();
    }
};

MiniGames.FallingRocks.prototype.createRock = function () {

    var rock = this.rocks.getFirstDead();
    if (rock) {
        rock.revive();
        var std = 640;
        var rmore = ((Math.random() + Math.random() + Math.random() + Math.random() + Math.random() + Math.random()) - 3) / 3;
        var mean = this.hero.x;
        if (this.hero.health > 0) {
            rock.x = rmore * std + mean;
        } else {
            rock.x = Math.random() * 640 * 2 - 640;
        }
        rock.y = 10;
        rock.body.velocity.y = 300;
        rock.body.acceleration.y = 500;
        rock.animations.play('burn');
    }

};

MiniGames.FallingRocks.prototype.timeup = function(){
    this.win(0);
};