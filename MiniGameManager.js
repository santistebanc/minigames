var MiniGames = {};
MiniGames.transitions = {};
MiniGames.transitions.to = function(state, animation){
    var properties;
    if(!animation){
        animation = 0;
    }
     if(animation == 0){
        properties = {
                duration: 500,
                properties: {
                    alpha: 0,
                    scale: {x: 2, y: 2}
                }
            };
    }
    MiniGames.transitions.plugin.settings(properties);
    MiniGames.transitions.plugin.to(state);
    
    
};