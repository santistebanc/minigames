MiniGames.Boot = function (game) {
};
MiniGames.Boot.prototype = {
    preload: function () {
        // preload the loading indicator first before anything else
        this.load.image('preloaderBar', 'assets/loading-bar.png');
    },
    create: function () {
        
        MiniGames.transitions.plugin = this.game.plugins.add(Phaser.Plugin.StateTransition);
        
        // set scale options
        //  Unless you specifically need to support multitouch I would recommend setting this to 1
        this.input.maxPointers = 1;

        //  Phaser will automatically pause if the browser tab the game is in loses focus. You can disable that here:
        this.stage.disableVisibilityChange = true;

        this.game.time.advancedTiming = true;


        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;

        if (this.game.device.desktop) {
            //  If you have any desktop specific settings, they can go in here
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        } else {
            //  Same goes for mobile settings.
            this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
        }
        this.scale.setScreenSize(true);
        // start the Preloader state
        this.state.start('Preloader');
    }
};