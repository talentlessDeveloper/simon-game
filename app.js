const greenPanel = document.querySelector(".top-left");
const redPanel = document.querySelector(".top-right");
const yellowPanel = document.querySelector(".bottom-right");
const bluePanel = document.querySelector(".bottom-left");
const powerBtn = document.querySelector(".power-btn");
const startBtn = document.querySelector(".start-btn");
const strictBtn = document.querySelector("#strict-btn");
const countBox = document.querySelector(".count-box");

let colorArray = ["green", "red", "yellow", "blue"];

let gameLength = 20;
let gameOrder = [];
let playerOrder = [];
let powerOn = false;
let startGame = false;
let strict = false;
let flash;
let compTurn;
let playerTurn;
let gameInterval;
let correctChoice = true;
let win = false;
strictBtn.checked = false;

strictBtn.addEventListener("click", () => {
  if (strictBtn.checked) {
    strict = true;
  } else {
    strict = false;
  }
});

powerBtn.addEventListener("click", () => {
  if (powerOn) {
    powerOn = false;
    startGame = false;
    powerBtn.classList.remove("on");
    countBox.innerText = "";
  } else {
    powerOn = true;
    powerBtn.classList.add("on");
    countBox.innerText = "--";
  }
});

startBtn.addEventListener("click", () => {
  if (powerOn) {
    play();
    startGame = true;
  }
});

// begin game
function play() {
  win = false;
  correctChoice = true;
  gameOrder = [];
  playerOrder = [];
  playerTurn = 1;
  countBox.innerText = 1;

  // set flash to 0
  flash = 0;
  for (let i = 0; i < gameLength; i++) {
    gameOrder.push(colorArray[Math.floor(Math.random() * colorArray.length)]);
  }
  compTurn = true;
  gameInterval = setInterval(gameTurn, 1000);
}

// interval

function gameTurn() {
  powerOn = false;
  if (flash === playerTurn) {
    clearInterval(gameInterval);
    clearColor();
    powerOn = true;
    compTurn = false;
  }

  if (flash !== playerTurn && compTurn) {
    //clear color everytime  gameTurn function is called to return panels to their original background-color;
    clearColor();
    setTimeout(() => {
      if (gameOrder[flash] === "green") green();
      if (gameOrder[flash] === "red") red();
      if (gameOrder[flash] === "yellow") yellow();
      if (gameOrder[flash] === "blue") blue();

      flash++;
    }, 500);
  }
}

// when user clicks on panel
greenPanel.addEventListener("click", () => {
  if (powerOn && startGame) {
    playerOrder.push("green");
    green();
    check();
  }
  if (!win) {
    setTimeout(() => {
      clearColor();
    }, 500);
  }
});

redPanel.addEventListener("click", () => {
  if (powerOn && startGame) {
    playerOrder.push("red");
    red();
    check();
  }
  if (!win) {
    setTimeout(() => {
      clearColor();
    }, 500);
  }
});
yellowPanel.addEventListener("click", () => {
  if (powerOn && startGame) {
    playerOrder.push("yellow");
    yellow();
    check();
  }
  if (!win) {
    setTimeout(() => {
      clearColor();
    }, 500);
  }
});
bluePanel.addEventListener("click", () => {
  if (powerOn && startGame) {
    playerOrder.push("blue");
    blue();
    check();
  }

  if (!win) {
    setTimeout(() => {
      clearColor();
    }, 500);
  }
});

// check if  player choice is correct
function check() {
  let lastIdx = playerOrder.length - 1;
  //if player choice is incorrect
  if (playerOrder[lastIdx] !== gameOrder[lastIdx]) {
    correctChoice = false;
  }

  // when choice is incorrect do this
  if (correctChoice === false) {
    countBox.innerHTML = "NO!!";
    flashColor();

    setTimeout(() => {
      clearColor();
      countBox.innerHTML = playerTurn;

      //  if strict mode is on begin again
      if (strict) {
        play();
      } // continue from where you stopped.
      else {
        correctChoice = true;
        compTurn = true;
        playerOrder = [];
        flash = 0;
        gameInterval = setInterval(gameTurn, 1000);
      }
    }, 2000);
  }

  if (playerOrder.length === gameLength && correctChoice) {
    winGame();
  }

  // if choice is correct but you havent won game.
  if (playerTurn === playerOrder.length && correctChoice && !win) {
    playerTurn++;
    countBox.innerText = playerTurn;
    compTurn = true;
    flash = 0;
    playerOrder = [];
    gameInterval = setInterval(gameTurn, 1000);
  }
}

// audio and flash color
function green() {
  let audio = document.getElementById("clip1");
  audio.play();
  greenPanel.style.backgroundColor = "lightgreen";
}

function red() {
  let audio = document.getElementById("clip2");
  audio.play();
  redPanel.style.backgroundColor = "tomato";
}

function blue() {
  let audio = document.getElementById("clip4");
  audio.play();
  bluePanel.style.backgroundColor = "lightskyblue";
}

function yellow() {
  let audio = document.getElementById("clip3");
  audio.play();
  yellowPanel.style.backgroundColor = "yellow";
}

function clearColor() {
  greenPanel.style.backgroundColor = "#136117";
  redPanel.style.backgroundColor = "#8C1307";
  yellowPanel.style.backgroundColor = "#DCA33C";
  bluePanel.style.backgroundColor = "#001E86";
}

// flash color to indicate winning or incorrect choice
function flashColor() {
  greenPanel.style.backgroundColor = "lightgreen";
  redPanel.style.backgroundColor = "tomato";
  yellowPanel.style.backgroundColor = "yellow";
  bluePanel.style.backgroundColor = "lightskyblue";
}

function winGame() {
  flashColor();
  countBox.innerText = "WIN!";
  powerOn = false;
  win = true;
}

//footer date
document.querySelector("footer span").innerText = `${new Date().getFullYear()}`;
