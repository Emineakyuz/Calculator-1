class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement ) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }

clear() {
    this.currentOperand = ''
    this.previousOperand = ''
    this.operation = undefined
}

delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1)
}
 //  "0" == 0 dogru sadece icerige bakar    "0"===0 yanlis tipinede bakar//ekleme yapar
appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return
    this.currentOperand = this.currentOperand.toString() + number.toString()
}

chooseOperation(operation) {
    if (this.currentOperand === '') return
    if (this.previousOperand !== '') {
        this.compute()
    }
    this.operation = operation
    this.previousOperand = this.currentOperand
    this.currentOperand = ''
}

compute() {
    let computation
    const prev = parseFloat(this.previousOperand) // 2
    const current = parseFloat(this.currentOperand) // 4
    if (isNaN(prev) || isNaN(current)) return
    switch (this.operation) {
        case '+':
            computation = prev + current // 6
            break
        case '-':
            computation = prev - current
            break
        case '*':
            computation = prev * current
            break
        case '/':
            computation = prev / current
            break
        default:
            return
    }
    this.currentOperand = computation
    this.operation = undefined
    this.previousOperand = ''
}
getDisplayNumber(number) {
    const stringNumber = number.toString() // "5.2 . 5"
    const integerDigits = parseFloat(stringNumber.split('.')[0]) // 5
    const decimalDigits = stringNumber.split('.')[1] // 2
    let integerDisplay
    if (isNaN(integerDigits)) {
        integerDisplay = ''
    } else {
        integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
    }
    if (decimalDigits != null) {
        return `${integerDisplay}.${decimalDigits}` // 5.2
    } else {
        return integerDisplay // 5
    }
}

updateDisplay() {
    this.currentOperandTextElement.innerText =
        this.getDisplayNumber(this.currentOperand)
    if (this.operation != null) {
        this.previousOperandTextElement.innerText =
            `${this.getDisplayNumber(this.previousOperand)} ${this.operation}` // 5.2+
    } else {
        this.previousOperandTextElement.innerText = '' 
    }
}

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()

    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()

    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})
