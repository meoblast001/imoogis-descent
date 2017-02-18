/// <reference path="../bower_components/excalibur/dist/excalibur.d.ts" />
/// <reference path="Resources.ts" />

class VerticalLevelCamera extends ex.BaseCamera {
  public static readonly TransitionRegion = 20;
  private xOffset;
  private yOffset;

  public setOffset(x: number, y: number) {
    this.xOffset = x;
    this.yOffset = y;
  }

  public getFocus(): ex.Vector {
    if (this._follow) {
      // On the X axis, the player character is followed.
      var focusX = this._follow.pos.x + this._follow.getWidth() / 2
      // On the Y axis, the camera is in the player character's vertical level.
      var focusY = Math.floor(this._follow.pos.y / GameSize.Height) *
                   GameSize.Height + GameSize.Height / 2;
      var playerYInLevel = this._follow.pos.y % GameSize.Height;
      // Follow closely if the player is in the transition regions.
      if (playerYInLevel < VerticalLevelCamera.TransitionRegion) {
        var adjustY = playerYInLevel - VerticalLevelCamera.TransitionRegion;
        return new ex.Vector(focusX + this.xOffset,
                             focusY + this.yOffset + adjustY);
      } else if (playerYInLevel > GameSize.Height -
                                  VerticalLevelCamera.TransitionRegion) {
        var adjustY = playerYInLevel -
                      (GameSize.Height - VerticalLevelCamera.TransitionRegion);
        return new ex.Vector(focusX + this.xOffset,
                             focusY + this.yOffset + adjustY);
      // End of transition region code.
      } else {
        return new ex.Vector(focusX + this.xOffset, focusY + this.yOffset);
      }
    } else {
      super.getFocus();
    }
  }
}
