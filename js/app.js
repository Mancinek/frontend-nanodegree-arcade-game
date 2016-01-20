// define global helper variables for borders of game canvas

var upperBorder = 60;
var lowerBorder = 400;
var rightBorder = 400;
var leftBorder = 0;

/*
var randomNumber = function(a, b) {
    Math.floor(((Math.random() * b) + a));
};
*/

// ---------------------------------- ENEMIES ----------------------------------

// Enemies our player must avoid
var Enemy = function(x, y, minSpeed, maxSpeed) {

    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    //Setting the Enemy initial location - it sets random x location out of screen
    this.x = x;
    this.y = y;

    //Setting the Enemy speed (you need to implement)
    this.speed = Math.floor((Math.random() * maxSpeed) + minSpeed);

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

    //Going out of screen (right side) - reset the position of enemy


    if (this.x>=rightBorder+200) {
        this.x = -300;
       //this.x = allEnemies[0].this.x;
       //this.speed = Math.floor((Math.random() * this.maxSpeed) + this.minSpeed);
    };


    //Handles collision with the Player (you need to implement)
    /*
    if (this.x == Player.call(player) {
        Player();
    };
    */
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Reset all enemies to the initial position
Enemy.prototype.reset = function() {
    for (var i=0; i<allEnemies.lenght; i++) {
        allEnemies[i].x = -300;
    }

};


// ---------------------------------- PLAYER ----------------------------------

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {

    //Setting the Player initial location

    this.x = 200;
    this.y = 400;

    //Loading image of player
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    //SIMILIAR TO ENEMY

    this.x * dt;
    this.y * dt;

    //Collisions ????????

};

// Draw the player on the screen, required method for game (THE SAME AS ENEMY)
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Restore initial values of player coordinates
Player.prototype.reset = function() {
    this.x = 200;
    this.y = 400;
};

//The handleInput method, which should receive user input, allowedKeys (the key which was pressed) and move the player according to that input. In particular:
//Left key should move the player to the left, right key to the right, up should move the player up and down should move the player down.
//Recall that the player cannot move off screen (so you will need to check for that and handle appropriately).
//If the player reaches the water the game should be reset by moving the player back to the initial location (you can write a separate reset Player method to handle that).
Player.prototype.handleInput = function(pressed_key) {
        if (pressed_key == 'up' && this.y>upperBorder) {
            this.y = this.y - 85;
    }   else if (pressed_key == 'up' && this.y<=upperBorder) {
            this.reset();
        };

        if (pressed_key === 'down' && this.y<lowerBorder) {
            this.y = this.y + 85;
    };

       if (pressed_key === 'left' && this.x>leftBorder) {
            this.x = this.x - 100;
    };

       if (pressed_key === 'right' && this.x<rightBorder) {
            this.x = this.x + 100;
    };

};


// ---------------------------------- OTHER ----------------------------------

// Now instantiate your objects.
// Create enemies objects and place all enemy objects in an array called allEnemies
// Create and place the player object in a variable called player

var allEnemies = [];


// function NewEnemyLine creates few (number_of_enemies) new objects of Enemy class with coordinates and randomly generated speed for all 3 lines. Then places it in allEnemies array
var newEnemyLine = function(number_of_enemies) {
    for (var i=0; i<number_of_enemies; i++) {
        var new_enemy_1 = new Enemy(-300, 60, 50, 300);
        var new_enemy_2 = new Enemy(-300, 145, 50, 300);
        var new_enemy_3 = new Enemy(-300, 230, 50, 300);
        allEnemies.push(new_enemy_1, new_enemy_2, new_enemy_3);
    }
};

//define the number_of_enemies in each line, e.g. number 2 will create 6 enemies (2 enemies in each of 3 lines)
newEnemyLine(2);

//creates player object of Player class
var player = new Player();


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
