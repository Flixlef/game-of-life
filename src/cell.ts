export class Cell {
    private alive : boolean;
    private x : number;
    private y: number;

    constructor(x : number, y : number) {
        this.x = x;
        this.y = y;
        this.alive = false;
    }

    /**
     * Returns the state of the cell as an HTML string
     */
    public toHtml(): string {
        var html : string;
        var cssClass : string = "";
        if(this.alive) {
            cssClass = "alive";
        }

        html = "<div class='cell " + cssClass + "' data-x='" + this.x + "' data-y='" + this.y + "'></div>";
        return html;
    }

    /**
     * Applies the rules of the game (@see https://www.it-talents.de/foerderung/code-competition/code-competition-05-2018 )
     * @param aliveNeighbours   number of alive neighbours
     * @returns                 updated cell
     */
    public applyRules(aliveNeighbours: number): Cell {
        var newCell : Cell = new Cell(this.x, this.y);
        if(this.alive) {
            // rule 2
            if(aliveNeighbours === 2 || aliveNeighbours === 3) {
                newCell.alive = true;
            // rule 1 & 3
            } else {
                newCell.alive = false;
            }
        } else {
            // rule 4
            if(aliveNeighbours === 3) {
                newCell.alive = true;
            }
        }

        return newCell;
    }

    /**
     * Getter for X
     */
    public getX(): number {
        return this.x;
    }

    /**
     * Getter for Y
     */
    public getY(): number {
        return this.y;
    }

    /**
     * Getter for Alive
     */
    public isAlive(): boolean {
        return this.alive;
    }

    /**
     * Switches the Alive property
     */
    public switchAlive(): void {
        if(this.alive) {
            this.alive = false;
        } else {
            this.alive = true;
        }
    }
}