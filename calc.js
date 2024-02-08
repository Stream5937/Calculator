//Odin Project calculator

//get dom elements
const buttons = document.querySelectorAll('button');
const undo = document.querySelector('.undo');           //revert
const menu = document.querySelector('.menu');           //future menu
const title = document.querySelector('.title');         //future change of calculator type

//globals
let first = null;
let second = null;
let operator = null;


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

function btnClicked(id) {
    console.log(`at btnClicked() id is: ${id}`);
    let num = NaN;
    let test;
    switch(id) {
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9': {
            num = parseFloat(id);
            console.log(`num is ${num}`);
            console.log(`->first: ${first}, second: ${second}.`);
            //for test
            //test=1;
            //first=null; second = null;
            //test=2;
            //first = 10; second = null;
            //test=3;
            //first = 10; second = 20;
            //console.log(`pretest: ${test}, first: ${first}, second: ${second}.`);
            if(!(second === null) && !(first === null)){
                console.log("Display input error");
            }
            if(second == null && first == null) {
                first = num;
                console.log(`test: ${test}, first: ${first}, second: ${second}.`);
            }else{
               // console.log(`at else`);
               // console.log(`at-else-test: ${test}, first: ${first}, second: ${second}.`);
               // let type = typeof first;
               // console.log(`type of first ${type}`)
                if((second === null) && !(first === null)) {
                    second = num;
                    console.log(`-test: ${test}, first: ${first}, second: ${second}.`);
                }
            }
            break;
        }

        case 'undo':
        case 'menu':
        case 'title': {
            console.log(`action header button ${id}`);
            break;
        }

        case 'clr' :
        case 'del':
        case 'sign': {
            console.log(`alter input id ${id}`);
            break;
        }

        case 'divide':
        case 'multiply':
        case 'subtract':
        case 'add':
        case 'dp': {
            console.log(`action operator ${id}`);
            break;
        }

        //possibly never reached
        console.log(`error id ${id}`);

    }

}


//add event listeners
buttons.forEach(function(button){
    button.addEventListener('click', e => { 
        console.log(`button: ${e.target.id}`); 
        btnClicked(e.target.id);
    });
});



//run code
noflow();