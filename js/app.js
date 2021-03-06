// ---------------------------------- GANE SETTINGS ----------------------------------

// This is responsible for defining borders and game difficulty
// This class could be useful in future for creating several diffulty levels (instances of Settings)
var Settings = function() {

// Defines  helper variables for borders of game canvas
this.UPPER_BORDER = 60;
this.LOWER_BORDER = 400;
this.RIGHT_BORDER = 400;
this.LEFT_BORDER = 0;

// Setting of difficulty level - you can adjust ENEMIES by:

// - setting numberOfenemies in each line, e.g. number 2 will create 6 enemies (2 enemies in each of 3 lines)
this.numberOfenemies = 2;

// - adjusting min and max speed of the enemies,
this.minSpeed = 50;
this.maxSpeed = 300;

// - setting starting x coordinate for enemy
this.enemyStart = -100;

};

// ---------------------------------- ENEMIES ----------------------------------

// Enemies our player must avoid
var Enemy = function(y) {

    //Setting the Enemy initial location
    this.x = setting.enemyStart;
    this.y = y;

    //Setting the Enemy speed (random speed between min and max speed)
    this.speed = Math.floor((Math.random() * setting.maxSpeed) + setting.minSpeed);

    // The image/sprite for our enemies
    this.sprite = 'images/enemy-bug.png';
};

Enemy.prototype.update = function(dt) {

    // Updates the Enemy location
    // Parameter: dt - a time delta between ticks
    this.x = this.x + this.speed * dt;

    //Going out of screen (right side) - reset the position of enemy to -100 px and sets new speed of enemy between 50 and 300
    if (this.x>=setting.RIGHT_BORDER+200) {
        this.x = setting.enemyStart;
        this.speed =  Math.floor((Math.random() * setting.maxSpeed) + setting.minSpeed);
    }

    // to have the score up to date in the HTML, this function assigns the score id (score in html) to the current score of the player
    document.getElementById('score').innerHTML = player.score;

    // No need to handle collisions with player - enemies are running, overlaping and have different speed
    // (the speed changes even when the enemy crosses the right border and is reseted)
};

// Draw the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// ---------------------------------- PLAYER ----------------------------------

// The Player class
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

    // Collisions with enemies - when collide function returns TRUE (the player hits the enemy) then player is reseted and score is decreased by 1 (if it is greater than 0)
    if (this.collide() === true) {
        if (this.score>0) {
                this.score--;
            }
        this.reset();
    }
};

// Draw the player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Restore initial values of player coordinates
Player.prototype.reset = function() {
    this.x = 200;
    this.y = 400;
};

// The handleInput method, which receives user input. In particular:
// Left key moves the player to the left, right key to the right, up moves the player up and down moves the player down
// The player cannot move off screen
// If the player reaches the water, the player is back to the initial location and score is increased by 1 point
Player.prototype.handleInput = function(pressed_key) {
        if (pressed_key === 'up' && this.y>setting.UPPER_BORDER) {
            this.y -= 85;
    }   else if (pressed_key === 'up' && this.y<=setting.UPPER_BORDER) {
            this.score++;
            this.reset();
        }

        if (pressed_key === 'down' && this.y<setting.LOWER_BORDER) {
            this.y += 85;
    }

       if (pressed_key === 'left' && this.x>setting.LEFT_BORDER) {
            this.x -= 100;
    }

       if (pressed_key === 'right' && this.x<setting.RIGHT_BORDER) {
            this.x += 100;
    }
};

// This function defines when collision of player with enemy occurs
Player.prototype.collide = function() {

    // For each enemy instacnce in allEnemies array the IF condition is made and when is true it returns TRUE
    for (var i=0; i < allEnemies.length; i++) {
        // This condition checks whether the player object's coordinates are within
        // enemies x coordinate and y cooridinate (corrected by width and height of bug and enemy within its square picture)
        if (this.x - 30 < allEnemies[i].x + 45 && this.x + 30 > allEnemies[i].x - 45 && this.y - 25 < allEnemies[i].y + 33 && this.y + 50 > allEnemies[i].y - 33) {
            return true;
        }
    }
};

// ---------------------------------- GEMS ----------------------------------

// Definition of gem (position, score and image)
var Gem = function() {

    // Set the x and y coordinates of gem
    this.reset();

    // Set the starting score for gems
    this.gemScore = 0;

    // Load the image of gem
    this.sprite = 'images/Gem Orange.png';
};

// Draw gem on the screen
Gem.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Reset gem position in case of collisioin with player (if collide() returns true) and adds 1 point to the player score
Gem.prototype.update = function() {
    if (this.collide() === true) {
        player.score++;
        this.reset();
    }
};

// Set the initial random position
Gem.prototype.reset = function() {
    this.x = 0 + (Math.floor((Math.random() * 5)) * 101);
    this.y = 60 + (Math.floor((Math.random() * 3)) * 83);
};

// Definition of collision with player
Gem.prototype.collide = function() {

    // Similiar to the mechanism of player-enemy collison
    if (player.x - 30 < this.x + 50 && player.x + 30 > this.x - 50 && player.y - 25 < this.y + 33 && player.y + 50 > this.y - 33) {
        return true;
    }
};

// ---------------------------------- INSTANCES ----------------------------------

// Creates instance of Settings
var setting = new Settings();

// Creates enemies array
var allEnemies = [];

// Function NewEnemyLine creates few (numberOfenemies) instances of Enemy class with coordinates and randomly generated speed for all 3 lines of stoned floor on canvas
// it places also all enemy objects in an array called allEnemies
var newEnemyLine = function(num) {
    for (var i=0; i<num; i++) {
        var new_enemy_1 = new Enemy(60);
        var new_enemy_2 = new Enemy(145);
        var new_enemy_3 = new Enemy(230);
        allEnemies.push(new_enemy_1, new_enemy_2, new_enemy_3);
    }
};

// Call function newEnemyLine that creates and places enemies in allEnemies array
newEnemyLine(setting.numberOfenemies);

// Creates Player instance
var player = new Player();

// Creates Gem instance
var newGem = new Gem();


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