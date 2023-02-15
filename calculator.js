const button = document.querySelectorAll(".button");
const calculation = document.querySelectorAll(".calculation");
const solutionLast = document.querySelector(".solution");
const clearall = document.querySelector(".clearall");
const del = document.querySelector(".backspace");
const oversolve = document.querySelector(".oversolve");
const undersolve = document.querySelector(".undersolve");
const prevsolution = document.querySelector(".prevsolution");

var ans1 = "";
var ans2 = "";
var solution = null;
var lastAnswer = "";
var dot = false;

button.forEach((button) => {
  button.addEventListener("click", (e) => {
    if (e.target.innerText === "." && !dot) {
      dot = true;
    } else if (e.target.innerText === "." && dot) {
      return;
    }
    ans2 += e.target.innerText;
    undersolve.innerText = ans2;
  });
});

calculation.forEach((calculation) => {
  calculation.addEventListener("click", (e) => {
    if (!ans2) return;
    dot = false;
    const calculationName = e.target.innerText;
    if (ans1 && ans2 && lastAnswer) {
      mathcalculation();
    } else {
      solution = parseFloat(ans2);
    }
    clearallVar(calculationName);
    lastAnswer = calculationName;
  });
});

function clearallVar(name = "") {
  ans1 += ans2 + " " + name + " ";
  oversolve.innerText = ans1;
  undersolve.innerText = "";
  ans2 = "";
  prevsolution.innerText = solution;
}

function mathcalculation() {
  if (lastAnswer === "x") {
    solution = parseFloat(solution) * parseFloat(ans2);
  } else if (lastAnswer === "+") {
    solution = parseFloat(solution) + parseFloat(ans2);
  } else if (lastAnswer === "-") {
    solution = parseFloat(solution) - parseFloat(ans2);
  } else if (lastAnswer === "/") {
    solution = parseFloat(solution) / parseFloat(ans2);
  } else if (lastAnswer === "%") {
    solution = parseFloat(solution) % parseFloat(ans2);
  }
}

solutionLast.addEventListener("click", (e) => {
  if (!ans1 || !ans2) return;
  dot = false;
  mathcalculation();
  clearallVar();
  undersolve.innerText = solution;
  prevsolution.innerText = "";
  ans2 = solution;
  ans1 = "";
});

clearall.addEventListener("click", (e) => {
  undersolve.innerText = "";
  oversolve.innerText = "";
  prevsolution.innerText = "";
  ans1 = "";
  ans2 = "";
  solution = "";
});

del.addEventListener("click", (e) => {
  undersolve.innerText = undersolve.innerText.toString().slice(0, -1);
  ans2 = ans2.toString().slice(0, -1);
});

window.addEventListener("keydown", (e) => {
  if (
    e.key === "0" ||
    e.key === "1" ||
    e.key === "2" ||
    e.key === "3" ||
    e.key === "4" ||
    e.key === "5" ||
    e.key === "6" ||
    e.key === "7" ||
    e.key === "8" ||
    e.key === "9" ||
    e.key === "."
  ) {
    clickbutton(e.key);
  } else if (e.key === "+" || e.key === "-" || e.key === "/" || e.key === "%") {
    clickcalculation(e.key);
  } else if (e.key === "*") {
    clickcalculation("x");
  } else if (e.key === "Enter" || e.key === "=") {
    clicksolution();
  } else if (e.key === "Backspace") {
    clickdel();
  } else if (e.key === "backspace") {
    clickclearall();
  }
});

function clickbutton(key) {
  button.forEach((button) => {
    if (button.innerText === key) {
      button.click();
    }
  });
}

function clickcalculation(key) {
  calculation.forEach((button) => {
    if (button.innerText === key) {
      button.click();
    }
  });
}

function clicksolution() {
  solutionLast.click();
}

function clickdel() {
  del.click();
}

function clickclearall() {
  clearall.click();
}
