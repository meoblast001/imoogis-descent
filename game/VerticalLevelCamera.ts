/// <reference path="../bower_components/excalibur/dist/excalibur.d.ts" />

class VerticalLevelCamera extends ex.BaseCamera {
  private xOffset;
  private yOffset;

  public setOffset(x: number, y: number) {
    this.xOffset = x;
    this.yOffset = y;
  }

  public getFocus(): ex.Vector {
    if (this._follow) {
      return new ex.Vector(
        this._follow.pos.x + this._follow.getWidth() / 2 + this.xOffset,
        this._follow.pos.y + this._follow.getHeight() / 2 + this.yOffset);
    } else {
      super.getFocus();
    }
  }
}
