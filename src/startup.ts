import { GameOfLife } from "./game";
import { Settings } from "./settings";
import "./styles.css";

var clickable : boolean = true;

// initialize & start the game
$("document").ready(function(): void {
    $("#game-of-life").width(Settings.GAME_SIZE * 20);

    var Game : GameOfLife = new GameOfLife();
    $("#game-of-life").on("mouseup", ".cell", function(e: any): void {
        if(!clickable) {
            return;
        }
        var x : number = $(this).data("x");
        var y : number = $(this).data("y");
        Game.switchAlive(x, y);
    });

    $("#go").click(function():void {
        $("#reset").show();
        $("#go").hide();
        Game.go();
        clickable = false;
    });

    $("#reset").click(function():void {
        $("#go").show();
        $("#reset").hide();
        Game.reset();
        clickable = true;
    });

    $("#show-state").click(function():void {
        var stateNumber : number = <number>$("#state-number").val();
        Game.showState(stateNumber);
    });
});

