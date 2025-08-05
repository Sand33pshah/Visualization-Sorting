// script.js
const arrayContainer = document.getElementById('array-container');
const generateButton = document.getElementById('generate');
const sortButton = document.getElementById('sort');
const algorithmSelect = document.getElementById('algorithm');
const arraySizeInput = document.getElementById('arraySize');
const sortSpeedInput = document.getElementById('sortSpeed');
const arraySizeValue = document.getElementById('arraySizeValue');
const sortSpeedValue = document.getElementById('sortSpeedValue');

let array = [];
let sortSpeed = 50; // Initial speed

function generateArray(size = 50) {
    array = [];
    arrayContainer.innerHTML = '';
    for (let i = 0; i < size; i++) {
        array.push(Math.floor(Math.random() * 300) + 10);
    }
    renderArray();
}

function renderArray() {
    arrayContainer.innerHTML = '';
    const containerWidth = arrayContainer.offsetWidth;
    const barWidth = (containerWidth / array.length) - 2; // Subtract margin

    array.forEach(value => {
        const bar = document.createElement('div');
        bar.classList.add('bar');
        bar.style.height = `${value}px`;
        bar.style.width = `${barWidth}px`;
        arrayContainer.appendChild(bar);
    });
}

async function bubbleSort() {
    const bars = document.querySelectorAll('.bar');
    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            bars[j].style.backgroundColor = 'yellow';
            bars[j + 1].style.backgroundColor = 'yellow';
            await new Promise(resolve => setTimeout(resolve, sortSpeed));
            if (array[j] > array[j + 1]) {
                let temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;
                bars[j].style.height = `${array[j]}px`;
                bars[j + 1].style.height = `${array[j + 1]}px`;
            }
            bars[j].style.backgroundColor = 'steelblue';
            bars[j + 1].style.backgroundColor = 'steelblue';
        }
    }
}

async function selectionSort() {
    const bars = document.querySelectorAll('.bar');
    for (let i = 0; i < array.length - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < array.length; j++) {
            bars[j].style.backgroundColor = 'yellow';
            await new Promise(resolve => setTimeout(resolve, sortSpeed));
            if (array[j] < array[minIndex]) {
                minIndex = j;
            }
            bars[j].style.backgroundColor = 'steelblue';
        }
        if (minIndex !== i) {
            bars[i].style.backgroundColor = 'red';
            bars[minIndex].style.backgroundColor = 'red';
            await new Promise(resolve => setTimeout(resolve, sortSpeed * 2));

            let temp = array[i];
            array[i] = array[minIndex];
            array[minIndex] = temp;

            bars[i].style.height = `${array[i]}px`;
            bars[minIndex].style.height = `${array[minIndex]}px`;
            await new Promise(resolve => setTimeout(resolve, sortSpeed * 2));
            bars[i].style.backgroundColor = 'steelblue';
            bars[minIndex].style.backgroundColor = 'steelblue';
        }
    }
}

async function insertionSort() {
    const bars = document.querySelectorAll('.bar');
    for (let i = 1; i < array.length; i++) {
        let currentVal = array[i];
        let j = i - 1;
        bars[i].style.backgroundColor = 'yellow';
        while (j >= 0 && array[j] > currentVal) {
            bars[j].style.backgroundColor = 'red';
            await new Promise(resolve => setTimeout(resolve, sortSpeed));
            array[j + 1] = array[j];
            bars[j + 1].style.height = `${array[j]}px`;
            j--;
        }
        array[j + 1] = currentVal;
        bars[j + 1].style.height = `${currentVal}px`;

        for(let k = 0; k<=i; k++){
            bars[k].style.backgroundColor = 'steelblue';
        }

    }
}

generateButton.addEventListener('click', () => {
    generateArray(parseInt(arraySizeInput.value));
});

sortButton.addEventListener('click', async () => {
    const selectedAlgorithm = algorithmSelect.value;
    sortButton.disabled = true;
    generateButton.disabled = true;

    if (selectedAlgorithm === 'bubble') {
        await bubbleSort();
    } else if (selectedAlgorithm === 'selection') {
        await selectionSort();
    } else if (selectedAlgorithm === 'insertion') {
        await insertionSort();
    }

    sortButton.disabled = false;
    generateButton.disabled = false;
});

arraySizeInput.addEventListener('input', () => {
    arraySizeValue.textContent = arraySizeInput.value;
    generateArray(parseInt(arraySizeInput.value));
});

sortSpeedInput.addEventListener('input', () => {
    sortSpeed = parseInt(sortSpeedInput.value);
    sortSpeedValue.textContent = sortSpeed + " ms";
});

generateArray();