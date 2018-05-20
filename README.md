# Game of Life ()

A simple Game of Life implementation using TypeScript and HTML 5. This project was created for the [IT Talents Code Challenge](https://www.it-talents.de/foerderung/code-competition/code-competition-05-2018).

## TL;DR LET ME PLAY!

OK I HEARD YOU. Download/Clone the repository, go to /dist, open index.html in a modern browser, have fun :).

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

The only requirement to develop the game is [Node.js](https://nodejs.org/en/). For testing and executing you only need a modern browser with JavaScript enabled.

### Installing

In the command line go to the src folder and execute the following commands, that's it :)

```
npm install
npm run build
```

### Developing

These short guidelines will help you, where to start depending on what you look for.

#### src/cell.ts

Contains the model for one Cell object.

#### src/game.ts

Contains the logic for most of the game. Stores all Cell objects and provides a public interface to interact with the game.

#### src/settings.ts

Provides global settings for the game. Currently the size of the game and the speed of the autoplay function.

#### src/styles.css 

Contains basic styles for the game to render correctly onto the DOM.

## Deployment

If you want to use the script on a website simple paste the following HTML snippet into your code, with game-of-life.js being the JavaScript file from the dist folder.

```
<!-- insert where you want the game to appear --!>
<div>Generation: <span id="generation"></span></div>
<div>Highscore: <span id="highscore"></span></div>
<div id="game-of-life"></div>
<div id="button">
    <div id="go">Go!</div>
    <div id="reset">Reset!</div>
</div>
<!-- insert below before you close your body tag --!>
<script src="game-of-life.js"></script>
```

## Built With

* [Node.js](https://nodejs.org/en/) - The web framework used
* [TypeScript](https://www.typescriptlang.org/) - Object oriented JavaScript <3

## Authors

* **Felix Betzl** - [Flixlef](https://github.com/Flixlef)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details


