class Calc{
    constructor(previousNumberElement, currentNumberElement){
        this.previousNumberElement = previousNumberElement;
        this.currentNumberElement = currentNumberElement;
        this.clear();
    }

    clear() {
        this.currentNumber = '';
        this.previousNumber = '';
        this.operation = undefined;
    }
    
    delete() {
        this.currentNumber = this.currentNumber.toString().slice(0, -1);
    }

    appendNumber(number) {
        if(number === '.' && this.currentNumber.includes('.')) return
        this.currentNumber = this.currentNumber.toString() + number.toString();
    }

    chooseOperation(operation) {
        if(this.currentNumber === '') return;
        if(this.previousNumber !== ''){
            this.calculate()
        }
        this.operation = operation;
        this.previousNumber = this.currentNumber;
        this.currentNumber = ''
    }

    calculate() {
        let result;
        const previous = parseFloat(this.previousNumber)
        const current = parseFloat(this.currentNumber)
        if(isNaN(previous) || isNaN(current)) return;
        switch (this.operation) {
            case '+':
                result = previous + current;
                break;
            case '-':
                result = previous - current;
                break;
            case 'x':
                result = previous * current;
                break;   
            case '÷':
                result = previous / current;
                break;
            default:
                return;
        }
        this.currentNumber = result;
        this.previousNumber = '';
        this.operation = undefined;
    }

    displayNumber(number){
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay;
        if(isNaN(integerDigits)){
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits: 0});
        }
        if(decimalDigits != null){
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay;
        }
    }

    updateDisplay() {
        this.currentNumberElement.innerText = this.displayNumber(this.currentNumber)
        if(this.operation != null){
            this.previousNumberElement.innerText = `${this.displayNumber(this.previousNumber)} ${this.operation}`;
        } else {
            this.previousNumberElement.innerText = '';
        }
    }
}

const numberKeys = document.querySelectorAll('[data-number]');
const operationKeys = document.querySelectorAll('[data-operation]');
const equalsKey = document.querySelector('[data-equals]');
const deleteKey = document.querySelector('[data-delete]');
const clearKey = document.querySelector('[data-clear]');
const previousNumberElement = document.querySelector('[data-previous-number]');
const currentNumberElement = document.querySelector('[data-current-number]');

const calc = new Calc(previousNumberElement,currentNumberElement);

numberKeys.forEach(number => {
    number.addEventListener('click', () => {
        calc.appendNumber(number.innerText);
        calc.updateDisplay();
    })
})

operationKeys.forEach(operation => {
    operation.addEventListener('click', () => {
       calc.chooseOperation(operation.innerText);
       calc.updateDisplay();
    })
})

equalsKey.addEventListener('click', () => {
    calc.calculate()
    calc.updateDisplay();
})

clearKey.addEventListener('click', () => {
    calc.clear()
    calc.updateDisplay();
})

deleteKey.addEventListener('click', () => {
    calc.delete()
    calc.updateDisplay();
})