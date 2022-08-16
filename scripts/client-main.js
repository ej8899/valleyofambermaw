//
//  Valley of Ambermaw
//	a simple console based JS game of exploration and monster hunting!
//


/*
TODO:
  - random endless exploration
  - random monsters - need monster names & details - objects? to allow for monster name, strengths, weaknesses, treasure carrried etc?
  - random npc interactions - need npc names & details - objects for npc name, & details
  - random treasures - need treasure names & details
  - random blockades (trees/rocks/water) - need blockade names & details
  - player health - can branch to physical health, magic health
  - player stats - strength, stamina, dexterity

  - future: 
  - monster encounter should switch to 'attack/defend/run' options to see if success in any option - prevent player from using direction keys to auto run away!
  - dead monsters can leave a 'corpse' behind at the coordinates player is at
  - save player data to a file & load when player returns
  - allow for player to save at any time
  - allow for multiple players at the same time (& interact on map)
  - build a map that keeps blockades in place and stays same for each game played/saved
  - map should allow for 'designer placed' items like a river/mountain/lakes plus random placements of minor blockades/npc/etc
  - build secondary maps like dungeons & towns
  - player levels
  - monster levels
  - player weapons to equip
  - player armours to equip
  - player magic (rings/etc) to equip
*/


//
//	CONTRIBUTORS: add new files/modules as needed!
//


//
// establish player data
//
const playerData = {
  name: "Billy",				//	character name // TODO - allow for console input of player name at start of game
  age: 22,							// 	character age
  level: 0,							// 	current level player is at
  health: 100,					//	current health as 0 - 100
  healthMax: 100,       //  max health for character
  monsterKills: 0,			// 	total monster kills to date
  currentX: 0,					// 	current X coordinate in map
  currentY: 0,					// 	current Y coordinate in map
  currentMap: 0,				// 	current map being played (0 is the base layer map)
};
