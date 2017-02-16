/// <reference path="../bower_components/excalibur/dist/excalibur.d.ts" />
/// <reference path="Resources.ts" />

class Player extends ex.Actor {
  constructor(x: number, y: number) {
    super(x, y);
  }

  public onInitialize(engine: ex.Engine) {
    this.addDrawing(Resources[RID.TextureSubmarine]);
  }
}
