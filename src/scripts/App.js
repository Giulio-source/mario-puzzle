import * as PIXI from "pixi.js";
import { Loader } from "./Loader";
import { MainScene } from "./MainScene";

export class App {
  run() {
    // create canvas
    this.app = new PIXI.Application({ resizeTo: window });
    document.body.appendChild(this.app.view);

    // load sprites
    this.loader = new Loader(this.app.loader);
    this.loader.preload().then(() => this.start());
  }

  start() {
    console.log(
      "%c Game started",
      "background: tomato; color: white; padding: 6px 8px 4px 2px; border-radius: 999px"
    );

    this.scene = new MainScene();
    this.app.stage.addChild(this.scene.container);
  }
}
