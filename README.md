#Arcade Game - Frogger

This is a recreation of classic arcade game **Frogger**. It is simplified version with easy rules. At this stage,
this game has no end, you can collect points endlessly. This repository gives you basics to further development of game.

##Contents

1. How to run
2. How to play
3. Issues
4. How the code is organized
5. Links

##How to run

To run this game [download](https://github.com/Mancinek/frontend-nanodegree-arcade-game/archive/master.zip) the repository and open the `index.html` file in your browser - the game will start immediately.

##How to play

You are the character of _the boy_ at the bottom of the board. Your goal is to reach the water without collision with _enemy bugs_.

### How to move the player

Use _arrows_ of your keyboard to move the character in desired direction.

### Rules

You have to collect as much points as possible. When you reach _the water_ at the top of the board you will get 1 point. In case of collision with _enemy bug_ you will lose 1 point and will be reseted to the starting position. To get more points you can collect _gems_ - each _gem_ gives you 1 additional point.

##Issues

There is one thing with _gems_ - they are generated in random position on canvas and it is possible that after collecting _gem_ it can appear again on the same position where it has been collected before - if in this situation your _player_ will not be moved, it will collect this _gem_ also, so it will look like you get 2 points for 1 _gem_. Actually it's not a bug, it's a feature!

##How the code is organized

The game runs on basis of three _js_ files:

* `engine.js` draws the canvas on the screen and provides the game loop functionality by calling update and render methods on player and enemies instances (defined in app.js)
* `resources.js` is an image loading utility and caching layer
* `app.js` implements the _Player_, the _Enemy_ and _Gem_ classes

The repository contains also other helper files like:

* images like characters, water, grass, stones,
* `index.html` that loads the scripts on the page,
* `style.css` that defines the style of html (centers the canvas and score).

##Links

The basic engine of the game is forked from Udacity repository [here](https://github.com/udacity/frontend-nanodegree-arcade-game).
