//
//  Valley of Embersmaw
//	a simple console based JS game of exploration and monster hunting!
//



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
