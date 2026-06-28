# FlappyBird-MachineLearning

A Flappy Bird clone that teaches itself to play using a **Genetic Algorithm** paired with a **Neural Network** — all running in the browser with no backend required.

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![p5.js](https://img.shields.io/badge/p5.js-ED225D?style=flat&logo=p5dotjs&logoColor=white)
![Machine Learning](https://img.shields.io/badge/Machine%20Learning-Genetic%20Algorithm-blueviolet?style=flat)

---

## How It Works

A population of **250 birds** is spawned each generation. Each bird is controlled by a small neural network that takes the game state as input and decides whether to flap or not. No bird is programmed with rules — they learn purely through evolution.

### The Loop

```
Spawn generation → Birds play → Birds die → Select best → Mutate → Repeat
```

1. **Play** — All 250 birds play simultaneously. Each bird's neural network observes the gap position and its own height/velocity, then outputs a flap decision.
2. **Score** — When a bird dies, its score (frames survived) is recorded. Fitness is its score as a fraction of the total score across all dead birds.
3. **Select** — Better-scoring birds have a proportionally higher chance of being chosen as parents for the next generation (fitness-proportionate / roulette-wheel selection).
4. **Mutate** — A child is a copy of its parent's neural network with small random weight perturbations applied, introducing variation.
5. **Next generation** — The new population of 250 birds is created and the cycle restarts.

Over generations, birds that make better decisions survive longer and pass their "brain" forward — the population gradually gets better at the game.

### Neural Network Architecture

Each bird's brain is a fully-connected feedforward network:

```
Inputs (3)  →  Hidden layer  →  Output (1)
  - Bird Y              sigmoid          - Flap or not
  - Distance to next pipe
  - Gap center Y
```

Weights are stored as matrices and activation uses the **sigmoid function**.

---

## Features

- 250 birds trained simultaneously per generation
- Real-time generation, score, and high score display
- **Speed control** slider — fast-forward training
- **Save best bird** — persists the top bird's brain to `localStorage`; it seeds future sessions so training resumes from where you left off
- **Reset** — clears saved progress and starts fresh

---

## Tech Stack

| Library | Purpose |
|---------|---------|
| [p5.js](https://p5js.org/) | Canvas rendering & game loop |
| Vanilla JS | Neural network, matrix math, genetic algorithm |
| `localStorage` | Persisting the best bird's brain between sessions |

---

## Getting Started

No build step needed — just open the file.

```bash
git clone https://github.com/AmishRanpariya/FlappyBird-MachineLearning.git
cd FlappyBird-MachineLearning
# open index.html in your browser
open index.html
```

Or serve locally to avoid any browser file restrictions:

```bash
npx serve .
```

---

## Project Structure

```
FlappyBird-MachineLearning/
├── index.html        # Entry point & UI (badges, controls)
├── style.css         # Styling
├── sketch.js         # Game loop, population management, p5.js setup
├── Bird.js           # Bird class, fitness calculation, next-generation logic
├── Pipe.js           # Pipe spawning and collision
├── nn.js             # NeuralNetwork class (feedforward, mutate, serialize)
├── matrix.js         # Matrix operations used by the neural network
├── p5.js             # p5.js library
├── p5.sound.min.js   # p5.js sound addon
└── Assets/           # Sprites (bird, pipe, background)
```

---

## Concepts Demonstrated

- **Genetic Algorithm** — selection, reproduction, mutation without backpropagation
- **Fitness-proportionate selection** (roulette wheel) — better birds are more likely parents
- **Neuroevolution** — evolving neural network weights instead of gradient descent
- **localStorage persistence** — saving and resuming a trained agent

---

## License

MIT
