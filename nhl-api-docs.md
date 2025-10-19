# NHL API Relevant Docs

This page includes the relevant information of the nhl docs for this project.

## IMPORTANT: API Update (2023+)
**The old NHL Stats API at https://statsapi.web.nhl.com/api/v1/ was DEPRECATED in 2023.**

**New NHL APIs:** The NHL now has TWO separate APIs:
1. **Web API**: https://api-web.nhle.com/v1/ (for schedules, standings, games, rosters)
2. **Stats API**: https://api.nhle.com/stats/rest/en/ (for teams, player stats)

Both APIs are public — no authentication or API key needed.
They're REST-style JSON services.

## NHL API Quick Reference (Updated 2023+)
- /schedule/{date} — daily games (use 'now' for current, or YYYY-MM-DD format)
- /gamecenter/{gameId}/play-by-play — full play-by-play JSON
- /gamecenter/{gameId}/boxscore — game boxscore data
- /standings/{date} — standings (use 'now' for current)
- /roster/{teamAbbrev}/current — team roster
- Note: Many other endpoints available (teams, players, etc.)

### Schedule Endpoint Details (NEW API)
GET https://api-web.nhle.com/v1/schedule/{date}
Returns schedule for a specific date. Use 'now' for current/live games.
- Example: https://api-web.nhle.com/v1/schedule/2025-10-18
- Example: https://api-web.nhle.com/v1/schedule/now
- Date format: YYYY-MM-DD
- Returns: gameWeek array with games, including gameId, teams, scores, and broadcast info

### Teams Endpoint Details (STATS API)
GET https://api.nhle.com/stats/rest/en/team
Returns a list of all NHL teams including historical teams.
- Example: https://api.nhle.com/stats/rest/en/team
- Returns: Array of teams with id, franchiseId, fullName, triCode (e.g., "TOR", "MTL")
- Note: Includes both current and historical teams (62 total)
- Note: This endpoint is on the Stats API, not the Web API

### Game Endpoint Details (NEW API)
GET https://api-web.nhle.com/v1/gamecenter/{gameId}/play-by-play
Returns complete play-by-play data including all plays with on-ice coordinates, events, and detailed game information.
- Example: https://api-web.nhle.com/v1/gamecenter/2025020076/play-by-play

GET https://api-web.nhle.com/v1/gamecenter/{gameId}/boxscore
Returns boxscore details including goals, shots, PIMs, blocked shots, takeaways, giveaways, and hits.
- Example: https://api-web.nhle.com/v1/gamecenter/2025020076/boxscore

GET https://api-web.nhle.com/v1/gamecenter/{gameId}/landing
Returns game summary and landing page data including line score and game state.
#### Game ID Info
game ids will look like this: 2023020001
The first 4 digits identify the season of the game (ie. 2017 for the 2017-2018 season). Always refer to a season with the starting year. A game played in March 2018 would still have a game ID that starts with 2017
The next 2 digits give the type of game, where 01 = preseason, 02 = regular season, 03 = playoffs, 04 = all-star
The final 4 digits identify the specific game number. For regular season and preseason games, this ranges from 0001 to the number of games played. (1353 for seasons with 32 teams (2022 - Present), 1271 for seasons with 31 teams (2017 - 2020) and 1230 for seasons with 30 teams). For playoff games, the 2nd digit of the specific number gives the round of the playoffs, the 3rd digit specifies the matchup, and the 4th digit specifies the game (out of 7).

### Player Endpoint Details (DEPRECATED)
**WARNING: The old player stats endpoint is deprecated.**
The old endpoint was: https://statsapi.web.nhl.com/api/v1/people/ID/stats

For player stats, use the Stats API at https://api.nhle.com/stats/rest/en/
Check NHL API documentation or community resources for current player stats endpoints.

### Standings Endpoint Details (NEW API)
GET https://api-web.nhle.com/v1/standings/{date}
Returns ordered standings data for each team broken up by divisions.
- Example: https://api-web.nhle.com/v1/standings/now (current standings)
- Example: https://api-web.nhle.com/v1/standings/2025-10-18 (standings as of specific date)
- Date format: YYYY-MM-DD or 'now'
- Returns: Complete standings with wins, losses, points, and division/conference breakdowns