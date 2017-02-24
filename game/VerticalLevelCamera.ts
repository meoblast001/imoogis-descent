/// <reference path="../bower_components/excalibur/dist/excalibur.d.ts" />
/// <reference path="Resources.ts" />

enum TransitionDirection {
  Up,
  Down
}

class VerticalLevelCamera extends ex.BaseCamera {
  public static readonly TransitionRegion = 20;
  public static readonly TransitionSpeed = 2;

  private xFol = 0;
  private yFol = 0;
  private xOffset: number = 0;
  private yOffset: number = 0;
  private currentLevel: number = 0;
  private transitioning: boolean = false;
  private transitionDirection: TransitionDirection = null;

  public setOffset(x: number, y: number) {
    this.xOffset = x;
    this.yOffset = y;
  }

  public update(engine: ex.Engine, delta: number) {
    super.update(engine, delta);

    if (this._follow) {
      // Keep track of the current level. If that level changes, turn the
      // transitioning state on.
      var newLevel = Math.floor(this._follow.pos.y / GameSize.Height);
      if (this.currentLevel != newLevel) {
        this.transitionDirection = newLevel > this.currentLevel ?
          TransitionDirection.Down : TransitionDirection.Up;
        this.currentLevel = newLevel;
        this.transitioning = true;
      } else {
        this.currentLevel = newLevel;
      }

      // While transitioning, update the Y axis of the focus until the next
      // level is reached.
      if (this.transitioning) {
        var targetY = this.currentLevel * GameSize.Height + GameSize.Height / 2;
        switch (this.transitionDirection) {
          case TransitionDirection.Up:
            if (this.yFol < targetY) {
              this.transitioning = false;
            } else {
              this.yFol -= VerticalLevelCamera.TransitionSpeed * delta;
            }
            break;
          case TransitionDirection.Down:
            if (this.yFol > targetY) {
              this.transitioning = false;
            } else {
              this.yFol += VerticalLevelCamera.TransitionSpeed * delta;
            }
            break;
        }
      }
    }
  }

  public getFocus(): ex.Vector {
    if (this._follow) {
      // On the X axis, the player character is followed.
      var focusX = this._follow.pos.x + this._follow.getWidth() / 2
      this.xFol = focusX + this.xOffset;

      // Determine the current level. If transitioning or if the current level
      // doesn't match the level that the player's position suggests
      // (a transition will come soon), then skip all calculation of the Y
      // axis in the focus and simply give back what update() sets.
      var newLevel = Math.floor(this._follow.pos.y / GameSize.Height);
      if (this.transitioning || this.currentLevel != newLevel) {
        return new ex.Vector(this.xFol, this.yFol);
      }

      // On the Y axis, the camera is in the player character's vertical level.
      var focusY = Math.floor(this._follow.pos.y / GameSize.Height) *
                   GameSize.Height + GameSize.Height / 2;
      var playerYInLevel = this._follow.pos.y % GameSize.Height;
      // Follow closely if the player is in the transition regions.
      if (playerYInLevel < VerticalLevelCamera.TransitionRegion) {
        var adjustY = playerYInLevel - VerticalLevelCamera.TransitionRegion;
        this.yFol = focusY + this.yOffset + adjustY;
      } else if (playerYInLevel > GameSize.Height -
                                  VerticalLevelCamera.TransitionRegion) {
        var adjustY = playerYInLevel -
                      (GameSize.Height - VerticalLevelCamera.TransitionRegion);
        this.yFol = focusY + this.yOffset + adjustY;
      // End of transition region code.
      } else {
        this.yFol = focusY + this.yOffset;
      }

      return new ex.Vector(this.xFol, this.yFol);
    } else {
      super.getFocus();
    }
  }
}
