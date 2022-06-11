'use strict';

const screen = document.querySelector('.calc__screen p');

let firstOperand = '';
let secondOperand = '';
let operation = '';
let finish = false;

const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
const actions = ['+', '-', 'x', '÷', 'x^y', 'y√x'];

function allClear() {
    firstOperand = '';
    secondOperand = '';
    operation = '';
    finish = false;
    screen.textContent = 0;
}

function percent() {
    if (firstOperand && !secondOperand) {
        firstOperand = firstOperand / 100;
        screen.textContent = firstOperand;
    }
    else if (firstOperand && secondOperand) {
        secondOperand = ((secondOperand / 100) * firstOperand).toFixed(3);
        screen.textContent = secondOperand;
    }
}

function square() {
    firstOperand = (firstOperand * firstOperand);
    screen.textContent = firstOperand;
}

function cube() {
    firstOperand = (firstOperand * firstOperand * firstOperand);
    screen.textContent = firstOperand;
}

function exp() {
    firstOperand = Math.exp(firstOperand);
    screen.textContent = firstOperand;
}

function ten_power_x() {
    firstOperand = Math.pow(10, firstOperand);
    screen.textContent = firstOperand;
}

function mult_inverse() {
    firstOperand = 1 / firstOperand;
    screen.textContent = firstOperand;
}

function square_root() {
    firstOperand = Math.sqrt(firstOperand);
    screen.textContent = firstOperand;
}

function cubic_root() {
    firstOperand = Math.cbrt(firstOperand);
    screen.textContent = firstOperand;
}

function ln() {
    firstOperand = Math.log(firstOperand);
    screen.textContent = firstOperand;
}

function log_10() {
    firstOperand = Math.log10(firstOperand);
    screen.textContent = firstOperand;
}

document.querySelector('.all-clear').addEventListener('click', allClear);
document.querySelector('.percent').addEventListener('click', percent);
document.querySelector('.square-num').addEventListener('click', square);
document.querySelector('.cube-num').addEventListener('click', cube);
document.querySelector('.exp-power').addEventListener('click', exp);
document.querySelector('.ten-power-x').addEventListener('click', ten_power_x);
document.querySelector('.mult-inverse').addEventListener('click', mult_inverse);
document.querySelector('.square-root').addEventListener('click', square_root);
document.querySelector('.cubic-root').addEventListener('click', cubic_root);
document.querySelector('.ln').addEventListener('click', ln);
document.querySelector('.log-10').addEventListener('click', log_10);
document.querySelector('.calc__buttons').addEventListener('click', (event) => {
    if (!event.target.classList.contains('btn')) return;

    const key = event.target.textContent;
    console.log(key);

    if (digits.includes(key)) {
        if (secondOperand === '' && operation === '') {
            firstOperand += key;
            screen.textContent = firstOperand;
            console.log(firstOperand, operation, secondOperand);
        }
        else if (firstOperand !== '' && secondOperand !== '' && finish) {
            secondOperand = key;
            finish = false;
            screen.textContent = secondOperand;
        }
        else {
            secondOperand += key;
            screen.textContent = secondOperand;
            console.log(firstOperand, operation, secondOperand);
        }
        return;
    }

    if (actions.includes(key)) {
        operation = key;
        screen.textContent = operation;
        console.log(firstOperand, operation, secondOperand);
        return;
    }

    if (key === '=') {
        if (secondOperand === '') firstOperand = secondOperand;
        switch (operation) {
            case "+":
                firstOperand = (+firstOperand) + (+secondOperand);
                break;
            case "-":
                firstOperand = firstOperand - secondOperand;
                break;
            case "x":
                firstOperand = firstOperand * secondOperand;
                break;
            case "÷":
                if (secondOperand === '0') {
                    screen.textContent = 'Error';
                    firstOperand = '';
                    secondOperand = '';
                    operation = '';
                    return;
                } 
                firstOperand = firstOperand / secondOperand;
                break;
            case "x^y":
                firstOperand = Math.pow(firstOperand, secondOperand);
                break;
            case "y√x":
                firstOperand = Math.pow(firstOperand, 1/secondOperand);
                break;
        }
        finish = true;
        screen.textContent = firstOperand;
    }
    if (key === '+/-') {
        if (screen.textContent === '0') {
            screen.textContent = '-0';
        }
        else if (screen.textContent === '-0') {
            screen.textContent = '0'
        }
        else if (firstOperand && !secondOperand) {
            firstOperand *= -1;
            console.log("First: " + firstOperand);
            screen.textContent = firstOperand;
        }
        else if (secondOperand) {
            secondOperand *= -1;
            console.log("Second: " + secondOperand);
            screen.textContent = secondOperand;
        }
    }
})