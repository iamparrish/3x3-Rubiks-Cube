# 🟥🟧🟩🟦 3x3 Rubik's Cube

A fully interactive 3D Rubik's Cube built with vanilla HTML, CSS, and JavaScript. Drag to rotate, make moves with on-screen controls or keyboard shortcuts, track your solve time, and challenge yourself to crack it!

![HTML](https://img.shields.io/badge/HTML-11.8%25-orange)
![CSS](https://img.shields.io/badge/CSS-51.3%25-blue)
![JavaScript](https://img.shields.io/badge/JavaScript-36.9%25-yellow)

## 🎮 About the Project

This project brings the iconic Rubik's Cube to life right in your browser — no plugins, no frameworks, just pure web tech. The cube features a cinematic splash screen, a fully 3D rotatable cube you can drag with your mouse, a live flat net view that updates in real time, and a complete set of face controls accessible both on-screen and via keyboard.

Whether you're a speedcuber warming up or a casual player enjoying the puzzle, this implementation delivers a satisfying and polished experience.

## ✨ Features

- **3D Interactive Cube** — Click and drag to rotate the cube freely in 3D space
- **Live Cube Net** — A real-time 2D unfolded net mirrors every move you make
- **Visual Face Controls** — On-screen buttons for all 6 faces (U, D, R, L, F, B) with normal and prime (inverse) moves
- **Full Keyboard Support** — Every move mapped to a key for fast play
- **Move Counter** — Tracks the total number of moves made
- **Timer** — Starts on your first move, stops when the cube is solved
- **Scramble** — One-click random scramble to start a new challenge
- **Solved State Reset** — Instantly restore the cube to its solved state
- **Win Detection** — Celebrates with a victory overlay showing your final time and move count
- **Animated Splash Screen** — Particle-effect intro with a 3D CSS cube preview
- **Responsive & Polished UI** — Custom typography (Outfit + JetBrains Mono), gradient accents, and smooth animations

## 🚀 Getting Started

### Prerequisites

Just a modern web browser — no installs, no build step required.

### Run Locally

```bash
git clone https://github.com/iamparrish/3x3-Rubiks-Cube.git
cd 3x3-Rubiks-Cube
```

Open `index.html` in your browser and start solving!

## 🗂️ Project Structure

```
3x3-Rubiks-Cube/
├── index.html      # Full game layout: splash, 3D cube, net view, controls, win overlay
├── style.css       # All styling — layout, animations, 3D transforms, responsive design
└── script.js       # Cube logic, state management, move execution, win detection
```

## 🕹️ How to Play

### Mouse Controls
- **Drag** anywhere on the cube to rotate your view in 3D.

### On-Screen Buttons
Click any move button in the **Face Controls** panel on the right:

| Button | Move |
|--------|------|
| U / U' | Top face clockwise / counter-clockwise |
| D / D' | Bottom face clockwise / counter-clockwise |
| R / R' | Right face clockwise / counter-clockwise |
| L / L' | Left face clockwise / counter-clockwise |
| F / F' | Front face clockwise / counter-clockwise |
| B / B' | Back face clockwise / counter-clockwise |

### Keyboard Shortcuts

| Key | Move | Key | Move |
|-----|------|-----|------|
| `u` | U    | `U` | U'   |
| `d` | D    | `D` | D'   |
| `r` | R    | `R` | R'   |
| `l` | L    | `L` | L'   |
| `f` | F    | `F` | F'   |
| `b` | B    | `B` | B'   |

### Action Buttons

- 🔀 **Scramble** — Randomly shuffles the cube to start a new solve
- ✨ **Solved** — Resets the cube to its completed state
- ↺ **Reset** — Restores the cube and clears the timer and move count

## 🛠️ Built With

- **HTML5** — Game structure, splash screen, cube faces, net layout, and overlays
- **CSS3** — 3D transforms, perspective, animations, grid layout, and custom properties
- **Vanilla JavaScript** — Cube state machine, move logic, drag rotation, timer, scramble algorithm, and win detection

## 👤 Author

**Parrish Tarak**
- GitHub: [@iamparrish](https://github.com/iamparrish)
- Portfolio: [parrishtarak.vercel.app](https://parrishtarak.vercel.app/)

## 🤝 Contributing

Got ideas? Feature requests or bug fixes are always welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add YourFeature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a Pull Request
