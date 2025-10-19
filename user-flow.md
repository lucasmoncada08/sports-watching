# User Flow

This page outlines the user flow of this app.

User should input the team they are interested in (i.e. Toronto Maple Leafs)

The app will retrieve from the schedule api the most recent game of the past week to select from. Sorted from latest to oldest. Given this list, the user will select the game they wish to consider.

The app will then take the given gameId for the game of interest and retrieve the AllPlays from the `/game/{gamePk}/feed/live`. From here the user will be presented with some preview of the game. Part of the preview will be an excitment factor for the given team. Based off this information, the user will select generally how many minutes of the game they would like to watch.

Given the general time guidelines, the app will display for the user the specific minutes of the game to watch, wherein they will use their game recording and fast-forward to these specific parts. 

The user might also want to see a statistical/textual summary of the missing parts of the game when their are large gaps in between the minutes to watch. This could be anywhere from 1-2 sentences, to a whole paragraph discussing what the user may have missed.

### Preview of the Game Specs
Ideas worth exploring:
- The standings of both teams going in
- If either of the teams are on a hot or cold streak coming into the game
- Show any players playing well recently
- If the game is a back-to-back
- Who is the home team