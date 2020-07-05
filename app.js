// selectors
class Calculator {
	constructor(previousOperandElement, currentOperandElement) {
		this.currentOperandElement = currentOperandElement;
		this.previousOperandElement = previousOperandElement;
		this.clear();
	}
	clear() {
		this.currentOperand = '';
		this.previousOperand = '';
		this.operation = undefined;
	}
	delete() {
		// prevryshtame go w str i go rejem do posledniq index (mahame poslednoto chislo)
		this.currentOperand = this.currentOperand.toString().slice(0, -1);
	}

	appendNum(number) {
		// to string
		if (number === '.' && this.currentOperand.includes('.')) return;
		this.currentOperand = this.currentOperand.toString() + number.toString();
	}

	chooseOperation(operation) {
		if (this.currentOperand === '') return;
		if (this.previousOperand !== '') {
			this.compute();
		}
		this.operation = operation;
		this.previousOperand = this.currentOperand;
		this.currentOperand = '';
	}

	compute() {
		let computation;
		const prev = parseFloat(this.previousOperand);
		const curr = parseFloat(this.currentOperand);
		if (isNaN(prev) || isNaN(curr)) return;
		switch (this.operation) {
			case '+':
				computation = prev + curr;
				break;
			case '-':
				computation = prev - curr;
				break;
			case '*':
				computation = prev * curr;
				break;
			case '÷':
				computation = prev / curr;
				break;
			// ако никоя от командите не съвпада
			default:
				return;
		}
		// izchislqva
		this.currentOperand = computation;
		// zanulqva
		this.operation = undefined;
		this.previousOperand = '';
	}
	getDisplayNuber(number) {
		const stringNumber = number.toString();
		const integerDigits = parseFloat(stringNumber.split('.')[0]);
		const decimalDigits = stringNumber.split('.')[1];
		const floatNumber = parseFloat(number);
		let integerDisplay;
		if (isNaN(integerDigits)) {
			integerDisplay = '';
		} else {
			integerDisplay = integerDigits.toLocaleString('en', {
				maximumFrationDigits: 0
			});
		}
		if (decimalDigits != null) {
			return `${integerDisplay}.${decimalDigits}`;
		} else {
			return integerDisplay;
		}
	}
	updateDisplay() {
		this.currentOperandElement.innerHTML = this.getDisplayNuber(this.currentOperand);

		if (this.operation != null) {
			this.previousOperandElement.innerHTML = `${this.getDisplayNuber(this.previousOperand)} ${this.operation}`;
		} else {
			this.previousOperandElement.innerHTML = '';
		}
	}
}

const numberButtons = document.querySelectorAll('.num');
const oparationButtons = document.querySelectorAll('.op');
const equalsButton = document.querySelector('.eq');
const deleteButton = document.querySelector('.del');
const allClearButton = document.querySelector('.ac');
const previousOperandElement = document.querySelector('.previous');
const currentOperandElement = document.querySelector('.current');

const calculator = new Calculator(previousOperandElement, currentOperandElement);

numberButtons.forEach((button) => {
	button.addEventListener('click', () => {
		calculator.appendNum(button.innerHTML);
		calculator.updateDisplay();
	});
});

oparationButtons.forEach((button) => {
	button.addEventListener('click', () => {
		calculator.chooseOperation(button.innerHTML);
		calculator.updateDisplay();
	});
});

equalsButton.addEventListener('click', (button) => {
	calculator.compute();
	calculator.updateDisplay();
});

allClearButton.addEventListener('click', (button) => {
	calculator.clear();
	calculator.updateDisplay();
});

deleteButton.addEventListener('click', (button) => {
	calculator.delete();
	calculator.updateDisplay();
});
