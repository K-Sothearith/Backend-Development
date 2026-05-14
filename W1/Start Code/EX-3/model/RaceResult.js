import { Duration } from "./Duration.js";
/**
 * This class handle a single race time for a given particicpant and sport type
 */
export class RaceResult {

  // TODO

  /**
   * @type {string}
   * @private
   */
  _participantId;

  /**
   * @type {string}
   * @private
   */
  _sport;

  /**
   * @type {Duration}
   * @private
   */
  _time;

  /**
   * @param {string} participantId
   * @param {string} sport
   * @param {Duration} time
   */
  constructor(participantId, sport, time) {
    // Validation in case of parameters being not the right type and length equivalent to 0
    if (typeof participantId !== "string" || participantId.trim().length === 0) {
      throw new TypeError("participantId must be a string and cannot be empty");
    }
    if (typeof sport !== "string" || sport.trim().length === 0) {
      throw new TypeError("sport must be a string and cannot be empty");
    }
    if (!(time instanceof Duration)) {
      throw new TypeError("time must be a Duration");
    }

    this._participantId = participantId;
    this._sport = sport;
    this._time = time;
  }

  get participantId() {
    return this._participantId;
  }

  get sport() {
    return this._sport;
  }

  get time() {
    return this._time;
  }

  /**
   * Serialize to the JSON shape used in `data/raceScores.json`.
   * @returns {{participant_id: string, sport: string, time: {_totalSeconds: number}}}
   */
  toJSON() {
    return {
      participant_id: this._participantId,
      sport: this._sport,
      time: { _totalSeconds: this._time.totalSeconds },
    };
  }

  /**
   * @param {any} obj
   * @returns {RaceResult}
   */
  static fromJSON(obj) {
    // TODO
    if (!obj || typeof obj !== "object") {
      throw new TypeError("RaceResult.fromJSON expects an object");
    }

    const participantId = obj.participant_id ?? obj.participantId;
    const sport = obj.sport;
    // In the saved JSON file, time is an object
    const seconds =
      obj.time && typeof obj.time === "object"
        ? obj.time._totalSeconds ?? obj.time.totalSeconds
        : undefined;

    return new RaceResult(participantId, sport, Duration.fromSeconds(seconds ?? 0));
  }
}
