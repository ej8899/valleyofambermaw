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
let updateName = '.', currentMonster = '';

//
// establish player data
//
const playerData = {
  name: "Masawa (Half-Elf)",				//	character name // TODO - allow for console input of player name at start of game
  age: 22,							// 	character age
  level: 1,							// 	current level player is at
  health: 100,					//	current health as 0 - 100
  healthMax: 100,       //  max health for character
  gold: 0,              //  gold pieces
  monsterKills: 0,			// 	total monster kills to date
  currentX: 0,					// 	current X coordinate in map
  currentY: 0,					// 	current Y coordinate in map
  currentMap: 0,				// 	current map being played (0 is the base layer map)
};

const fixedMapItems = [
  { x: 0, y: 0,
    item: "your home",
    image: "./images/people-heroes.png",
    monster: "no",
  },
  { x: 100, y: 100,
    item: "the town of Embersmaw",
    image: "./images/people-heroes.png",
    monster: "no",
  },
  {
    x: 3, y: 3,
    item: "a hidden stash",
    image: "./images/people-heroes.png",
    monster: "no",
  },
  {
    x: 5, y: 5,
    item: "Darkling",
    image: "./images/monster-darkling.jpg",
    monster: "yes",
  }
];


//
//
//
const randomNumber = (min, max) => Math.floor(Math.random() * (max - min)) + min;


//
//  randomize for a chance encounter of a non-static item (monster/npc/etc)
//
const chanceEncounter = () => {
  // if we toggle activeBattle to true, we can disable movement and indicate this is battle (* CAUTION - no way out as of yet)
  return;
};


//
// doBattle(theMonster); 
// where theMonster is monster name from monster database (future)
//
const doBattle = (theMonster) => {
  //
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
      if (fixedMapItems[x].monster === 'yes') {
        currentMonster = fixedMapItems[x].item;
        activeBattle = true;
      }
      updateStats();
      return true;
    }
  }
  return false;
};


//
//
//
const updateStats = () => {
  $('#playerName').text(playerData.name);
  $('#playerGold').text(playerData.gold);
  $('#playerLevel').text(playerData.level);
  
  // update message LOG
  $('#logMessage').prepend('- ' + currentMessage + '<br>');

  // update player status bar
  $('#xcoord').text(playerData.currentX);
  $('#ycoord').text(playerData.currentY);
  $('#playerHealthMax').text(playerData.healthMax);
  $('#playerHealth').text(playerData.health);
  
  
  // update image
  $('#updateImage').attr("src", updateImage);
  $('#updateName').text(updateName);
    
  // update player message
  $('#currentMessage').html('<b>' + currentMessage + '</b>');

};


//
// key handler
//
const logKey = function(e) {
  // update any messages BEFORE movement
  updateStats();

  
  
  if (`${e.code}` === "KeyW") {
    if (!activeBattle) {
      playerData.currentY += 1;
      currentMessage = "you moved north";
    } else {
      currentMessage = "running failed, try attacking (E)";
    }
  }
  if (`${e.code}` === "KeyA") {
    if (activeBattle === false) {
      playerData.currentX -= 1;
      currentMessage = "you moved west";
    } else {
      if (randomNumber(1,20) < 10) {
        currentMessage = "running failed, try attacking (E)";
      } else {
        currentMessage = "you ran away to the west";
        playerData.currentX -= 1;
        activeBattle = false;
      }
    }
  }
  if (`${e.code}` === "KeyS") {
    if (!activeBattle) {
      playerData.currentY -= 1;
      currentMessage = "you moved south";
    } else {
      currentMessage = "running failed, try attacking (E)";
    }
  }
  if (`${e.code}` === "KeyD") {
    if (!activeBattle) {
      playerData.currentX += 1;
      currentMessage = "you moved east";
    } else {
      currentMessage = "running failed, try attacking (E)";
    }
  }
  if (`${e.code}` === "KeyE") {
    if (activeBattle === false) {
      currentMessage = "you swing in vain at the empty air ahead";
    } else {
      // TODO - call function to 'attack' - get return of any damage done
      currentMessage = `You take a swing at ${currentMonster},<BR>Doing 43 damage!<BR>The ${currentMonster} is dead!`;
      updateStats();
      let goldfound = randomNumber(1,5);
      currentMessage = `You found ${goldfound} gold pieces.`;
      updateStats();
      playerData.gold += goldfound;
      fixedMapItems[3].monster = "no";
      fixedMapItems[3].item = "rotting darkling corpse";
      activeBattle = false;
    }
  }

  if (`${e.code}` === "KeyC") {
    currentMessage = "You search here and find nothing.";
  }
  updateStats();
  
  // check for encounters along the way - note priorities here!
  if (fixedEncounter() === false) {
    updateName = '.';
    updateImage = './images/people-heroes.png';
    chanceEncounter();                                // only if NO fixed encounter, then we can try for chanceEncounter
  }
};


//
// program START (when DOM is rendered)
//
window.onload = function() {
  updateStats();
  document.addEventListener('keydown', logKey);
};