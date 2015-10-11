/* jshint esnext: true */

class ProgressBar {
  constructor(height = 150) {
    this._elementHeight = height;
    this._maxColorValue = 255;
  }
  get barHeight() {
    return this._barHeight;
  }
  get colorValue() {
    return this._colorValue;
  }
  set barHeight(forceValue) {
    this._barHeight = this._elementHeight * forceValue;
    this._colorValue = Math.round(this._maxColorValue * forceValue);
  }
}

export default ProgressBar;
