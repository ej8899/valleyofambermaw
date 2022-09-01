//
//  Valley of Embersmaw
//	a simple console based JS game of exploration and monster hunting!
//


/*
TODO:

- if we break updateStatus() into an updateMessage() as well, we should be able to avoid the fight & win, then all of a sudden
  see the rotting corpse here too.
- we could save player object into localStorage - have a manual save button somewhere

*/


//
//	CONTRIBUTORS: add new files/modules as needed!
//

//
// GLOBAL VARIABLES
//
let currentMessage = '';
let activeBattle = false;
let updateImage = './images/people-heroes.png';
let updateName = '_', currentMonster = '';

//
// establish player data
//
const playerData = {
  name: "Masawa (Half-Elf)",				//	character name // TODO - allow for console input of player name at start of game
  age: 22,							// 	character age
  level: 1,							// 	current level player is at
  health: 100,					//	current health as 0 - 100
  healthMax: 100,       //  max health for character
  healthState: 1,       //  use 1 for normal state, 2 for sick, 3 for poisoned, etc? normal to allow for auto heal
  experience: 0,        //  total experience points to date
  gold: 0,              //  gold pieces
  monsterKills: 0,			// 	total monster kills to date
  currentX: 0,					// 	current X coordinate in map
  currentY: 0,					// 	current Y coordinate in map
  currentMap: 0,				// 	current map being played (0 is the base layer map)
};

const fixedMapItems = [
  { x: 0, y: 0,
    item: "your home",
    description: "mountains exist to the west, and a large, icy cold lake to the south.",
    image: "./images/people-heroes.png",
    monster: "no",
  },
  { x: 100, y: 100,
    item: "the town of Embersmaw",
    description: "",
    image: "./images/people-heroes.png",
    monster: "no",
  },
  {
    x: 3, y: 3,
    item: "a hidden stash",
    description: "",
    image: "./images/people-heroes.png",
    monster: "no",
  },
  {
    x: 5, y: 5,
    item: "Darkling",
    description: "",
    image: "./images/monster-darkling.jpg",
    monster: "yes",
  }
];

const monstersDatabase = {
  darkling: {
    name: "Darkling",
    healthBase: 20,
    healthNow: 20,
    hasTreasure: true,
  },
};

const itemsDatabase = {
  grave: {
    image: "./images/grave.png",
    hasTreasure: false,
  },

};


//
//  thenumber = randomNumber(min, max);
//  select a random number between min and max
//
const randomNumber = (min, max) => Math.floor(Math.random() * (max - min)) + min;

//
//
//
const updateFixedMapItem = (item,itemName,newImage) => {
  fixedMapItems[item].monster = "no";
  fixedMapItems[item].item = itemName;
  fixedMapItems[item].image = newImage;
};

//
//  randomize for a chance encounter of a non-static item (monster/npc/etc)
//
const chanceEncounter = () => {
  // if we toggle activeBattle to true, we can disable movement and indicate this is battle (* CAUTION - no way out as of yet)
  return;
};


//
//  crazyAction();
//  called if player is doing something crazy - they might lose XP if "spotted".
//
const crazyAction = () => {
  let xpLost = randomNumber(1,20);
  if (xpLost < 5) {
    currentMessage += "You were spotted behaving like a crazy person.<BR>";
    currentMessage += `You lose ${xpLost} experience points.`;
    playerData.experience -= xpLost * playerData.level;
  }
};


