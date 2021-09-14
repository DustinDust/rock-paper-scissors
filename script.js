//computer play, return a random choice
let computerPlay = () => {
  let randomChoice = Math.floor(Math.random() * 3);
  if (randomChoice === 0) return "rock";
  if (randomChoice === 1) return "paper";
  if (randomChoice === 2) return "scissors";
};

//play one round with user input and computer random choice
let playOneRound = (playerSelection, computerSelection) => {
  if (typeof playerSelection !== "string") {
    return {
      status: -1,
      message: `${playerSelection.message}! Input: ${playerSelection.error}`,
    };
  }
  if (playerSelection === computerSelection) {
    return { status: 2, message: tieString(playerSelection) };
  }
  if (
    (playerSelection === "rock" && computerSelection === "paper") ||
    (playerSelection === "paper" && computerSelection === "scissors") ||
    (playerSelection === "scissors" && computerSelection === "rock")
  ) {
    return {
      status: 0,
      message: loseString(playerSelection, computerSelection),
    };
  } else
    return {
      status: 1,
      message: winString(playerSelection, computerSelection),
    };
};

//set of function that return win/loss messages, kinda unecessary
let winString = (winner, loser) => {
  return `You won! ${winner} beats ${loser}`;
};

let loseString = (loser, winner) => {
  return `You lose! ${winner} beats ${loser}`;
};

let tieString = (tie) => {
  return `It's a tie!!!!! Both have chosen ${tie}`;
};

//this function is used to get user input
//return either a string for input or an object that contains information when errored
let userInput = () => {
  try {
    let input = prompt("Please enter Rock/Paper/Scissors").toLowerCase();
    if (input !== "rock" && input !== "paper" && input !== "scissors")
      return {
        message:
          "Error! What you type wasn't expected in a Rock-Paper-Scissors game",
        error: input,
      };
    else return input;
  } catch (error) {
    return {
      message: "An error has occured when taking user input!",
      error: error.message,
    };
  }
};

//main game, consists of 5 rounds, tie and error will be counted as one game
// let game = () => {
//   let win = 0,
//     loss = 0;
//   for (let i = 0; i < 5; i++) {
//     let gameState = playOneRound(userInput(), computerPlay());
//     console.log(gameState.message);
//     if (gameState.status === 0) loss++;
//     else if (gameState.status === 1) win++;
//   }
//   if (win > loss) return `You win! (${win}-${loss})`;
//   if (loss > win) return `You lose! (${win}-${loss}!)`;
//   return `It's a tie! (${win}-${loss})`;
// };

// //print out the result
// console.log(game());
const selection = document.querySelectorAll(".choice");
const playerScore = document.querySelector(".player-score");
const computerScore = document.querySelector(".computer-score");
const roundStatus = document.querySelector(".round-status");
const gameStatus = document.querySelector(".game-status h1");
const player = document.querySelector(".avatar-player");
const computer = document.querySelector(".avatar-computer");
for (let choice of Array.from(selection)) {
  choice.addEventListener("click", () => {
    let gameState = playOneRound(
      choice.getAttribute("data-choice"),
      computerPlay()
    );
    roundStatus.textContent = gameState.message;
    setTimeout(() => {
      roundStatus.textContent = "Select One to Start";
    }, 1000);
    let currentPlayerScore = parseInt(playerScore.textContent);
    let currentComputerScore = parseInt(computerScore.textContent);
    if (gameState.status === 1) {
      if (++currentPlayerScore >= 5) {
        gameStatus.textContent = "YOU WIN!";
        player.classList.add("winner");
        setTimeout(() => {
          gameStatus.textContent = "";
          playerScore.textContent = "0";
          computerScore.textContent = "0";
          player.classList.remove("winner");
        }, 2000);
      } else {
        playerScore.textContent = currentPlayerScore.toString();
      }
    }
    if (gameState.status === 0) {
      if (++currentComputerScore >= 5) {
        gameStatus.textContent = "YOU LOSE";
        computer.classList.add("winner");
        setTimeout(() => {
          gameStatus.textContent = "";
          playerScore.textContent = "0";
          computerScore.textContent = "0";
          computer.classList.remove("winner");
        }, 2000);
      } else {
        computerScore.textContent = currentComputerScore.toString();
      }
    }
  });
}
