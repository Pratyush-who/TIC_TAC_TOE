let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector(".home");
let msgcont = document.querySelector(".msg-cont");
let msg = document.querySelector(".msg");
let turno = true;
let rescore=document.querySelector(".zero-btn");
let scorep = document.querySelector(".scorep .xyz");
let scoreg = document.querySelector(".scoreg .xyz");

// Retrieve scores from localStorage (or initialize them if not found)
let winP = localStorage.getItem("winP") ? parseInt(localStorage.getItem("winP")) : 0;
let winG = localStorage.getItem("winG") ? parseInt(localStorage.getItem("winG")) : 0;

// Display initial scores
scorep.innerText = winG;
scoreg.innerText = winP;

const winpat = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
  [2, 5, 8],
];

const resetgame = () => {
  turno = true;
  enableBoxes();

  boxes.forEach((box) => {
    box.classList.remove("sel1");
    box.classList.remove("sel2");
  });
  msgcont.classList.add("hide");
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turno) {
      box.innerText = "Pumpkin";
      box.classList.add("sel1");
      turno = false;
    } else {
      box.innerText = "Ghost";
      box.classList.add("sel2");
      turno = true;
    }
    checkWinner();
  });
});

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner}`;
  msgcont.classList.remove("hide");
  disableBoxes();
};

const checkWinner = () => {
  for (let pattern of winpat) {
    let pos1val = boxes[pattern[0]].innerText;
    let pos2val = boxes[pattern[1]].innerText;
    let pos3val = boxes[pattern[2]].innerText;

    if (pos1val != "" && pos2val != "" && pos3val != "") {
      if (pos1val === pos2val && pos2val === pos3val) {
        showWinner(pos1val);

        if (pos1val === "Pumpkin") {
          winG++;
          scorep.innerText = winG;
          localStorage.setItem("winG", winG); // Save Pumpkin score
        } else {
          winP++;
          scoreg.innerText = winP;
          localStorage.setItem("winP", winP); // Save Ghost score
        }
      }
    }
  }
};

resetBtn.addEventListener("click", resetgame);

const resetscore =()=>{
winP=0;
winG=0;
scorep.innerText = winG;
  scoreg.innerText = winP;
  localStorage.setItem("winP", winP);
  localStorage.setItem("winG", winG);
  resetgame()
}

rescore.addEventListener("click", resetscore);