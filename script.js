let BAR_COUNT = 24;
let BAR_WIDTH = 500 / BAR_COUNT;
let values = [];
let states = [];

const COLORS = {
  RED: 'red',
  GREEN: 'green',
  BLACK: 'black',
}

const bubbleSortBtn = document.getElementById('bubble-sort-btn');
const selectionSortBtn = document.getElementById('selection-sort-btn');
const insertionSortBtn = document.getElementById('insertion-sort-btn');
const quickSortBtn = document.getElementById('quick-sort-btn');
const generateArrayBtn = document.getElementById('generate-array-btn');
const speedInput = document.getElementById('speed-input');
const arraySizeInput = document.getElementById('array-size-input');

let ANIMATION_SPEED = speedInput.value;

function disableMenu() {
  quickSortBtn.disabled = true;
  insertionSortBtn.disabled = true;
  selectionSortBtn.disabled = true;
  bubbleSortBtn.disabled = true;
  generateArrayBtn.disabled = true;
  speedInput.disabled = true;
  arraySizeInput.disabled = true;
}

function enableMenu() {
  quickSortBtn.disabled = false;
  insertionSortBtn.disabled = false;
  selectionSortBtn.disabled = false;
  bubbleSortBtn.disabled = false;
  generateArrayBtn.disabled = false;
  speedInput.disabled = false;
  arraySizeInput.disabled = false;
}

function enableGenerateButton() {
  generateArrayBtn.disabled = false;
}

function optionsChanged() {
  let speed = speedInput.value;
  if (speed > 500) {
    speedInput.value = 500;
    speed = 500;
  } else if (speed < 1) {
    speedInput.value = 1;
    speed = 1;
  }
  ANIMATION_SPEED = speed;

  if (BAR_COUNT != arraySizeInput.value) {
    let arraySize = arraySizeInput.value;
    if (arraySize > 100) {
      arraySizeInput.value = 100;
      arraySize = 100;
    } else if (arraySize < 3) {
      arraySizeInput.value = 3;
      arraySize = 3;
    }
    BAR_COUNT = arraySize;

    generateArray();

    console.log(BAR_COUNT);
  }
}

let isSortingOrSorted = false;

function generateArray() {
  values = new Array(floor(width / (500 / BAR_COUNT)));
  for (let i = 0; i < values.length; i++) {
    values[i] = random(height);
    states[i] = COLORS.BLACK;
  }
  enableMenu();
}

function setup() {
  createCanvas(500, 500);
  generateArray();
}

function draw() {
  const barWidth = 500 / BAR_COUNT;
  background(255);

  for (let i = 0; i < values.length; i++) {
    noStroke();
    if (states[i] == COLORS.RED) {
      fill(COLORS.RED);
    } else if (states[i] == COLORS.GREEN) {
      fill(COLORS.GREEN);
    } else {
      fill(COLORS.BLACK);
    }
    rect(i * barWidth, height - values[i] - 15, barWidth - 1, values[i]);

    if (values.length < 40) {
      if (values.length < 14)
        textSize(14);
      else if (values.length < 28)
        textSize(10);
      else if (values.length < 35)
        textSize(8);
      else
        textSize(6);
      
      text(Math.floor(values[i]), i * barWidth, 500);      
    } 
  }
}

async function swap(arr, a, b) {
  await sleep(ANIMATION_SPEED);
  let temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/*********  START OF QUICKSORT ALGORITHM  ***************/
async function quickSort(arr, start, end) {
  if (start >= end) {
    return;
  }
  let index = await partition(arr, start, end);
  states[index] = COLORS.BLACK;

  await Promise.all([
    quickSort(arr, start, index - 1),
    quickSort(arr, index + 1, end),
  ]);
}

async function partition(arr, start, end) {
  for (let i = start; i < end; i++) {
    states[i] = COLORS.GREEN;
  }

  let pivotValue = arr[end];
  let pivotIndex = start;
  states[pivotIndex] = COLORS.RED;
  for (let i = start; i < end; i++) {
    if (arr[i] < pivotValue) {
      await swap(arr, i, pivotIndex);
      states[pivotIndex] = COLORS.BLACK;
      pivotIndex++;
      states[pivotIndex] = COLORS.RED;
    }
  }
  await swap(arr, pivotIndex, end);

  for (let i = start; i < end; i++) {
    if (i != pivotIndex) {
      states[i] = COLORS.BLACK;
    }
  }

  return pivotIndex;
}
/*********  END OF QUICKSORT ALGORITHM  ***************/

/*******  START OF BUBBLE SORT ALGORITHM  *************/
async function bubbleSort() {
  for (let i = 0; i < values.length; i++) {
    for (let j = 0; j < values.length - i; j++) {
      states[j] = COLORS.RED; // Make the 1st value in the comparison one color
      states[j + 1] = COLORS.GREEN; // Make the 2nd value in the comparison another color
      const a = values[j]; // 1st value
      const b = values[j + 1]; // 2nd value to compare against
      if (a > b) {
        // Swap positions if righter value is smaller
        await swap(values, j, j + 1);
      }
      states[j] = COLORS.BLACK; // Reset color
      states[j + 1] = COLORS.BLACK;
    }
  }
}
/*******   END OF BUBBLE SORT ALGORITHM   *************/

/*********** START OF INSERTION SORT ALGORITHM ************/
async function insertionSort() {
  for (let i = 1; i < values.length; i++) {
    // Choosing the first element in our unsorted subarray
    let current = values[i];
    // The last element of our sorted subarray
    let j = i - 1;
    let temp = 0;
    while (j > -1 && current < values[j]) {
      values[j + 1] = values[j];
      temp = values[j];
      values[j] = current;
      states[j] = COLORS.GREEN;
      await sleep(ANIMATION_SPEED);
      states[j] = COLORS.BLACK;
      values[j] = temp;
      j--;
    }
    values[j + 1] = current;
  }
}
/*********** END OF INSERTION SORT ALGORITHM **************/


/********** START OF SELECTION SORT ALGORITHM **************/
async function selectionSort() {
    for(let i = 0; i < values.length; i++) {
        let smallest = i;
      
        for(let j = i+1; j < values.length; j++) {

          if(values[j] < values[smallest])
                smallest = j;            
        }
         
         if (smallest != i) {
           states[i] = COLORS.RED; 
           states[smallest] = COLORS.GREEN; 
           await swap(values, smallest, i);        
           states[i] = COLORS.BLACK; 
           states[smallest] = COLORS.BLACK;
         }
    }
}
/**********  END OF SELECTION SORT ALGORITHM  **************/

// Add onClick listeners to the buttons
generateArrayBtn.addEventListener('click', generateArray);
quickSortBtn.addEventListener('click', async () => {
  disableMenu();
  await quickSort(values, 0, values.length - 1);
  enableGenerateButton();
});
bubbleSortBtn.addEventListener('click', async () => {
  disableMenu();
  await bubbleSort();
  enableGenerateButton();
});
insertionSortBtn.addEventListener('click', async () => {
  disableMenu();
  await insertionSort();
  enableGenerateButton();
});
selectionSortBtn.addEventListener('click', async () => {
  disableMenu();
  await selectionSort();
  enableGenerateButton();
});
