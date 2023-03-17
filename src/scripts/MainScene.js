import * as PIXI from "pixi.js";
import { Globals } from "./Globals";
import { PuzzleGrid } from "./PuzzleGrid";

export class MainScene {
  constructor() {
    this.container = new PIXI.Container();
    this.createBackground();
    this.createPuzzleGrid();
    this.playMusic();
  }

  createBackground() {
    this.bg = new PIXI.Sprite(Globals.resources.bg.texture);
    this.container.addChild(this.bg);
  }

  createPuzzleGrid() {
    const grid = new PuzzleGrid();
    this.container.addChild(grid.container);
  }

  playMusic() {
    Globals.resources.music.sound.play({ loop: true, volume: 0.1 });
  }
}
