/// <reference path="../bower_components/excalibur/dist/excalibur.d.ts" />
/// <reference path="Player.ts" />

class GameplayScene extends ex.Scene {
  public static readonly Name = "GameplayScene";
  private player: Player;

  public onInitialize(engine: ex.Engine) {
    this.player = new Player(0, 0);

    this.add(this.player);
  }

  public onActivate() { }

  public onDeactivate() { }
}