//
// doBattle(theMonster);
// where theMonster is monster name from monster database (future)
//
const doBattle = (theMonster) => {
  currentMessage = "";
  if (theMonster === "air") {
    currentMessage = "You swing in vain at the empty air ahead and do no damage to it.<BR>";
    crazyAction();
    return;
  }

  // need randomizer for who attacks first - eventually modify based on player luck

  // player attacks monster
  let attackDamage = playerData.level * randomNumber(1,20);
  let attackSuccess = randomNumber(1,20);
  if (attackSuccess > 9) {
    currentMessage += `You take a swing at ${theMonster}, doing ${attackDamage} damage!<BR>`;
    monstersDatabase[theMonster].healthNow -= attackDamage;
  } else {
    currentMessage += `You swing at ${theMonster} but miss!`;
  }


  // monster is dead
  if (monstersDatabase[theMonster].healthNow < 1) {
    currentMessage += `The ${theMonster} is dead!`;
    let goldfound = randomNumber(1,5);
    currentMessage += `You found ${goldfound} gold pieces.`;
    playerData.gold += goldfound;
    updateFixedMapItem(3,"a grave","./images/grave.png");
    activeBattle = false;
  } else {
  // monster attacks player
    attackSuccess = randomNumber(1,20);
    attackDamage = randomNumber(1,10);
    if (attackSuccess > 9) {
      currentMessage += `${theMonster} slashes you, doing ${attackDamage} damage!<BR>`;
      playerData.health -= attackDamage;
    } else {
      currentMessage += `${theMonster} swings at you and misses!`;
    }
  }

  // on success - add to player experience
  // on success - any dropped items? do we always pickup, or prompt to allow player to select what they want?

  return;
};


//
// searchHere();
//
const searchHere = () => {
  currentMessage = "You search here and find nothing.";
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
const updateStats = (clearMessages) => {
  if (clearMessages === "clear") {
    $('#logMessage').empty();
    currentMessage = '';
  }

  $('#playerName').text(playerData.name);
  $('#playerGold').text(playerData.gold);
  $('#playerLevel').text(playerData.level);
  
  // update message LOG
  $('#logMessage').append(currentMessage + '<br>');

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
// movement handler
//
const movePlayer = (direction) => {
  // trying to run from battle
  if (activeBattle) {
    if (randomNumber(1,20) < 12) {          // RUN THE ODDS OF FLEEING BATTLE // TODO - update based on player skills etc
      currentMessage = "Running failed, try attacking (E)!";
    } else {
      currentMessage = `You ran away to the ${direction}.`;
      activeBattle = false;
    }
  }

  // move the player
  if (!activeBattle) {
    if (direction === "north") {
      playerData.currentY += 1;
    }
    if (direction === "south") {
      playerData.currentY -= 1;
    }
    if (direction === "west") {
      playerData.currentX -= 1;
    }
    if (direction === "east") {
      playerData.currentX += 1;
    }
    currentMessage = `You travelled ${direction}`;
  }
};


//
// key handler
//
const logKey = function(e) {
  // update any messages BEFORE movement
  updateStats("clear");

  if (`${e.code}` === "KeyW") {
    movePlayer("north");
  }
  if (`${e.code}` === "KeyS") {
    movePlayer("south");
  }
  if (`${e.code}` === "KeyD") {
    movePlayer("east");
  }
  if (`${e.code}` === "KeyA") {
    movePlayer("west");
  }
  
  if (`${e.code}` === "KeyE") {
    if (activeBattle === false) {
      doBattle("air");
    } else {
      // TODO - call function to 'attack' - get return of any damage done
      doBattle('darkling');
    }
  }

  if (`${e.code}` === "KeyC") {
    searchHere();
  }
  updateStats();
  
  // check for encounters along the way - note priorities here!
  if (fixedEncounter() === false) {
    updateName = '_';
    updateImage = './images/people-heroes.png';
    chanceEncounter();                                // only if NO fixed encounter, then we can try for chanceEncounter
  }
};


//
//  autoHealPlayer(state);
//  state = init - to setup new auto healing timer, clear - to clear prior set state
//  no return values
//
const autoHealPlayer = (state) => {
  const baseTime = 5000;    // TODO - this timing would adjust based on player stats for regen, or perhaps a potion
  let autoHealing = '';
  if (state === 'init') {
    autoHealing = setInterval(autoHealPlayer, baseTime);
    return;
  }
  if (state === 'clear') {
    clearInterval(autoHealing);
    return;
  }

  if (playerData.healthState === 1) {             // player is healthy, let them auto heal
    if (playerData.health < playerData.healthMax) {
      playerData.health ++;
    }
  } else if (playerData.healthState === 3) {      // player is poisoned, reduce health
    playerData.health --;
  }
};


//
// program START (when DOM is rendered)
//
window.onload = function() {
  updateStats();
  document.addEventListener('keydown', logKey);

  // set interval timer so player always gains health unless sick
  autoHealPlayer('init');
};