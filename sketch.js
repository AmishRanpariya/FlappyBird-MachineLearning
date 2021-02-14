function vh(v) {
  var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  return (v * h) / 100;
}

function vw(v) {
  var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  return (v * w) / 100;
}

function vmin(v) {
  return Math.min(vh(v), vw(v));
}

function vmax(v) {
  return Math.max(vh(v), vw(v));
}




const savebestbtn = document.querySelector("#savebestbtn");
savebestbtn.addEventListener("click", storeBest);
const resetbtn = document.querySelector("#resetbtn");
resetbtn.addEventListener("click", removeBest);

//for speed control
const slider = document.querySelector('#slider');

//no of birds
const TOTAL = 250;

let birds = [];

//for saving dead bird for next generation
let savedbirds = [];
let pipes = [];

//to store the no. of frame passed  
let counter = 0;

// for spacing between pipe
let spacing;

//get highestScore from localStorage if available
let highest = localStorage.getItem('highestScore') || 0;


let gen = 1; //generation
let savingRate = 1;


//canvas according to the height of the browser
let canvasWidth = vmin(93);

//images
let pipeimg, birdimg, bgimg;




//for badges of scores and generation etc
function addBadgeInfo(badge, message) {
  const div = document.querySelector(`.${badge}`);
  div.firstElementChild.innerHTML = message;
}

function createAlertTabs() {
  addBadgeInfo('generation', `Generation : ${gen}`);
  addBadgeInfo('score', `Score : ${counter}`);
}



//storing best bird (first bird) in localStorage
function storeBest() {
  let bestBrain = birds[0].brain.serialize();
  localStorage.setItem('bestBird', bestBrain);
}

//removing best bird from localStorage
function removeBest() {
  localStorage.removeItem('bestBird');
  location.reload();
}


function preload() {
  pipeimg = loadImage("./Assets/pipeGrey.png");
  birdimg = loadImage("./Assets/alienPink_round.png");
  bgimg = loadImage("./Assets/colored_grass.png");
}

function setup() {
  createCanvas(canvasWidth, canvasWidth);
  //setting the spacing according to the width
  spacing = floor(width / 6);


  /*
  //getting best bird from localStorage and adding this to the birds array if best bird available in storage then only
  */
  if (localStorage.getItem('bestBird') !== null) {
    let birdBrain = NeuralNetwork.deserialize(localStorage.getItem('bestBird'));

    for (let i = 1; i < TOTAL; i++) {
      birds.push(new Bird(birdBrain));
      savedbirds.push(new Bird(birdBrain));
    }
    nextGeneration();
  }
  else {
    for (let i = 0; i < TOTAL; i++) {
      birds.push(new Bird());
    }
  }


  createAlertTabs();
}


function draw() {
  /*
     for loop to change the speed.
     it will play the game given slider's value time and then only renders the canvas only once in a frame
  */

  for (let n = 0; n < slider.value; n++) {
    if (counter % spacing == 0) {
      pipes.push(new Pipe());
    }
    counter++;


    for (let i = pipes.length - 1; i >= 0; i--) {
      pipes[i].update();

      // checks if bird hits the pipe or not
      for (let j = birds.length - 1; j >= 0; j--) {
        if (pipes[i].hits(birds[j])) {
          savedbirds.push(birds.splice(j, 1)[0]);
        }
      }
      //check if bird gone offscreen
      for (let j = birds.length - 1; j >= 0; j--) {
        if (birds[j].offscreen()) {
          savedbirds.push(birds.splice(j, 1)[0]);
        }
      }

      if (pipes[i].offscreen()) {
        pipes.splice(i, 1);
      }
    }
    for (let bird of birds) {
      bird.think(pipes);
      bird.update();
    }

    //if found record breaker save it
    if (counter / spacing > highest) {
      highest = floor(counter / spacing);
      localStorage.setItem('highestScore', `${highest}`);
      if (savingRate == 1) {
        storeBest();
        savingRate--;
      }
    }

    //generation of nextGeneration if all dies
    if (birds.length == 0) {
      counter = 0;
      savingRate = 1;
      nextGeneration();
      gen++;
      addBadgeInfo('generation', `Generation : ${gen}`);
      pipes = [];
    }
  }


  //rendering scene
  imageMode(CORNER);
  image(bgimg, -2 * frameCount % width, 0, width, height);
  image(bgimg, -2 * frameCount % width + width, 0, width, height);

  for (let bird of birds) {
    bird.show();
  }
  for (let pipe of pipes) {
    pipe.show();
  }


  //setting the scores and buttons
  addBadgeInfo('score',
    `
    Players: ${birds.length} 
    <hr> 
    Score : ${floor(counter/spacing)}
    <hr>
    Highest score: ${highest} 
    `);
}

/*
function mousePressed() {
    birds[0].up();
}
*/