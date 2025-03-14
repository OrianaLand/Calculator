function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return b === 0 ? "Error" : a / b;
}

function operate(a, b, op) {
  switch (op) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "*":
      return multiply(a, b);
    case "/":
      return divide(a, b);
  }
}

function clearDisplay(element) {
  element.value = "";
}

function updateDisplay(display, button) {
  if (button.classList.contains("operand")) {
    if (!operator) {
      display.value += button.textContent;
      firstNum = +display.value;
      console.log("1st value:", firstNum);
    } else {
      if (secondNum === "") {
        display.value = button.textContent; // Start a new number
      } else {
        display.value += button.textContent; // Continue typing the second number
      }
      secondNum = +display.value;
      console.log("2nd value:", secondNum);
    }
  }

  if (button.classList.contains("operator")) {
    if (firstNum !== "" && secondNum !== "") {
      // Calculate intermediate result
      result = operate(firstNum, secondNum, operator);
      display.value = result; // Show result immediately
      firstNum = result; // Store result as new first number
      secondNum = ""; // Reset second number
    }
    operator = button.textContent;
  }
}

let firstNum = "";
let secondNum = "";
let operator = "";
let opCount = 0;
let result = "";

const buttons = document.querySelectorAll("button");
const display = document.querySelector("input");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.value === "clr") {
      firstNum = "";
      secondNum = "";
      operator = "";
      opCount = 0;
      clearDisplay(display);
    } else {
      updateDisplay(display, button);
    }

    if (button.classList.contains("equal")) {
      if (firstNum !== "" && secondNum !== "") {
        result = operate(firstNum, secondNum, operator);
        display.value = result;
        firstNum = result;
        secondNum = "";
        operator = "";
      }
    }
  });
});
