//utility functions and Bird class are in this file


/*
// fitness is the relative score of the bird which add upto 1 for all the birds
*/
function calfitness() {
  let sum = 0;
  for (let i of savedbirds) {
    sum += i.score;
  }
  for (let i of savedbirds) {
    i.fitness = i.score / sum;
  }
}

// creating next generation
function nextGeneration() {
  calfitness();
  for (let i = 0; i < TOTAL; i++) {
    birds[i] = pickOne();
  }
  savedbirds = [];
}


//picking from savedbirds 
/*
    probability of picking bird is propertional to the fitness of the bird
*/
function pickOne() {

  let index = 0;
  let r = random(1);
  while (r > 0) {
    r = r - savedbirds[index].fitness;
    index++;
  }
  index--;

  let b = savedbirds[index];
  let child = new Bird(b.brain);
  child.mutate();
  return child;
}




class Bird {
  constructor(brain) {
    //position x,y
    this.y = height / 2;
    this.x = width / 4;
    // radius
    this.r = floor(width / 30);

    //physical parameters
    this.gravity =0.7;
    this.lift = 15; //for jump
    this.vel = 0;

    //scores and fitness
    this.score = 0;
    this.fitness = 0;

    //for nextGeneration
    if (brain) {
      this.brain = brain.copy();
    } else {
      this.brain = new NeuralNetwork(5, 8, 2);
    }
  }


  show() {
    // fill(255, 200);
    //    ellipse(this.x, this.y, this.r * 2);
    imageMode(CENTER);
    image(birdimg, this.x, this.y, this.r * 2, this.r * 2);
  }

  // bird gone outside the canvas or not
  offscreen() {
    return (this.y > height || this.y < 0);
  }

  //jump 
  up() {
    if(this.vel>0){
    this.vel += -this.lift;
    }
  }

  //for mutation in nextGeneration
  mutate() {
    this.brain.mutate(0.1); //10% mutation
  }

  //thinking what to do for given pipes
  // should jump or not
  think(pipes) {
    let closest = null;
    let cd = Infinity;
    for (let i = 0; i < pipes.length; i++) {
      let d = pipes[i].x + pipes[i].w - this.x;
      if (d < cd && d > 0) {
        closest = pipes[i];
        cd = d;
      }
    }


    let myinput = [];
    myinput[0] = this.y / height;
    myinput[4] = this.vel / 10;
    myinput[1] = closest.top / height;
    myinput[2] = closest.bottom / height;
    myinput[3] = closest.x / width;


    //predicting the move
    let myout = this.brain.predict(myinput);

    //jump logic 
    if (myout[0] > myout[1] && this.vel > 0) {
      this.up();
    }
  }


  update() {
    this.score+=0.01;
    this.vel += this.gravity;
    this.vel *= 0.9;
    this.y += this.vel;

  }
}