//GLOBAL VARIABLES
let inputs = [];

let equation = {
    a: null,
    b: null,
    operator: null
};



let total = 0;




function add(a,b) {
    return a + b;
}

function subtract(a,b){
    return a - b;
}

function multiply(a,b){
    return a * b;
}

function divide(a,b){
    return a / b;
}



function percentage(a){
    return a / 100;
}



function addInput(key){
    inputs.push(key);
}




function calculateResult(){

}




function updateDisplay(){




}











//Add event listener to each button
let btns = document.querySelectorAll("button");
btns = [...btns];
btns.map((item) => item.addEventListener("click", () => addInput(item.id)));



