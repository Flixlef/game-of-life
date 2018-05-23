import { Settings } from "./settings";
import { Cell } from "./cell";
import { State } from "./state";

export class GameOfLife {
    // handle of the intervall function, is needed to stop it
    private handle : number;
    private generation : number;
    private highscore : number;
    private state : State;
    private previousStates : State[];

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
        this.state.switchAlive(x, y);
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

    public showState(state: number): void {
        if(this.handle !== undefined) {
            clearInterval(this.handle);
        }

        this.state = this.previousStates[state - 1];
        this.draw();
    }

    /**
     * Starts a new game
     */
    private startNewGame(): void {
        this.state = new State();
        this.previousStates = [];
        this.previousStates.push(this.state);
        this.generation = 0;
        this.draw();
    }

    /**
     * Evaluates the next generation
     */
    private nextRound(): void {
        // stop game if there is no evolution happening
        if(State.stateIsDead(this.state)) {
            clearInterval(this.handle);
            return;
        }

        var nextState : State = this.state.nextState(this.state);
        this.previousStates.push(nextState);

        // update scores and render new cells
        this.generation++;
        this.highscore = this.generation > this.highscore ? this.generation : this.highscore;
        this.state = nextState;
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
        return this.state.toHtml();
    }
}



