import { LoaderConfig } from "./LoaderConfig";
import { Globals } from "./Globals";

export class Loader {
  constructor(pixiLoader) {
    this.loader = pixiLoader;
    this.resources = LoaderConfig;
  }

  preload() {
    return new Promise((resolve) => {
      for (const [key, value] of Object.entries(this.resources)) {
        this.loader.add(key, value);
      }
      this.loader.load((loader, resources) => {
        console.log(
          "%c Resources loaded",
          "background: dodgerblue; color: white; padding: 6px 8px 4px 2px; border-radius: 999px",
          resources
        );
        Globals.resources = resources;
        resolve();
      });
    });
  }
}
