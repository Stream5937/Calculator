//Odin Project calculator

//globals
let first = 0;
let second = 0;
let operator = null;

//get dom elements


//functions
//DISABLE SCROLL
function noflow () {
    document.body.style.overflow = "hidden";
    document.body.style.userSelect = "none";
    console.log("Scrollbars disabled");
  }

//add two numbers and return result
function add (a, b) {
    console.log(a + b)
    return a + b;
}

//subtract two numbers and return result
function subtract (a, b) {
    console.log(a - b)
    return a - b;
}

//multiply two numbers and return result
function multiply (a, b) {
    console.log(a * b)
    return a * b;
}

//divide two numbers and return result
function divide (a, b) {
    console.log(a / b)
    return (a / b);
}

//apply the selected operator to first and second numbers
function operate ( first, second, operator){
    //const operators = ['bracket', 'order', 'divide', 'multiply', 'add', 'subtract'];
    const result = NaN;
    //if(operators.indexOf(operator,0)){}
    switch(operator){
        case 'bracket':{
            console.log("error - no implementation of bracket");
            return result;
        }
        case 'order':{
            console.log("error - no implementation of order");
            return result;
        }
        case 'divide':{
            return divide(first,second);
        }
        case 'multiply':{
            return multiply(first, second);
        }
        case 'add':{
            return add(first, second);
        }
        case 'subtract':{
            return subtract(first,second);
        }
    }
}

//add event listeners



//run code
noflow();