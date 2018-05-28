import { Settings } from "./settings";
import { Cell } from "./cell";
import { State } from "./state";
import { Message } from "./message";

export class GameOfLife {
    // handle of the intervall function, is needed to stop it
    private handle : number;
    private generation : number;
    private highscore : number;
    private state : State;
    private previousStates : State[];
    private nextMessage : string;

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

    /**
     * Shows a specific state
     * @param state chronological number of the specific state
     */
    public showState(state: number): void {
        if(this.handle !== undefined) {
            clearInterval(this.handle);
        }

        if(state > this.previousStates.length) {
            this.nextMessage = Message.GENERATION_NOT_FOUND;
        } else {
            this.state = this.previousStates[state - 1];
            this.nextMessage = Message.GENERATION_LOADED;
        }

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
        this.nextMessage = Message.NEW_GAME;
        this.draw();
    }

    /**
     * Evaluates the next generation
     */
    private nextRound(): void {
        var nextState : State = this.state.nextState(this.state);

        // stop game if there is no evolution happening
        if(this.gameHasEnded(nextState)) {
            clearInterval(this.handle);
            if(State.stateIsDead(nextState)) {
                this.state = nextState;
                return;
            }
            this.draw();
            return;
        }

        this.previousStates.push(nextState);

        // update scores and render new cells
        this.generation++;
        this.highscore = this.generation > this.highscore ? this.generation : this.highscore;
        this.state = nextState;
        this.draw();
    }

    /**
     * Checks if the game ends with a given state
     * @param state the given state
     */
    private gameHasEnded(state : State): boolean {
        // board is dead
        if(State.stateIsDead(state)) {
            this.nextMessage = Message.DEAD_GAME;
            return true;
        }

        // deadlock, no further evolution happening
        if(this.gameHasInfiniteLoop(state)) {
            this.nextMessage = Message.INFINITE_LOOP;
            return true;
        }

        return false;
    }

    /**
     * Checks if the game is in an infinite loop with a given state
     * @param state the given state
     */
    private gameHasInfiniteLoop(state : State): boolean {
        for(var i : number = 0; i < this.previousStates.length; i++) {
            if(state.compareHashCode(this.previousStates[i])) {
                return true;
            }
        }

        return false;
    }

    /**
     * Checks if a given state results in a deadlock
     * @param state the given state
     */
    private gameHasDeadlock(state : State): boolean {
        return this.previousStates[this.previousStates.length - 1].compareHashCode(state);
    }

    /**
     * Draws the game (cells + generation counter) onto the DOM
     */
    private draw(): void {
        var html : string = this.toHtml();
        document.getElementById("game-of-life").innerHTML = html;
        document.getElementById("generation").innerHTML = this.generation.toString();
        document.getElementById("highscore").innerHTML = this.highscore.toString();
        document.getElementById("message").innerHTML = this.nextMessage;
    }

    /**
     * Returns the state of the game as an HTML string
     */
    private toHtml(): string {
        return this.state.toHtml();
    }
}



