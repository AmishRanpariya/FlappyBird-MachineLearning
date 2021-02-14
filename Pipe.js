class Pipe {
  constructor() {
    //vertical gap between upper and lower pipe
    this.gap = random(height / 5, height / 3);
    //accordingly position calculated
    this.top = random(height - this.gap);
    this.bottom = this.top + this.gap;

    //   starting position of pipe
    this.x = width;

    //thickness
    this.w = width / 10;

    this.speed = 4;
  }

  show() {
    // fill(this.x * 200 / width, 255, 0);
    // rect(this.x, 0, this.w, this.top);
    //  rect(this.x, this.bottom, this.w, height - this.bottom);
    imageMode(CORNER);
    image(pipeimg, this.x, 0, this.w, this.top);
    image(pipeimg, this.x, this.bottom, this.w, height - this.bottom);
  }

  //given bird hits this pipe or not
  hits(bird) {
    if (bird.y - bird.r * 0.7 < this.top || bird.y + bird.r * 0.7 > this.bottom) {
      if (bird.x + bird.r * 0.7 > this.x && bird.x < this.x + this.w) {
        return true;
      }
    }
  }

  update() {
    this.x -= this.speed;
  }

  // pipe gone outside of the canvas or not
  offscreen() {
    return (this.x < -this.w)
  }

}