import { Cell } from "./cell";
import { Settings } from "./settings";

export class State {
    private cells : Cell[][];
    private hashCode : string;

    constructor() {
        this.cells = [];

        for(var i : number = 1; i <= Settings.GAME_SIZE; i++) {
            this.cells[i] = [];
            for(var j : number = 1; j <= Settings.GAME_SIZE; j++) {
                this.cells[i][j] = new Cell(i, j);
            }
        }

        this.updateHashCode();
    }

    /**
     * Gets hashCode for the state
     */
    public getHashCode(): string {
        return this.hashCode;
    }

    /**
     * Switches alive state for a specific cell
     * @param x x coordinate of the cell
     * @param y y coordinate of the cell
     */
    public switchAlive(x: number, y: number): void {
        this.cells[x][y].switchAlive();
    }

    /**
     * Calculates the next state for a given state
     * @param state the given state
     */
    public nextState(state: State): State {
        var nextState : State = new State();

        for(var i : number = 1; i <= Settings.GAME_SIZE; i++) {
            for(var j : number = 1; j <= Settings.GAME_SIZE; j++) {
                var aliveNeighbours : number = state.countAliveNeighbours(this.cells[i][j]);
                nextState.cells[i][j] = state.cells[i][j].applyRules(aliveNeighbours);
            }
        }

        nextState.updateHashCode();
        return nextState;
    }

    /**
     * Checks if there are any cells on the board alive
     * @returns Boolean if the game is alive (true) or dead (false)
     */
    public static stateIsDead(state: State): boolean {
        for(var i : number = 1; i <= Settings.GAME_SIZE; i++) {
            for(var j : number = 1; j <= Settings.GAME_SIZE; j++) {
                // any cell alive is enough
                if(state.cells[i][j].isAlive()) {
                    return false;
                }
            }
        }

        // no cell is alive
        return true;
    }

    /**
     * Returns the state as a printable HTML string
     */
    public toHtml(): string {
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
     * Compares equality of the current state with a given state
     * @param state the given state
     */
    public compareHashCode(state: State): boolean {
        return this.getHashCode() === state.getHashCode();
    }

    /**
     * Recalculates the hashCode
     */
    private updateHashCode(): void {
        var hashArray : string[] = [];

        for(var i : number = 1; i <= Settings.GAME_SIZE; i++) {
            for(var j : number = 1; j <= Settings.GAME_SIZE; j++) {
                hashArray.push(this.cells[i][j].isAlive().toString());
            }
        }

        var hash : string = hashArray.join("");
        this.hashCode = hash;
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
     * please write me on Github (https://github.com/Flixlef/game-of-life) :)
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
}
