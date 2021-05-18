const slider= document.getElementById("myRange");

const dataBox = document.getElementById('DataBox');

// function createFlexArray(count) {
//     for(let i=0; i < count; i++) {
//         dataBox.innerHTML += <div>Scam</div>
//     }
// }
let barArray = [];

slider.oninput = () => {
    let index = slider.value;
    let randomInt;
    barArray = [];
    for(let i=0; i < index; i++) {
        barArray[i] = [i, `<div class='dataBar'> <div  style='flex: ${1- (i+1)/index}'></div> <div class='insideDataBox' style='flex: ${(i+1)/index}'> ${(i+1)} </div> </div>`]
    }
    barArray = shuffleArray(barArray);
    dataBox.innerHTML = "";
    for(let i=0; i < index; i++) {
        dataBox.innerHTML += barArray[i][1];
    }
};


function shuffleArray(array) {
    return array.sort( ()=>Math.random()-0.5 );
}

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

function displaySortedBar(){
    dataBox.innerHTML = "";
    for(let i=0; i < slider.value; i++) {
        dataBox.innerHTML += barArray[i][1];
    }
}

async function BubbleSort(array) {
    console.log(array[0][0]);
    let arrayLength = array.length;
    let temp;
    for(let i=0; i < arrayLength; i++) {
        for(let j=1; j < (arrayLength - i); j++) {
            if(array[j - 1][0] > array[j][0]){
                temp = array[j - 1];
                array[j - 1] = array[j];
                array[j] = temp;

                await sleep(50);
                displaySortedBar();
            }
        }
    }
}

async function InsertionSort(array) {
    let arrayLength = array.length;
    let compareElement, temp, j;
    for(let i=1; i < arrayLength; i++) {
        compareElement = array[i]
        for(j=i; j > 0; j--){
            if(array[j - 1][0] < compareElement[0]){
                break;
            }
            array[j] = array[j - 1];
            await sleep(50);
            displaySortedBar();
        }
        array[j] = compareElement
        await sleep(50);
        displaySortedBar();
    }
}

async function SelectionSort(array){
    let arrayLength = array.length;
    let compareElement, minValue, minPosition;
    for (let i = 0; i < arrayLength; i++){
        compareElement = array[i];
        minValue = compareElement[0];
        minPosition = i;
        for(let j = i + 1; j < arrayLength; j++){
            if(array[j][0] < minValue){
                minPosition = j;
                minValue = array[j][0];
            }
        }
        array[i] = array[minPosition];
        array[minPosition] = compareElement;
        await sleep(50);
        displaySortedBar();
    }
}

async function QuickSort(array, low, high){
    let pivotElement = array[low - 1],
        upperLimit = high,
        lowerLimit = low,
        temp;

    if( (high - low) === 0 ){
        if(array[low][0] < pivotElement[0]){
            array[low - 1] = array[low];
            array[low] = pivotElement;
        }
        return;
    }

    while(low <= high){
        while( array[low][0] < pivotElement[0] ){
            low++;
            if( !(low < high)){
                break;
            }
        }
        while(array[high][0] > pivotElement[0] ){
            high--;
            if( !(low < high)){
                break;
            }
        }
        if( !(low <= high)){
            break;
        }
        //await sleep(300);
        temp = array[low];
        array[low] = array[high];
        array[high] = temp;
    }
    //await sleep(300);
    temp = array[high];
    array[high] = pivotElement;
    array[lowerLimit - 1] = temp;

    //await sleep(300);


    if(lowerLimit !== high && high - lowerLimit >= 1){
        await QuickSort(array, lowerLimit, high - 1);
    }

    if(upperLimit !== high && upperLimit - high > 1){
        await QuickSort(array, high + 2, upperLimit);
    }
    await sleep(300);
    displaySortedBar();
}

let DummyArray;

const merge = (array, low, mid, high) => {
    DummyArray = [];
    let i = low, j = mid + 1, k = 0;
    while(i <= mid && j <= high){
        if(array[j][0] > array[i][0]){
            DummyArray[k] = array[i];
            i++;
        }
        else{
            DummyArray[k] = array[j];
            j++;
        }
        k++;
    }
    while(i <= mid){
        DummyArray[k++] = array[i++];
    }
    while(j <= high){
        DummyArray[k++] = array[j++];
    }
    for(i = low, j = 0; i <= high; i++, j++) {
        array[i] = DummyArray[j];
    }
}

async function MergeSort(array, low, high) {
    let mid;
    if(low < high){
        mid = Math.floor((low + high) / 2);
        await MergeSort(array, low, mid);
        await MergeSort(array, mid + 1, high);
        merge(array, low, mid, high)
        await sleep(200);
        displaySortedBar();
    }
}

async function ShellSort(array){
    let arrayLength = array.length,
        temp;
    for(let gap = Math.floor(arrayLength / 2); gap >= 1; gap = Math.floor(gap/2)){
        for(let i = gap; i < arrayLength ; i++ ){
            temp = array[i];
            let j;
            for(j = i; j - gap >= 0 && array[j - gap][0] > temp[0]; j = j - gap  ) {
                array[j] = array[ j - gap];
            }
            array[j] = temp;
            await sleep(100);
            displaySortedBar();
        }
    }
}

async function CountingSort(array) {
    console.log(array);
    let arrayLength = array.length;
    let max = array[0];
    let sortedArray = [],
        countingArray = [];
    for(let i = 1; i < arrayLength; i++){
        if(array[i][0] > max[0]){
            max = array[i];
        }
    }

    for(let i = 0; i <= max[0] ; i++){
        countingArray[i] = 0;
    }
    for(let i = 0; i < arrayLength ; i++){
        countingArray[array[i][0]] += 1
    }
    for(let i = 1; i <= max[0] ; i++){
        countingArray[i] += countingArray[i - 1];
    }
    console.log(countingArray);

    for(let i = arrayLength - 1; i >= 0 ; i--){
        sortedArray[countingArray[array[i][0]] - 1] = array[i];
        countingArray[array[i]]--;
    }
    for(let i = 0; i < arrayLength; i++) {
        array[i] = sortedArray[i];
    }
    await sleep(100)
    displaySortedBar();
}
