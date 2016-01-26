// ---------------------------------- GLOBAL SETTINGS ----------------------------------

// Defines global helper constants for borders of game canvas

var UPPER_BORDER = 60;
var LOWER_BORDER = 400;
var RIGHT_BORDER = 400;
var LEFT_BORDER = 0;

// Global variables for setting difficulty level - you can adjust ENEMIES by:

// - numberOfenemies in each line, e.g. number 2 will create 6 enemies (2 enemies in each of 3 lines)
var numberOfenemies = 2;

// - speed of the enemies,
var minSpeed = 50;
var maxSpeed = 300;

// - its starting x coordinate
var enemyStart = -100;


// ---------------------------------- ENEMIES ----------------------------------

// Enemies our player must avoid
var Enemy = function(x, y, minSpeed, maxSpeed) {

    //Setting the Enemy initial location - it sets random x location out of screen
    this.x = enemyStart;
    this.y = y;

    //Setting the Enemy speed (you need to implement)
    this.speed = Math.floor((Math.random() * maxSpeed) + minSpeed);

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

Enemy.prototype.update = function(dt) {

    // Updates the Enemy location
    // Parameter: dt - a time delta between ticks
    this.x = this.x + this.speed * dt;

    //Going out of screen (right side) - reset the position of enemy to -100 px and sets new speed of enemy between 50 and 300
    if (this.x>=RIGHT_BORDER+200) {
        this.x = enemyStart;
        this.speed =  Math.floor((Math.random() * maxSpeed) + minSpeed);
    }

    // to have the score up to date in the HTML, this function assigns the score id (score in html) to the current score of the player
    document.getElementById('score').innerHTML = player.score;

    // no need to handle collisions with player - enemies are running, overlaping and have different speed
    // (the speed changes even when the enemy crosses the right border and is reseted)

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// ---------------------------------- PLAYER ----------------------------------

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
    // Setting the Player initial location
    this.reset();

    // Setting initial score
    this.score = 0;

    // Loading image of player
    this.sprite = 'images/char-boy.png';
};

// An update of player position is handled by handleInput function
// This function only resets the player in case of enemy-player collision
Player.prototype.update = function() {

    // Collisions - when collide function returns true then player is reseted
    if (this.collide() === true) {
        this.reset();
    }
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

// The handleInput method, which receives user input. In particular:
// Left key should move the player to the left, right key to the right, up should move the player up and down should move the player down
// The player cannot move off screen
// If the player reaches the water, the player is back to the initial location and score is increased by 1 point
Player.prototype.handleInput = function(pressed_key) {
        if (pressed_key === 'up' && this.y>UPPER_BORDER) {
            this.y -= 85;
    }   else if (pressed_key === 'up' && this.y<=UPPER_BORDER) {
            this.score++;
            this.reset();
        }

        if (pressed_key === 'down' && this.y<LOWER_BORDER) {
            this.y += 85;
    }

       if (pressed_key === 'left' && this.x>LEFT_BORDER) {
            this.x -= 100;
    }

       if (pressed_key === 'right' && this.x<RIGHT_BORDER) {
            this.x += 100;
    }
};

// function defining when collision of player with enemy occurs
Player.prototype.collide = function() {
    //for each enemy instacnce in allEnemies array a condition is made and when is true it returns TRUE
    for (var i=0; i < allEnemies.length; i++) {
        // this condition checks whether the player object's coordinates are within enemies x coordinate (+- 50px) and y cooridinate (+- 30px)
        // if the player hits the enemy then true is returned and the score is decreased by 1 point (if it is greater than 0)
        if (this.x < allEnemies[i].x + 50 && this.x > allEnemies[i].x - 50 && this.y < allEnemies[i].y + 30 && this.y > allEnemies[i].y - 30) {
             if (this.score>0) {
                this.score--;
            }
            return true;
        }
    }
};


// ---------------------------------- INSTANCES ----------------------------------

// Creates enemies objects and place all enemy objects in an array called allEnemies
var allEnemies = [];

// function NewEnemyLine creates few (numberOfenemies) new instances of Enemy class with coordinates and randomly generated speed for all 3 lines
var newEnemyLine = function(numberOfenemies) {
    for (var i=0; i<numberOfenemies; i++) {
        var new_enemy_1 = new Enemy(enemyStart, 60, minSpeed, maxSpeed);
        var new_enemy_2 = new Enemy(enemyStart, 145, minSpeed, maxSpeed);
        var new_enemy_3 = new Enemy(enemyStart, 230, minSpeed, maxSpeed);
        allEnemies.push(new_enemy_1, new_enemy_2, new_enemy_3);
    }
};

// The creadted enemies are placed in allEnemies array
newEnemyLine(numberOfenemies);

// Creates player instance of Player class
var player = new Player();


// ---------------------------------- KEY LISTENER ----------------------------------
// This listens for key presses and sends the keys to your
// Player.handleInput() method
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});