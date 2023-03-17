import gsap from "gsap";
import * as PIXI from "pixi.js";
import { Globals } from "./Globals";

export class PuzzlePiece extends PIXI.utils.EventEmitter {
  constructor(id, field) {
    super();
    this.sprite = new PIXI.Sprite(Globals.resources[`puzzle${id}`].texture);
    this.sprite.anchor.set(0.5);
    this.sprite.width = 150;
    this.sprite.height = 150;

    this.field = field;
    this.id = id;

    this.reset();
    this.setInteractive();
  }

  setInteractive() {
    this.sprite.interactive = true;
    this.sprite.cursor = "pointer";
    this.sprite.on("pointerdown", this.onPointerDown, this);
    this.sprite.on("pointermove", this.onPointerMove, this);
    this.sprite.on("pointerup", this.onPointerUp, this);
  }

  onPointerDown(e) {
    this.touchPosition = { ...e.data.global };
    this.dragging = true;
    this.sprite.zIndex = 1;
    Globals.resources.click.sound.play();
  }

  onPointerMove(e) {
    if (!this.dragging) return;

    const newPosition = { ...e.data.global };
    const offsetX = newPosition.x - this.touchPosition.x;
    const offsetY = newPosition.y - this.touchPosition.y;

    this.sprite.x = this.field.x + offsetX;
    this.sprite.y = this.field.y + offsetY;
  }

  onPointerUp(e) {
    this.dragging = false;
    Globals.resources.click.sound.play();
    this.emit("releasepiece", e);
  }

  reset() {
    gsap.to(this.sprite, {
      x: this.field.x,
      y: this.field.y,
    });
    this.sprite.zIndex = 0;
  }

  setField(field) {
    this.field = field;
    this.reset();
  }
}
