//
//  Valley of Ambermaw
//	a simple console based JS game of exploration and monster hunting!
//


/*
TODO:
 - random endless exploration
 - random monsters
 - random npc interactions
 - random treasures
 - random blockades (trees/rocks/water)

 - future: 
 - build a map that keeps blockades in place
 - build secondary maps like dungeons & towns
 - player levels
 - monster levels
 - player weapons to equip
 - player armours to equip
 - player magic (rings/etc) to equip
*/



//
// establish player data
//
const playerData {
	name: "Billy",				//	character name // TODO - allow for console input of player name at start of game
	age: 22,					// 	character age
	level: 0,					// 	current level player is at
	monsterKills: 0,			// 	total monster kills to date
	currentX: 0,				// 	current X coordinate in map
	currentY: 0,				// 	current Y coordinate in map
	currentMap: 0,				// 	current map being played (0 is the base layer map)
}


const main = function() {
	// show game title
	// initiate a console keyboard stdin loop & process movements
};