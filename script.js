let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector(".home");
let msgcont = document.querySelector(".msg-cont");
let msg = document.querySelector(".msg");
let winP = 0;
let winG = 0;
let turno = true;
let scorep = document.querySelector(".scorep");
let scoreg = document.querySelector(".scoreg");
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
    // console.log("Clicked");
    if (turno) {
      // console.log(turno)
      box.innerText = "Pumpkin";
      box.classList.add("sel1");
      turno = false;
    } else {
      box.innerText = "Ghost";
      box.classList.add("sel2");
      // console.log(turno)
      turno = true;
    }
    checkWinner();
  });
});
const disableBoxes = (e) => {
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
  msg.innerText = `Congratulation, Winner is ${winner}`;
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
        // console.log("winner",pos1val);
        showWinner(pos1val);

        if (pos1val === "Pumpkin") {
          winG++;
          console.log("X" + winG);
          scorep.innerText = winG;
        } else {
          winP++;
          console.log("O" + winP);
          scoreg.innerText = winP;
        }
      }
    }
  }
};
resetBtn.addEventListener("click", resetgame);