var Player = function(startX, startY) {
  var state = {'moveLeft' : 'left', 'moveRight': 'left' , 'moveTop': 'top', 'moveDown': 'down' , 'stop': 'stop' };
  var actual_state;
    var x = startX,
        y = startY,
        id;
    
    var getX = function() {
        return x;
    };

    var getY = function() {
        return y;
    };
    var setState = function(state){
      this.actual_state = state;
    };
  var getState = function(){
    return actual_state
  };
    var setX = function(newX) {
        x = newX;
    };

    var setY = function(newY) {
        y = newY;
    };

    return {
        getX: getX,
        getY: getY,
        setX: setX,
        setY: setY,
      getState: getState,
      setState: setState,
        id: id
    }
};

exports.Player = Player;