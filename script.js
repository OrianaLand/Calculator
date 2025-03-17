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
  if (button.classList.contains("decimal")) {
    if (!operator) {
      if (!display.value.includes(".")) {
        display.value += ".";
        firstNum = display.value; // Keep firstNum as a string to retain the decimal
      }
    } else {
      if (!display.value.includes(".")) {
        display.value += ".";
        secondNum = display.value; // Keep secondNum as a string
      }
    }
    return; // Stop further execution for decimals
  }
  if (button.classList.contains("operand")) {
    if (justCalculated) {
      clearDisplay(display);
      result = 0;
      justCalculated = false;
    }
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
      justCalculated = true;
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
let result = 0;
let justCalculated = false;

const buttons = document.querySelectorAll("button");
const display = document.querySelector("input");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.value === "clr") {
      firstNum = "";
      secondNum = "";
      operator = "";
      result = 0;
      justCalculated = false;
      clearDisplay(display);
    } else {
      updateDisplay(display, button);
    }

    if (button.classList.contains("equal")) {
      if (firstNum !== "" && secondNum !== "") {
        result = operate(firstNum, secondNum, operator);
        justCalculated = true;
        display.value = result;
        firstNum = result;
        secondNum = "";
        operator = "";
      }
    }
  });
});
