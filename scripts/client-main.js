//
//  Valley of Embersmaw
//	a simple console based JS game of exploration and monster hunting!
//



//
//	CONTRIBUTORS: add new files/modules as needed!
//

//
// GLOBAL VARIABLES
//
let currentMessage = '';

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

const fixedMapItems = [
  { x: 0,
    y: 0,
    item: "home",
  },
  { x: 100,
    y: 100,
    item: "town of Embersmaw",
  },
  {
    x: 10,
    y: 10,
    item: "hidden stash",
  },
];

//
//  randomize for a chance encounter of a non-static item (monster/npc/etc)
//
const chanceEncounter = () => {
  return;
};

//
// check for map collision with a permanent object - town, mountain, river, etc.
//  returns FALSE if no encounter with a fixed object
const fixedEncounter = () => {
  // check the fixedMapItems for matches on coordinates & return true if there was a fixed object encounter
  console.log("in fixedEncounter")
  for (let x = 0; x < fixedMapItems.length; x ++) {
    if ((fixedMapItems[x].x === playerData.currentX) && (fixedMapItems[x].y === playerData.currentY)) {
      currentMessage = `You encountered ${fixedMapItems[x].item}`;
      return true;
    }
  }
  return false;
};



const logKey = function(e) {
  if (`${e.code}` === "KeyW") {
    playerData.currentY += 1;
    currentMessage = "you moved north";
  }
  if (`${e.code}` === "KeyA") {
    playerData.currentX -= 1;
    currentMessage = "you moved west";
  }
  if (`${e.code}` === "KeyS") {
    playerData.currentY -= 1;
    currentMessage = "you moved south";
  }
  if (`${e.code}` === "KeyD") {
    playerData.currentX += 1;
    currentMessage = "you moved east";
  }

  // update player status bar
  $('#xcoord').text(playerData.currentX);
  $('#ycoord').text(playerData.currentY);
  $('#playerHealthMax').text(playerData.healthMax);
  $('#playerHealth').text(playerData.health);

  
  // check for encounters along the way - note priorities here!
  fixedEncounter();
  chanceEncounter();
  
  // update player message
  $('#currentMessage').text(currentMessage);


};


//
// program START (when DOM is rendered)
//
window.onload = function(){
  document.addEventListener('keydown', logKey);
};