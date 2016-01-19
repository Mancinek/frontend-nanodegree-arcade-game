// ---------------------------------- ENEMIES ----------------------------------

// Enemies our player must avoid
var Enemy = function(x, y, speed) {

    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    //Setting the Enemy initial location (you need to implement)
    this.x = x;
    this.y = y;


    //Setting the Enemy speed (you need to implement)

    this.speed = speed;


    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    //Updates the Enemy location (you need to implement)

    this.x = this.x + this.speed * dt;

    //Handles collision with the Player (you need to implement)


};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};




// ---------------------------------- PLAYER ----------------------------------

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(x, y) {

    //Setting the Player initial location

    this.x = x;
    this.y = y;

    //this.speed = speed;
    //Loading image of player
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    //SIMILIAR TO ENEMY

    //this.x = this.x //* dt;
    //this.y = this.y //* dt;
};

// Draw the player on the screen, required method for game (THE SAME AS ENEMY)
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


//The handleInput method, which should receive user input, allowedKeys (the key which was pressed) and move the player according to that input. In particular:
//Left key should move the player to the left, right key to the right, up should move the player up and down should move the player down.
//Recall that the player cannot move off screen (so you will need to check for that and handle appropriately).
//If the player reaches the water the game should be reset by moving the player back to the initial location (you can write a separate reset Player method to handle that).
Player.prototype.handleInput = function(pressed_key) {
        if (pressed_key == 'up' && this.y>60) {
            this.y = this.y - 85;
    } else if (pressed_key == 'up' && this.y<=60) {
            this.y = this.y + 340;
        };

        if (pressed_key === 'down' && this.y<400) {
            this.y = this.y + 85;
    };

       if (pressed_key === 'left' && this.x>0) {
            this.x = this.x - 100;
    };

       if (pressed_key === 'right' && this.x<400) {
            this.x = this.x + 100;
    };

};


// ---------------------------------- OTHER ----------------------------------

// Now instantiate your objects.
// Create enemies objects and place all enemy objects in an array called allEnemies
// Create and place the player object in a variable called player

// skok co 85 dla osi Y

var new_enemy_1 = new Enemy(0, 60, 100);

var new_enemy_2 = new Enemy(0, 145, 100);

var new_enemy_3 = new Enemy(0, 230, 100);


var allEnemies = [new_enemy_1, new_enemy_2, new_enemy_3];

var player = new Player(200 ,400);




// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
