import * as PIXI from "pixi.js";
import { PuzzleGridConfig } from "./PuzzleGridConfig";
import { PuzzlePiece } from "./PuzzlePiece";

export class PuzzleGrid {
  constructor() {
    this.container = new PIXI.Container();
    this.container.x = window.innerWidth / 2;
    this.container.y = window.innerHeight / 2;
    this.container.sortableChildren = true;
    this.createPuzzlePieces();
  }

  createPuzzlePieces() {
    this.pieces = [];
    let ids = PuzzleGridConfig.map((field) => field.id);

    PuzzleGridConfig.forEach((el) => {
      const random = Math.floor(Math.random() * ids.length);
      const id = ids[random];
      ids = ids.filter((el) => el !== id);

      const piece = new PuzzlePiece(id, el);
      piece.on("releasepiece", (e) => this.onReleasePiece(piece, e));

      this.container.addChild(piece.sprite);
      this.pieces.push(piece);
    });
  }

  onReleasePiece(piece, e) {
    const pieceToReplace = this.pieces.find((el) => {
      return el !== piece && el.sprite.containsPoint(e.data.global);
    });

    if (pieceToReplace) {
      const originField = piece.field;
      const targetField = pieceToReplace.field;
      piece.setField(targetField);
      pieceToReplace.setField(originField);

      const correctlyPlacesPieces = this.pieces?.filter(
        (el) => el.id === el.field.id
      ).length;

      if (correctlyPlacesPieces === 9) {
        this.onWin();
      }
    } else {
      piece.reset();
    }
  }

  onWin() {
    const rectangle = new PIXI.Graphics();
    rectangle.beginFill(0xffffff);
    rectangle.drawRoundedRect(-100, -50, 200, 100, 16);
    rectangle.endFill();

    const basicText = new PIXI.Text("You won!", {
      fontFamily: "monospace",
      fontSize: 24,
      fill: 0x000000,
    });
    basicText.x = 0;
    basicText.y = 0;
    basicText.anchor.set(0.5);
    rectangle.addChild(basicText);
    this.container.addChild(rectangle);
  }
}
