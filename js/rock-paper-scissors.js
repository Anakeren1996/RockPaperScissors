let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  ties: 0,
};

updateScoreElement();

// THIS CODE IS THE SAME DE COLD ABOVE AFTER THE (||)
// // if(score === null) { OR
// if (!score) {
//     score = {
//         wins: 0,
//         losses: 0,
//         ties: 0
//     }
// }

let isAutoPlaying = false;
let intervalId;

/*
  const autoPlay = () => {
    
  }
  */
function autoPlay() {
  if (!isAutoPlaying) {
    intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;
    document.querySelector(".auto-play-button").innerHTML = `Stop Auto Play`;
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
    document.querySelector(".auto-play-button").innerHTML = `Auto play`;
  }
}

document.querySelector(".js-rock-button").addEventListener("click", () => {
  playGame("Rock");
});

document.querySelector(".js-paper-button").addEventListener("click", () => {
  playGame("Paper");
});

document.querySelector(".js-scissors-button").addEventListener("click", () => {
  playGame("Scissors");
});

document.querySelector(".js-reset-score").addEventListener("click", () => {
  showResetConfirmation();
});

document.querySelector(".js-autoplay").addEventListener("click", () => {
  autoPlay();
});

document.body.addEventListener("keydown", (event) => {
  // console.log("Keydown!");
  // console.log(event.key);
  if (event.key === "r") {
    playGame("Rock");
  } else if (event.key === "p") {
    playGame("Paper");
  } else if (event.key === "s") {
    playGame("Scissors");
  } else if (event.key === "a") {
    autoPlay();
  } else if (event.key === "Backspace") {
    // Update 'Backspace' to show the
    // confirmation message instead of
    // resetting the score immediately.
    showResetConfirmation();
  }
});

function playGame(playerMove) {
  const computerMove = pickComputerMove();

  let result = "";

  if (playerMove === "Scissors") {
    if (computerMove === "Rock") {
      result = "You lose.";
    } else if (computerMove === "Paper") {
      result = "You win.";
    } else if (computerMove === "Scissors") {
      result = "Tie.";
    }
  } else if (playerMove === "Paper") {
    if (computerMove === "Rock") {
      result = "You win.";
    } else if (computerMove === "Paper") {
      result = "Tie.";
    } else if (computerMove === "Scissors") {
      result = "You lose.";
    }
  } else if (playerMove === "Rock") {
    if (computerMove === "Rock") {
      result = "Tie.";
    } else if (computerMove === "Paper") {
      result = "You lose.";
    } else if (computerMove === "Scissors") {
      result = "You win.";
    }
  }

  if (result === "You win.") {
    score.wins += 1;
  } else if (result === "You lose.") {
    score.losses += 1;
  } else if (result === "Tie.") {
    score.ties += 1;
  }

  localStorage.setItem("score", JSON.stringify(score));

  updateScoreElement();

  document.querySelector(".js-result").innerHTML = result;

  document.querySelector(
    ".js-moves"
  ).innerHTML = `You <img src="img/${playerMove}-emoji.png" class="move-icon"> Computer <img src="img/${computerMove}-emoji.png" class="move-icon">`;
}

function updateScoreElement() {
  document.querySelector(".js-score").innerHTML = `Wins: ${score.wins},
  Losses: ${score.losses}, Ties: ${score.ties}`;
}

function pickComputerMove() {
  const randomNumber = Math.random();

  let computerMove = "";

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = "Rock";
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = "Paper";
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = "Scissors";
  }

  return computerMove;
}

function resetScore() {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem("score");
  updateScoreElement();
}

// Function for showing the confirmation message.
function showResetConfirmation() {
  document.querySelector(".js-reset-confirmation").innerHTML = `
        Are you sure you want to reset the score?
        <button class="js-reset-confirm-yes reset-confirm-button">
          Yes
        </button>
        <button class="js-reset-confirm-no reset-confirm-button">
          No
        </button>
      `;

  // You could use onclick="..." in the HTML above,
  // but it's recommended to use .addEventListener()
  document
    .querySelector(".js-reset-confirm-yes")
    .addEventListener("click", () => {
      resetScore();
      hideResetConfirmation();
    });

  document
    .querySelector(".js-reset-confirm-no")
    .addEventListener("click", () => {
      hideResetConfirmation();
    });
}

// A helper function (it helps us reuse the
// code for hiding the confirmation message).
function hideResetConfirmation() {
  document.querySelector(".js-reset-confirmation").innerHTML = "";
}
