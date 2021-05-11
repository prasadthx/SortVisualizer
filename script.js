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