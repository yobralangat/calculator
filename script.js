
//DOM elements
const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const clearButton = document.querySelector('.clear');
const deleteButton = document.querySelector('.delete');
const display = document.querySelector('#display');
const equalsKey = document.querySelector('.equals-key');
const decimalButton = document.querySelector('.decimal');

//Functions for all the basic math operators
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
    return a / b;
}

//Operate function that takes operator and two operands
function operate(a, op, b) {

    switch (op) {
        case '+':
            return add(a, b);
            break;
        case '-':
            return subtract(a, b);
            break;
        case '/':
            if (b === 0) {
                return 'ERROR';
            } else {
                return a / b;
            }
            break;
        case '*':
            return multiply(a, b);
            break;
        default: return 'INVALID OPERATOR';
    }
}



//Calculator state variable
let firstNumber = '';
let secondNumber = '';
let operator = '';
let shouldResetDisplay = false;
let lastResult = null;

//Update display function
function updateDisplay(value) {
    display.value = value;
}

//Handle number button clicks
function HandleNumberClick(number) {
    if (shouldResetDisplay) {
        display.value = '';
        shouldResetDisplay = false;
    } 
    if (display.value === '0' && number !== '.') {
            display.value = number;
        } else {
            //if it's '0' and the number is a decimal, display '0.'
            display.value += number;
        }
    //update the appropriate number variable
    if (!operator) {
        firstNumber = display.value;
    }  else {
        secondNumber = display.value;
    }
}

//Handle  operator button clicks
function handleOperatorClick(op) {
    if (firstNumber && operator && secondNumber) {
        const result = operate(parseFloat(firstNumber), operator, parseFloat(secondNumber));
        display.value = roundResult(result);
        firstNumber = roundResult(result).toString();
        secondNumber = '';
        operator = op;
        shouldResetDisplay = true;
    } else if (firstNumber) {
        operator = op;
        shouldResetDisplay = true;
    }
}

//Handle equals button clicks
function handleEqualsclick() {
    if (firstNumber && operator && secondNumber) {
        const result = operate(parseFloat(firstNumber), operator, parseFloat(secondNumber));
        const formattedResult = roundResult(result);
        
        display.value = formattedResult;
        lastResult = formattedResult;
        firstNumber = formattedResult.toString();
        secondNumber = '';
        operator = '';
        shouldResetDisplay = true;
    }
}

//Handle clear button click
function handleClearClick() {
    firstNumber = '';
    secondNumber = '';
    operator = '';
    shouldResetDisplay = false;
    lastResult = null;
    updateDisplay('0');
}

//Handle delete button click
function handleDeleteClick() {
    if (display.value.length > 1) {
        display.value = display.value.slice(0, -1);
    } else {
        display.value = '0';
    }
    //update appropriate number variable
    if (!operator) {
        firstNumber = display.value;
    } else {
        secondNumber = display.value;
    }
}

//Handle decimal button click
function handleDecimalClick() {
    if (shouldResetDisplay) {
        display.value = '';
        shouldResetDisplay = false
    }

    if (!display.value.includes('.')) {
        display.value += '.';
    }

    //Update the appropriate number variable
    if (!operator) {
        firstNumber = display.value;
    } else {
        secondNumber = display.value;
    }
}

//Round result to avoid overflow
function roundResult(result) {
    return Math.round(result * 100000) / 100000;
}

//Event listeners
numberButtons.forEach(button => {
    button.addEventListener('click', () => HandleNumberClick(button.textContent));
});

operatorButtons.forEach(button => {
    button.addEventListener('click', () => handleOperatorClick(button.textContent));
});

equalsKey.addEventListener('click', handleEqualsclick);
clearButton.addEventListener('click', handleClearClick);
deleteButton.addEventListener('click', handleDeleteClick);
decimalButton.addEventListener('click', handleDecimalClick);