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
	monsterKills: 0,			// 	total monster kills to date
	currentX: 0,					// 	current X coordinate in map
	currentY: 0,					// 	current Y coordinate in map
	currentMap: 0,				// 	current map being played (0 is the base layer map)
};

function showMenu() {
	showHeader();
  console.log(`\na/w/s/d - movement | x - exit`);
};

function showHeader() {
	console.clear();
	console.log("Valley of Ambermaw - a treasure hunting, monster slaying fantasy adventure!");
	console.log(`Player: ${playerData.name} | Level: ${playerData.level} | Health: ${playerData.health} | Coordinates: ${playerData.currentX}, ${playerData.currentY}`);
};

function grabKeys() {
  const stdin = process.stdin;
  stdin.setRawMode(true);
  stdin.setEncoding('utf8');
  
 
  // UNICODE character reference: https://www.rapidtables.com/code/text/unicode-characters.html
  stdin.on('data', function myHandler(key)  {

    if (key === '\u0078' || key === '\u0003') { // x or ctrl-c to exit
    	// operation required for exit - save game perhaps?
    	stdin.removeListener('data',myHandler);
      process.exit();
    }
    if (key === '\u0061') {  // 'a' 
      // operation for WEST
    playerData.currentX -= 1;
      showMenu();
    }
    if (key === '\u0077') {  // 'w'
      // operation for NORTH
    	playerData.currentY += 1;
      showMenu();
    }
    if (key === '\u0073') {  // 's'
      // operation for SOUTH
    	playerData.currentY -= 1;
      showMenu();
    }
    if (key === '\u0064') {  // 'd'
      // operation for EAST
    playerData.currentX += 1;
  		showMenu();
    }
  });
  showMenu();  
}


const main = function() {
	
	// show game title
	// press a key to continue

	// initiate a console keyboard stdin loop & process movements
	grabKeys();
};


//
//	START the main program
//
main();