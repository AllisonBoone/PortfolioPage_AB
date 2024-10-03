'use strict';

// DOM elements
const canvas = document.querySelector('#etch-a-sketch');
const ctx = canvas.getContext('2d');
const shakeButton = document.querySelector('.shake');
const leftKnob = document.querySelector('.left-knob');
const rightKnob = document.querySelector('.right-knob');

// Constants
const MOVE_AMOUNT = 10;
const SHAKE_DURATION = 500; // in ms

// Canvas setup
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 10;
const { width, height } = canvas;

// Start position (random)
let x = Math.floor(Math.random() * width);
let y = Math.floor(Math.random() * height);

// Initial drawing point
ctx.moveTo(x, y);
ctx.lineTo(x, y);
ctx.stroke();

// Color settings
let hue = 0;

// Function to update stroke color
function updateStrokeColor() {
  hue += 5;
  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
}

// Function to handle drawing on the canvas
function draw({ key }) {
  updateStrokeColor();
  ctx.beginPath();
  ctx.moveTo(x, y);

  switch (key) {
    case 'ArrowUp':
      y = Math.max(0, y - MOVE_AMOUNT);
      break;
    case 'ArrowRight':
      x = Math.min(width, x + MOVE_AMOUNT);
      break;
    case 'ArrowDown':
      y = Math.min(height, y + MOVE_AMOUNT);
      break;
    case 'ArrowLeft':
      x = Math.max(0, x - MOVE_AMOUNT);
      break;
    default:
      return; // Stop if no arrow key is pressed
  }

  ctx.lineTo(x, y);
  ctx.stroke();
}

// Function to handle key events
function handleKey(e) {
  if (e.key.includes('Arrow')) {
    e.preventDefault();
    draw({ key: e.key });
  }
}

// Function to add the shake class and clear the canvas
function shakeCanvas() {
  addShakeEffect();
  ctx.clearRect(0, 0, width, height);
}

// Function to add shake effect to canvas and knobs
function addShakeEffect() {
  [canvas, leftKnob, rightKnob].forEach((el) => el.classList.add('shake'));

  // Remove the shake effect after the animation ends
  setTimeout(() => {
    [canvas, leftKnob, rightKnob].forEach((el) => el.classList.remove('shake'));
  }, SHAKE_DURATION);
}

// Event listeners
window.addEventListener('keydown', handleKey);
shakeButton.addEventListener('click', shakeCanvas);
