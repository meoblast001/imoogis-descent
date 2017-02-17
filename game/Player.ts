/// <reference path="../bower_components/excalibur/dist/excalibur.d.ts" />
/// <reference path="Resources.ts" />

class Player extends ex.Actor {
  private static readonly SinkRate: number = 0.075;
  private static readonly FloatRate: number = 0.05;
  private static readonly AdvanceRate: number = 0.1;

  private isClicked: boolean = false;

  constructor(x: number, y: number) {
    super(x, y);
  }

  public onInitialize(engine: ex.Engine) {
    this.addDrawing(Resources[RID.TextureSubmarine]);
    this.collisionType = ex.CollisionType.Passive;
    engine.input.pointers.primary.on('down', () => this.isClicked = true);
    engine.input.pointers.primary.on('up', () => this.isClicked = false);
  }

  public update(engine: ex.Engine, delta: number) {
    super.update(engine, delta);

    // Get behaviour based on input.
    var doSink = engine.input.keyboard.isHeld(ex.Input.Keys.Space) ||
                 this.isClicked;

    // Sink or float.
    if (doSink) {
      this.pos.y += Player.SinkRate * delta;
    } else if (this.pos.y - Player.FloatRate * delta > 0) {
      this.pos.y -= Player.FloatRate * delta;
    } else {
      this.pos.y = 0;
    }

    // Move forward.
    this.pos.x += Player.AdvanceRate * delta;
  }
}
