import { Settings } from "./settings";
import { Cell } from "./cell";

export class GameOfLife {
    private cells : Cell[][];
    // handle of the intervall function, is needed to stop it
    private handle : number;
    private generation : number;
    private highscore : number;

    constructor() {
        this.highscore = 0;
        this.startNewGame();
    }

    /**
     * Toggles the state (alive or dead) for a cell
     * @param x X coordinate of the cell
     * @param y Y coordinate of the cell
     */
    public switchAlive(x: number, y: number): void {
        this.cells[x][y].switchAlive();
        this.draw();
    }

    /**
     * Auto plays the evolution
     */
    public go(): void {
        this.handle = setInterval(this.nextRound.bind(this), Settings.AUTO_PLAY_SPEED);
    }

    /**
     * Resets the game
     */
    public reset(): any {
        if(this.handle !== undefined) {
            clearInterval(this.handle);
        }

        this.startNewGame();
    }

    /**
     * Starts a new game
     */
    private startNewGame(): void {
        this.cells = [];
        this.generation = 0;

        for(var i : number = 1; i <= Settings.GAME_SIZE; i++) {
            this.cells[i] = [];
            for(var j : number = 1; j <= Settings.GAME_SIZE; j++) {
                this.cells[i][j] = new Cell(i, j);
            }
        }

        this.draw();
    }


    /**
     * Evaluates the next generation
     */
    private nextRound(): void {
        var updatedCells : Cell[][];
        updatedCells = [];

        for(var i : number = 1; i <= Settings.GAME_SIZE; i++) {
            updatedCells[i] = [];
            for(var j : number = 1; j <= Settings.GAME_SIZE; j++) {
                var aliveNeighbours : number = this.countAliveNeighbours(this.cells[i][j]);
                updatedCells[i][j] = this.cells[i][j].applyRules(aliveNeighbours);
            }
        }

        // stop game if there is no evolution happening
        if(this.hasGameEnded(updatedCells)) {
            clearInterval(this.handle);
            return;
        }

        this.generation++;
        this.highscore = this.generation > this.highscore ? this.generation : this.highscore;
        this.cells = updatedCells;
        this.draw();
    }

    /**
     * Draws the game (cells + generation counter) onto the DOM
     */
    private draw(): void {
        var html : string = this.toHtml();
        document.getElementById("game-of-life").innerHTML = html;
        document.getElementById("generation").innerHTML = this.generation.toString();
        document.getElementById("highscore").innerHTML = this.highscore.toString();
    }

    /**
     * Returns the state of the game as an HTML string
     */
    private toHtml(): string {
        var html : string = "";
        for(var i : number = 1; i <= Settings.GAME_SIZE; i++) {
            html += "<div class='line'>";
            for(var j : number = 1; j <= Settings.GAME_SIZE; j++) {
                html += this.cells[j][i].toHtml();
            }
            html += "</div>";
        }

        return html;
    }

    /**
     * Counts neighbours of a cell which are alive
     * @param cell  Cell for which the alive neighbours should be counted
     * @returns     Count how many neighbours are alive
     */
    private countAliveNeighbours(cell: Cell): number {
        var neighbours: Cell[] = this.findNeighbours(cell);
        return this.countAliveCells(neighbours);
    }

    /**
     * Finds all neighbour cells of a given cell, if you have a more sophisticated solution
     * please write me on Github (https://github.com/Flixlef) :)
     * @param cell  Cell for which the neighbours should be found
     * @returns     Array of all neighbour cells
     */
    private findNeighbours(cell: Cell): Cell[] {
        var neighbourCells : Cell[] = [];
        var posX : number = cell.getX();
        var posY : number = cell.getY();
        var newX : number;
        var newY : number;
        // top left
        if(posX === 1) {
            newX = Settings.GAME_SIZE;
        } else {
            newX = posX - 1;
        }
        if(posY === 1) {
            newY = Settings.GAME_SIZE;
        } else {
            newY = posY - 1;
        }
        neighbourCells.push(this.cells[newX][newY]);
        // top middle
        newX = posX;
        if(posY === 1) {
            newY = Settings.GAME_SIZE;
        } else {
            newY = posY - 1;
        }
        neighbourCells.push(this.cells[newX][newY]);
        // top right
        if(posX === Settings.GAME_SIZE) {
            newX = 1;
        } else {
            newX = posX + 1;
        }
        if(posY === 1) {
            newY = Settings.GAME_SIZE;
        } else {
            newY = posY - 1;
        }
        neighbourCells.push(this.cells[newX][newY]);
        // middle left
        if(posX === 1) {
            newX = Settings.GAME_SIZE;
        } else {
            newX = posX - 1;
        }
        newY = posY;
        neighbourCells.push(this.cells[newX][newY]);
        // middle right
        if(posX === Settings.GAME_SIZE) {
            newX = 1;
        } else {
            newX = posX + 1;
        }
        newY = posY;
        neighbourCells.push(this.cells[newX][newY]);
        // bottom left
        if(posX === 1) {
            newX = Settings.GAME_SIZE;
        } else {
            newX = posX - 1;
        }
        if(posY === Settings.GAME_SIZE) {
            newY = 1;
        } else {
            newY = posY + 1;
        }
        neighbourCells.push(this.cells[newX][newY]);
        // bottom middle
        newX = posX;
        if(posY === Settings.GAME_SIZE) {
            newY = 1;
        } else {
            newY = posY + 1;
        }
        neighbourCells.push(this.cells[newX][newY]);
        // bottom right
        if(posX === Settings.GAME_SIZE) {
            newX = 1;
        } else {
            newX = posX + 1;
        }
        if(posY === Settings.GAME_SIZE) {
            newY = 1;
        } else {
            newY = posY + 1;
        }
        neighbourCells.push(this.cells[newX][newY]);
        return neighbourCells;
    }

    /**
     * Counts alive neighbours of a given cell
     * @param cells Cell for which alive neighours should be counted
     * @returns     Number how many neighbours are alive
     */
    private countAliveCells(cells : Cell[]): number {
        var aliveCells : number = 0;

        for(var i : number = 0; i < cells.length; i++) {
            if(cells[i].isAlive()) {
                aliveCells++;
            }
        }

        return aliveCells;
    }

    /**
     * Checks if there are any cells on the board alive
     * @returns     Boolean if the game is alive (true) or dead (false)
     */
    private isGameAlive(): boolean {
        for(var i : number = 1; i <= Settings.GAME_SIZE; i++) {
            for(var j : number = 1; j <= Settings.GAME_SIZE; j++) {
                if(this.cells[i][j].isAlive()) {
                    return true;
                }
            }
        }

        return false;
    }

    /**
     * Checks if the field is in an evoluting state
     * @param newCellField  new state to compare to the current state
     * @returns             has the game ended
     */
    private hasGameEnded(newCellField: Cell[][]): boolean {
        // check if every cell is dead
        if(!this.isGameAlive()) {
            return true;
        }

        // check if there is no progress
        for(var i : number = 1; i <= Settings.GAME_SIZE; i++) {
            for(var j : number = 1; j <= Settings.GAME_SIZE; j++) {
                if(this.cells[i][j].isAlive() !== newCellField[i][j].isAlive()) {
                    return false;
                }
            }
        }

        // no progress happens, game has ended
        return true;
    }
}



