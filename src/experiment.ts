import axios from 'axios';
import * as fs from 'fs/promises';
import * as path from 'path';

// New NHL API (2023+) - Old statsapi.web.nhl.com was deprecated
const BASE_URL = 'https://api-web.nhle.com/v1';
const STATS_API_URL = 'https://api.nhle.com/stats/rest/en';
const DATA_DIR = path.join(__dirname, '../data');

// Utility function to save JSON data to a file
async function saveToFile(data: any, filename: string): Promise<void> {
  const filepath = path.join(DATA_DIR, filename);
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(filepath, JSON.stringify(data, null, 2));
  console.log(`✓ Data saved to ${filename}`);
}

// Fetch and save schedule data
// New API format: /schedule/{date} or /schedule/now
async function fetchSchedule(date?: string): Promise<any> {
  const scheduleDate = date || 'now';
  const url = `${BASE_URL}/schedule/${scheduleDate}`;
  console.log(`Fetching schedule: ${url}`);

  const response = await axios.get(url);
  const filename = `schedule_${scheduleDate}.json`;
  await saveToFile(response.data, filename);

  return response.data;
}

// Fetch and save teams data
// Note: Teams endpoint is on the Stats API, not the Web API
async function fetchTeams(): Promise<any> {
  const url = `${STATS_API_URL}/team`;
  console.log(`Fetching teams: ${url}`);

  const response = await axios.get(url);
  await saveToFile(response.data, 'teams.json');

  return response.data;
}

// Fetch and save game play-by-play data
// New API format: /gamecenter/{gameId}/play-by-play
async function fetchGamePlayByPlay(gameId: string): Promise<any> {
  const url = `${BASE_URL}/gamecenter/${gameId}/play-by-play`;
  console.log(`Fetching game play-by-play: ${url}`);

  const response = await axios.get(url);
  await saveToFile(response.data, `game_${gameId}_play-by-play.json`);

  return response.data;
}

// Fetch and save game boxscore
// New API format: /gamecenter/{gameId}/boxscore
async function fetchGameBoxscore(gameId: string): Promise<any> {
  const url = `${BASE_URL}/gamecenter/${gameId}/boxscore`;
  console.log(`Fetching game boxscore: ${url}`);

  const response = await axios.get(url);
  await saveToFile(response.data, `game_${gameId}_boxscore.json`);

  return response.data;
}

// Fetch and save standings data
// New API format: /standings/{date} or /standings/now
async function fetchStandings(date?: string): Promise<any> {
  const standingsDate = date || 'now';
  const url = `${BASE_URL}/standings/${standingsDate}`;
  console.log(`Fetching standings: ${url}`);

  const response = await axios.get(url);
  const filename = `standings_${standingsDate}.json`;
  await saveToFile(response.data, filename);

  return response.data;
}

// Main experimentation function
async function main() {
  try {
    console.log('Starting NHL API experimentation...\n');

    // Example 1: Fetch today's schedule
    // await fetchSchedule('2025-10-18');

    // Example 2: Fetch current/live schedule
    // await fetchSchedule('now');

    // Example 3: Fetch schedule for a specific date
    // await fetchSchedule('2025-10-25');

    // Example 4: Fetch all teams (includes historical teams)
    await fetchTeams();

    // Example 5: Fetch game play-by-play for a specific game
    // Replace with an actual game ID from the schedule (e.g., 2025020076)
    // await fetchGamePlayByPlay('2025020076');

    // Example 6: Fetch game boxscore
    // await fetchGameBoxscore('2025020076');

    // Example 7: Fetch current standings
    // await fetchStandings('now');

    // Example 8: Fetch standings for a specific date
    // await fetchStandings('2025-10-18');

    console.log('\nExperimentation complete! Check the data/ directory for output files.');
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('API Error:', error.message);
      if (error.response) {
        console.error('Status:', error.response.status);
        console.error('Data:', error.response.data);
      }
    } else {
      console.error('Error:', error);
    }
  }
}

// Run the main function
main();
