const box = document.querySelectorAll(".button");
const symb = document.querySelectorAll(".symbol");
const symbol1 = document.getElementById("sym1");
const symbol2 = document.getElementById("sym2")
const result = document.querySelector(".result");
const begingame = document.getElementById("start");
const showsymb = document.querySelector(".btn")
let currentPlayer = "";
let isClickEnabled = false; 

function initGame() {
  currentPlayer = "";
  isClickEnabled = false;
  result.innerHTML = "";
  box.forEach(button => {
    button.innerHTML = "";
    button.style.backgroundColor = "";
    button.removeEventListener("click", handleClick); 
  });
}

function begin() {
  initGame();

  symb.forEach(function(symbol) {
    symbol.addEventListener("click", chooseSymbol);
  });
  begingame.style.display = "none"; 
  showsymb.style.display ="block";

}

function chooseSymbol(e) {
  if (!isClickEnabled) {
    if (e.target.id === "sym1") {
      currentPlayer = "X";
    } else if (e.target.id === "sym2") {
      currentPlayer = "O";
    }
    console.log(currentPlayer)
    isClickEnabled = true; 
    disableButtons();
    box.forEach(button => {
      button.addEventListener("click", handleClick);
    });
    showsymb.style.display ="none";
  }
}

function handleClick(e) {
  if (e.target.textContent) { 
    return; 
  }

  e.target.textContent = currentPlayer;
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  checkWinner();
}


function checkWinner() {
  const combinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let combination of combinations) {
    const [a, b, c] = combination;
    const spanA = box[a];
    const spanB = box[b];
    const spanC = box[c];

    if (spanA.textContent && spanA.textContent === spanB.textContent && spanA.textContent === spanC.textContent) {
      spanA.style.backgroundColor = "green";
      spanB.style.backgroundColor = "green";
      spanC.style.backgroundColor = "green";
      result.innerHTML = `${spanA.textContent} wins`;
      endGame();
      return;
    }
  }

  if ([...box].every(button => button.textContent)) {
    result.innerHTML = "It's a draw";
    endGame();
  }
}

function disableButtons() {
  symb.forEach(function(symbol) {
    symbol.removeEventListener("click", chooseSymbol);
  });
}

function endGame() {
  isClickEnabled = false; 

  box.forEach(button => {
    button.removeEventListener("click", handleClick); 
  });


  begingame.style.display = "block"; 


}


begingame.addEventListener("click", begin);

showsymb.style.display ="none";
