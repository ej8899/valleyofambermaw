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
let activeBattle = false;
let updateImage = './images/people-heroes.png';
let updateName = '.';

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
  { x: 0, y: 0,
    item: "your home",
    image: "./images/people-heroes.png",
  },
  { x: 100, y: 100,
    item: "the town of Embersmaw",
    image: "./images/people-heroes.png",
  },
  {
    x: 3, y: 3,
    item: "a hidden stash",
    image: "./images/people-heroes.png",
  },
  {
    x: 5, y: 5,
    item: "a darkling",
    image: "./images/monster-darkling.jpg",
  }
];

//
//  randomize for a chance encounter of a non-static item (monster/npc/etc)
//
const chanceEncounter = () => {
  // if we toggle activeBattle to true, we can disable movement and indicate this is battle (* CAUTION - no way out as of yet)
  return;
};

//
// check for map collision with a permanent object - town, mountain, river, etc.
//  returns FALSE if no encounter with a fixed object
const fixedEncounter = () => {
  // check the fixedMapItems for matches on coordinates & return true if there was a fixed object encounter
  console.log("in fixedEncounter");
  for (let x = 0; x < fixedMapItems.length; x ++) {
    if ((fixedMapItems[x].x === playerData.currentX) && (fixedMapItems[x].y === playerData.currentY)) {
      currentMessage = `You encountered ${fixedMapItems[x].item}`;
      updateImage = fixedMapItems[x].image;
      updateName = fixedMapItems[x].item;
      return true;
    }
  }
  return false;
};



//
// key handler
//


const logKey = function(e) {
  // update message LOG
  $('#logMessage').prepend('- ' + currentMessage + '<br>');

  if (`${e.code}` === "KeyW") {
    if (!activeBattle) {
      playerData.currentY += 1;
      currentMessage = "you moved north";
    }
  }
  if (`${e.code}` === "KeyA") {
    if (!activeBattle) {
      playerData.currentX -= 1;
      currentMessage = "you moved west";
    }
  }
  if (`${e.code}` === "KeyS") {
    if (!activeBattle) {
      playerData.currentY -= 1;
      currentMessage = "you moved south";
    }
  }
  if (`${e.code}` === "KeyD") {
    if (!activeBattle) {
      playerData.currentX += 1;
      currentMessage = "you moved east";
    }
  }

  // update player status bar
  $('#xcoord').text(playerData.currentX);
  $('#ycoord').text(playerData.currentY);
  $('#playerHealthMax').text(playerData.healthMax);
  $('#playerHealth').text(playerData.health);


  // check for encounters along the way - note priorities here!
  if (fixedEncounter() === false) {
    updateName = '.';
    updateImage = './images/people-heroes.png';
  }
  chanceEncounter();
  
  // update image
  $('#updateImage').attr("src", updateImage);
  $('#updateName').text(updateName);
    
  // update player message
  $('#currentMessage').html('- <b>' + currentMessage + '</b>');
};


//
// program START (when DOM is rendered)
//
window.onload = function(){
  document.addEventListener('keydown', logKey);
};