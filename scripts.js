/*===================== Score functionality ====================*/
let scoreStr = localStorage.getItem("score");
let score;
resetScore(scoreStr);

function resetScore(scoreStr) {
  score = scoreStr
    ? JSON.parse(scoreStr)
    : {
        win: 0,
        loss: 0,
        tie: 0,
      };
  score.displayScore = function () {
    return `Score: Wins: ${this.win}, Losses: ${this.loss}, Ties: ${this.tie}`;
  };
  showResultMsg();
}

/*===================== Generate Computer Choice ====================*/
function generateComputerChoice() {
  let randomNumber = Math.random() * 3;
  if (randomNumber <= 1) {
    return "Bat";
  } else if (randomNumber <= 2) {
    return "Ball";
  } else {
    return "Stump";
  }
}

/*==================== Generate Result Msg ===================*/
function generateResultMessage(playerChoice, computerChoice) {
  if (playerChoice === computerChoice) {
    score.tie++;
    return "It's a tie!";
  }
  if (
    (playerChoice === "Bat" && computerChoice === "Ball") ||
    (playerChoice === "Ball" && computerChoice === "Stump") ||
    (playerChoice === "Stump" && computerChoice === "Bat")
  ) {
    score.win++;
    return "You win!";
  } else {
    score.loss++;
    return "You lose!";
  }
}

/*==================== Show Display Result =======================*/
function showResultMsg(playerChoice, computerChoice, resultMsg) {
  localStorage.setItem("score", JSON.stringify(score));
  document.getElementById("user-move").innerText = playerChoice
    ? `You have chosen ${playerChoice}.`
    : "";
  document.getElementById("computer-move").innerText = computerChoice
    ? `Computer choice is ${computerChoice}.`
    : "";
  document.getElementById("result").innerText = resultMsg || "";
  document.getElementById("score").innerText = score.displayScore();
}

/*===================== Buttons Functionality =====================*/
let Buttons = document.querySelectorAll(".btn");
let buttonsArray = Array.from(Buttons);

buttonsArray.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.id === "reset-score") {
      localStorage.clear();
      resetScore();
    } else if (button.id === "bat") {
      computerChoice = generateComputerChoice();
      resultMsg = generateResultMessage("Bat", computerChoice);
      showResultMsg("Bat", computerChoice, resultMsg);
    } else if (button.id === "ball") {
      computerChoice = generateComputerChoice();
      resultMsg = generateResultMessage("Ball", computerChoice);
      showResultMsg("Ball", computerChoice, resultMsg);
    } else if (button.id === "stump") {
      computerChoice = generateComputerChoice();
      resultMsg = generateResultMessage("Stump", computerChoice);
      showResultMsg("Stump", computerChoice, resultMsg);
    }
  });
});

/*===================== Dark Mode Functionality =====================*/
let darkMode = localStorage.getItem("darkmode");
let darkModeBtn = document.getElementById("toggle-btn");

const enableDarkMode = () => {
  document.body.classList.replace("light-mode", "dark-mode");
  darkModeBtn.querySelector("svg:first-child").style.display = "block";
  darkModeBtn.querySelector("svg:last-child").style.display = "none";
  localStorage.setItem("darkmode", "active");
};

const enableLightMode = () => {
  document.body.classList.replace("dark-mode", "light-mode");
  darkModeBtn.querySelector("svg:first-child").style.display = "none";
  darkModeBtn.querySelector("svg:last-child").style.display = "block";
  localStorage.setItem("darkmode", null);
};

if (darkMode === "active") {
  enableDarkMode();
} else {
  enableLightMode();
}

darkModeBtn.addEventListener("click", () => {
  darkMode = localStorage.getItem("darkmode");
  if (darkMode !== "active") {
    enableDarkMode();
  } else {
    enableLightMode();
  }
});
