/// <reference path="../bower_components/excalibur/dist/excalibur.d.ts" />

enum RID {
  TextureSubmarine
}

var Resources: { [id: string]: ex.Texture } = { };
Resources[RID.TextureSubmarine] =
  new ex.Texture("assets/sprites/submarine.png");
