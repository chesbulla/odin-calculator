//GLOBAL VARIABLES

//for delete button to know where to go back to
let inputs = [];


// everytime an equation is successfully done we reset this equation object
let equation = {
    a: "",
    b: "",
    operator: ""
}; 

operatorDict = {"add": "+",
                "subtract": "-",
                "multiply": "x",
                "divide": "÷",
                "": ""

};





function add(a,b) {
    return Number(a) + Number(b);
}

function subtract(a,b){
    return Number(a) - Number(b);
}

function multiply(a,b){
    return Number(a) * Number(b);
}

function divide(a,b){
    return Number(a) / Number(b);
}





function parseInput(key){
    
    //if the key pressed is equals, we evaluate the equation
    //if the key pressed is an operator, equation.a will take this value
    
    key = key.split("btn-")[1];
    if (key === "decimal") key = ".";
    
    

    if (["0","1","2","3","4","5","6","7","8","9","."].includes(key)){
        if (equation.operator === "") {
            
            equation.a += key;
            if (key === ".") { //check to prevent duplicate decimal points
                if (!checkValidNumber(equation.a)){
                    equation.a = equation.a.slice(0, equation.a.length-1);
                }
            }
        }
        else {
            equation.b += key;
            if (key === ".") { //check to prevent duplicate decimal points
                if (!checkValidNumber(equation.b)){
                    equation.b = equation.b.slice(0, equation.b.length-1);
                }
            }
        }

        updateDisplay();

    }

    if (["equals"].includes(key)) {
        //calculate result
        if (checkValidEquation()){
            let result = calculateResult();
            updateEquation(result);
            updateDisplay();
        } else {
            //do nothing

        }
        

    }

   
    if (["ac"].includes(key)) {
        resetCalculator();
    }

    if (["add", "divide", "subtract", "multiply"].includes(key)) {

        //if there is an old equation evaluate that first
        if (equation.a !== "" && equation.b !== ""){
            let result = calculateResult();
            updateEquation(result);
            equation.operator = key;
            updateDisplay();
        } else {
            equation.operator = key;
            updateDisplay();


        }
        




    }

    if (["del"].includes(key)){
        deleteKey();
        updateDisplay();


    }

}

function deleteKey(){
    let display = document.querySelector(".calculator-display");
    let textArr = display.textContent.split(" "); //will always contain three elements
    //index 0 is equation.a, index 1 is operator, index 2 is equation.b

    let a = textArr[0];
    let operator = textArr[1];
    let b = textArr[2];

    if (b !== "") {
        equation.b = b.substring(0, b.length - 1);
        return;

    }

    if (operator !== ""){
        equation.operator = operator.substring(0, operator.length - 1);
        return;
    }

    if (a !== ""){
        equation.a = a.substring(0, a.length - 1);
        return;
    }


    




}




function updateEquation(result){
    equation.a = String(result);
    equation.b = "";
    equation.operator = "";

}




function resetCalculator(){
    equation = {
        a: "",
        b: "",
        operator: ""
    }; 

    let display = document.querySelector('.calculator-display');
    display.textContent = "0";

}


function checkValidNumber(str){
    const num = Number(str);
    return !isNaN(num) && typeof num === 'number' && str !== "";
}



function checkValidEquation(){
    if (checkValidNumber(equation.a) === false) return false;
    if (checkValidNumber(equation.b) === false) return false;
    if (equation.operator === "") return false;
    return true;

}






function calculateResult(){
    let result;
    if (checkValidEquation()){
        switch (equation.operator) {
            case "add":
                result = add(equation.a, equation.b);
                break;
                
            case "subtract":
                result = subtract(equation.a, equation.b);
                break;
            
            case "multiply":
                result = multiply(equation.a, equation.b);
                break;

            case "divide":
                result = divide(equation.a, equation.b);
                break;

            default:
                break;

        }

        return String(Math.round(result * 100) / 100);


    }

    

}



//updateDisplay should just display the current equation
function updateDisplay(){
    //everytime a key is pressed, the display has to update
    let display = document.querySelector(".calculator-display");
    display.textContent = String(equation.a) + 
                          " " +
                        String(operatorDict[equation.operator]) +
                        " " + 
                        String(equation.b);
    return;
}


function main(){
    //Add event listener to each button
    let btns = document.querySelectorAll("button");
    btns = [...btns];
    btns.map((item) => item.addEventListener("click", () => parseInput(item.id)));

}
main();















