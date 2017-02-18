/// <reference path="../bower_components/excalibur/dist/excalibur.d.ts" />
/// <reference path="Player.ts" />
/// <reference path="VerticalLevelCamera.ts" />
/// <reference path="Resources.ts" />

class GameplayScene extends ex.Scene {
  public static readonly Name = "GameplayScene";
  private player: Player;

  public onInitialize(engine: ex.Engine) {
    this.player = new Player(0, 0);
    this.add(this.player);

    // Initialise camera.
    var camera = new VerticalLevelCamera();
    camera.setActorToFollow(this.player);
    camera.setOffset(GameSize.Width / 2 - 100, 0);
    this.camera = camera;
  }

  public onActivate() { }

  public onDeactivate() { }
}
