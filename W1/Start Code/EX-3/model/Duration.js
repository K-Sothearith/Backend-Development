/**
 * Represents a duration of time, stored internally as total seconds.
 * Immutable: all operations return a new instance.
 */

//  TODO - You need to export your class to use it
export { Duration };

class Duration {
  /**
   * Total duration in seconds.
   * @type {number}
   * @private
   */
  _totalSeconds;

  /**
   * Creates a new Duration object.
   * @param {number} [seconds=0] - The number of seconds.
   */
  constructor(seconds = 0) {
    // YOUR CODE
    // Validation for seconds in case it isn't a finite number
    const s = Number(seconds);
    if (!Number.isFinite(s)) {
      throw new TypeError("Duration seconds must be a finite number");
    }
    this._totalSeconds = s;
  }

  /**
   * Creates a new Duration from a number of seconds.
   * @param {number} [seconds=0] - The number of seconds.
   * @returns {Duration} A new Duration instance.
   */
  static fromSeconds(seconds = 0) {
    return new Duration(seconds);
  }

  /**
   * Creates a new Duration from a number of minutes and seconds.
   * @param {number} [minutes=0] - The number of minutes.
   * @param {number} [seconds=0] - The number of seconds.
   * @returns {Duration} A new Duration instance.
   */
  static fromMinutesAndSeconds(minutes = 0, seconds = 0) {
    const m = Number(minutes);
    const s = Number(seconds);
    // Validation for minutes and seconds in case it aren't finite numbers
    if (!Number.isFinite(m) || !Number.isFinite(s)) {
      throw new TypeError("Duration minutes/seconds must be finite numbers");
    }
    return new Duration(m * 60 + s);
  }

  /**
   * Returns a new Duration by adding another duration.
   * @param {Duration} other - Another duration to add.
   * @returns {Duration} A new Duration representing the sum.
   */
  plus = (other) => {
    // YOUR CODE
    return new Duration(this._totalSeconds + other._totalSeconds);
  };

  /**
   * Returns a new Duration by subtracting another duration (floored at 0).
   * @param {Duration} other - Another duration to subtract.
   * @returns {Duration} A new Duration representing the difference.
   */
  minus = (other) => {
    // YOUR CODE
    return new Duration(this._totalSeconds - other._totalSeconds);
  };

  /**
   * Total duration in seconds.
   * @returns {number}
   */
  get totalSeconds() {
    return this._totalSeconds;
  }

  /**
   * Converts the duration into a human-readable string, e.g., "2m 30s".
   * @returns {string} The formatted duration string.
   */
  toString = () => {
    // YOUR CODE
    const minutes = Math.floor(this._totalSeconds / 60);
    const seconds = this._totalSeconds % 60;
    return `${minutes}m ${seconds}s`;
  };
}