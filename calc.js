//Odin Project calculator

//get dom elements
const buttons = document.querySelectorAll('button');
const undo = document.querySelector('.undo');           //revert
const menu = document.querySelector('.menu');           //future menu
const title = document.querySelector('.title');         //future change of calculator type
const content = document.querySelector('.content');
const history = document.querySelectorAll('.prev');

//globals
let first = null;
let second = null;
let operator = null;


//****** dev only ******
const CLEARSTORAGE = false;
//const CLEARSTORAGE = true;
if(CLEARSTORAGE){localStorage.clear();console.log("storage cleared");}
//****** dev only ******

//functions
//DISABLE SCROLL
function noflow () {
    document.body.style.overflow = "hidden";
    document.body.style.userSelect = "none";
    console.log("Scrollbars disabled");
  }

//clear the input content display
function clearContentDisplay() {
    console.log(content.textContent);
    content.textContent='';
  }

//clear the history display
function clearHistoryDisplay() {
    history.forEach(prev => {
    console.log(prev.textContent);
    prev.textContent='';
  });
}

//operate local storage of 'items' 
//initialise storage for array of items
function initialiseLocalStorage(items){
    //initialise to empty array or collect initial 'items' from local storage array
    items = JSON.parse(localStorage.getItem('items')) || [];
}

//store items
function storeLocal(items, item) {
    //add 'item' to local storage 'items' array
    items.push(item);
    //pass the item to local storage
    localStorage.setItem('items',JSON.stringify(items));
}

//get the stored object from storage by passing object key as string
//returns object value as json object - (exactly as initialise!)
function getStoredLocal(objectKeyStr) {
    //retrieve the items array - returns empty array if none
    objectValue = JSON.parse(localStorage.getItem(objectKeyStr)) || [];
    //return value as a 'JSON' object
    return objectValue;
}

//remove "item" (as string) from local storage
function removeLocal(items, item){
    items.localStorage.removeItem(item);
}

//clear the localstorage in its entirety!
//                          *************
function clearStorage() {
    localStorage.clear();
}

function validateInput(input){
    num = input;
    let test;
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
    let num = null;
    
    switch(id) {
        //handle numeric input
        case '0':           //input and display numeric input
        case '1':           //allow for decimal point to 1 place
        case '2':           //check first entry 
        case '3':           //then check for an operator
        case '4':           //then check for possible second operation
        case '5':           //calculate , display, repeat until equals
        case '6':           //add to history and display recent history
        case '7':
        case '8':
        case '9': {
            num = parseFloat(id);
            validateInput(num);
            break;
        }

        //handle header buttons
        case 'undo':            //undo last operation where possible
        case 'menu':            //??
        case 'title':           //change calculator i.e basic -> future other ?? 
        {
            console.log(`action header button ${id}`);
            break;
        }

        //handle input moderation
        case 'clr' :            //clear all input and history - i.e. reset
        case 'del':             //delete last input
        case 'sign':            //change input sign
        {
            console.log(`alter input id ${id}`);
            break;
        }

        //handle maths operations
        case 'divide':          //implement math functions
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