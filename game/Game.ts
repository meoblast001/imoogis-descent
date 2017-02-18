/// <reference path="../bower_components/excalibur/dist/excalibur.d.ts" />
/// <reference path="Resources.ts" />
/// <reference path="GameplayScene.ts" />

var game = new ex.Engine({
  width: GameSize.Width,
  height: GameSize.Height,
  canvasElementId: 'game'
});

// Load resources.
var loader = new ex.Loader();
for (var resource in Resources) {
  loader.addResource(Resources[resource]);
}

game.start(loader).then(() => {
  // Add the scenes (game modes).
  game.add(GameplayScene.Name, new GameplayScene());

  game.goToScene(GameplayScene.Name);
});
