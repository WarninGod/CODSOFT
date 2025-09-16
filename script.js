
const display = document.getElementById('display');
let history = [];

function toggleHistory() {
    const panel = document.getElementById('history-panel');
    const backdrop = document.getElementById('history-backdrop');
    
    if (panel.classList.contains('open')) {
        // Close the panel
        panel.classList.remove('open');
        backdrop.classList.remove('show');
    } else {
        // Open the panel
        panel.classList.add('open');
        backdrop.classList.add('show');
    }
}

function addToHistory(expression, result) {
    if (expression.trim() === '') return;
    history.unshift(`${expression} = ${result}`);
    if (history.length > 10) history.pop();
    renderHistory();
}

function renderHistory() {
    const list = document.getElementById('history-list');
    if (!list) return;
    list.innerHTML = '';
    history.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        list.appendChild(li);
    });
}

function appendToDisplay(value) {
    display.value += value;
}

function clearDisplay() {
    display.value = '';
}

function deleteLast() {
    display.value = display.value.slice(0, -1);
}

function calculate() {
    try {
        let expression = display.value.replace(/%/g, '/100');
        let result = eval(expression);
        let resultDisplay;
        if (result === Infinity || result === -Infinity || Number.isNaN(result)) {
            resultDisplay = 'undefined';
        } else {
            resultDisplay = result;
        }
        addToHistory(display.value, resultDisplay);
        display.value = resultDisplay;
    } catch {
        display.value = 'Error';
    }
}
