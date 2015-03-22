MiniGames.MainMenu = function (game) {
    this.game = game;
};
MiniGames.MainMenu.prototype = {
    create: function () {
         this.add.image(0, 0, 'greyback');
        // display images
        this.add.sprite((MiniGames.GAME_WIDTH - 551) / 2, 200, 'title');
        // add the button that will start the game
        this.add.button((MiniGames.GAME_WIDTH - 401) / 2, (MiniGames.GAME_HEIGHT - 143) / 1.2, 'button-start', this.startGame, this, 1, 0, 2);
    },
    startGame: function () {
        // start the Game state
        this.state.start('InterScreen');
    }
};