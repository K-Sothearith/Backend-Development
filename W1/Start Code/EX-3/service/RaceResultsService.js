
import { Duration } from "../model/Duration.js";
import { RaceResult } from "../model/RaceResult.js";
import fs from 'fs';

/**
 * This class handle the race results management system.
 */
export class RaceResultsService {
  /**
   * The list of race results.
   * @type {Array<RaceResult>}
   * @private
   */
  _raceResults = [];

  get raceResults() {
    return this._raceResults;
  }

  /**
   * Adds a new race result to the race list.
   * @param {RaceResult} result - The race result.
   */
  addRaceResult(result) {
    // TODO
    if (!(result instanceof RaceResult)) {
      throw new TypeError("addRaceResult expects a RaceResult");
    }
    this._raceResults.push(result);
  }

  /**
   * Saves the race results list to a JSON file.
   * @param {string} filePath - The path to the file where data should be saved.
   */
  saveToFile(filePath) {
    // TODO
    const json = JSON.stringify(this._raceResults, null, 2);
    fs.writeFileSync(filePath, json, "utf-8");
  }

  /**
   * Loads the race results list from a JSON file.
   * @param {string} filePath - The path to the file to load data from.
   * @returns {boolean} True if loading was successful, false otherwise.
   */
  loadFromFile(filePath) {
    // TODO
    try {
      const raw = fs.readFileSync(filePath, "utf-8");
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) {
        return false;
      }

      this._raceResults = parsed.map((x) => RaceResult.fromJSON(x));
      return true;
    } catch {
      console.log("Process failed!!")
      return false;
    }
  }

  /**
   * Retrieves the race time for a given participant and sport.
   * @param {string} participantId - Participant ID.
   * @param {string} sport - Sport name.
   * @returns {Duration|null} Duration if found, else null.
   */
  getTimeForParticipant(participantId, sport) {
    //TODO
    const found = this._raceResults.find(
      (r) => r.participantId === participantId && r.sport === sport,
    );
    return found ? found.time : null;
  }

  /**
   * Computes the total time for a given participant by summing their race times.
   * @param {string} participantId - The ID of the participant.
   * @returns {Duration|null} The total Duration object if found, otherwise null.
   */
  getTotalTimeForParticipant(participantId) {
    // TODO
    const matches = this._raceResults.filter((r) => r.participantId === participantId);
    if (matches.length === 0) {
      return Duration.fromSeconds(0);
    }

    return matches.reduce((acc, r) => acc.plus(r.time), Duration.fromSeconds(0));
  }
}
