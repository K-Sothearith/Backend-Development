import { RaceResultsService } from "./service/RaceResultsService.js";
import { fileURLToPath } from "node:url";
import path from "node:path";

// Initialize RaceResults
const raceResultService = new RaceResultsService();

// Load results from file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
raceResultService.loadFromFile(path.join(__dirname, "data", "raceScores.json"));

// Retrieve time for a participant and sport
const time1 = raceResultService.getTimeForParticipant("participant1", "swim");
console.log(time1?.toString()); // Expected: 2m 30s

// Compute total time for a participant
const totalTime1 = raceResultService.getTotalTimeForParticipant("participant1");
console.log(totalTime1.toString()); // Expected: 4m 15s
