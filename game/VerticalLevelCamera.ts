/// <reference path="../bower_components/excalibur/dist/excalibur.d.ts" />
/// <reference path="Resources.ts" />

class VerticalLevelCamera extends ex.BaseCamera {
  private xOffset;
  private yOffset;

  public setOffset(x: number, y: number) {
    this.xOffset = x;
    this.yOffset = y;
  }

  public getFocus(): ex.Vector {
    if (this._follow) {
      var focusY = Math.floor(this._follow.pos.y / GameSize.Height) *
                   GameSize.Height + GameSize.Height / 2;
      return new ex.Vector(
        this._follow.pos.x + this._follow.getWidth() / 2 + this.xOffset,
        focusY + this.yOffset);
    } else {
      super.getFocus();
    }
  }
}
