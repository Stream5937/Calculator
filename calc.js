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
let keysEntered = '';       //empty string to store seqence of keyed entries used to build values
let valuesEntered = [];     //empty array to store possible three entered values [first, operator, second]
let numLength = 0;          //to enable check the entered num value no longer than content display length
let decimal = false;        // no decimal yet
let lastValueWasOperator = false;
let result = 0;

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

//action local storage of 'items' 
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

//validate floating point numeric input
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
        content.textContent='Input Error';
    }
    if(second == null && first == null) {
        first = num;
        valuesEntered.push(first);
        console.log(`test: ${test}, first: ${first}, second: ${second}.`);
        content.textContent ='';
        content.textContent = valuesEntered[0].toString();
    }else{
        // console.log(`at else`);
        // console.log(`at-else-test: ${test}, first: ${first}, second: ${second}.`);
        // let type = typeof first;
        // console.log(`type of first ${type}`)
        if((second === null) && !(first === null)) {
            second = num;
            valuesEntered.push(second);
            console.log(`-test: ${test}, first: ${first}, second: ${second}.`);
            console.log(`values: ${valuesEntered[0]}, ${valuesEntered[1]}, ${valuesEntered[2]}`);
            content.textContent ='';
            content.textContent = valuesEntered[0].toString()+' '+valuesEntered[1].toString()+' '+valuesEntered[2].toString();
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
function operate ( firstVal, operator, secondVal){
    console.log(`operate on ${firstVal}, ${operator}, ${secondVal}`);
    //const operators = ['bracket', 'order', 'divide', 'multiply', 'add', 'subtract'];
    const result = null;
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
        case '/':{
            console.log('dividing');
            return divide(firstVal,secondVal);
        }
        case '*':{
            console.log('multiplying');
            return multiply(firstVal, secondVal);
        }
        case '+':{
            console.log('adding');
            return add(firstVal, secondVal);
        }
        case '-':{
            console.log('subtracting');
            return subtract(firstVal,secondVal);
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
            num = parseInt(id);
            keysEntered += num;
            console.log(keysEntered);
            console.log(`last was operator ${lastValueWasOperator}`);
            if(lastValueWasOperator){
                validateInput(parseFloat(keysEntered));
            }else{
                content.textContent= '';
                content.textContent= keysEntered;
            }
            //validateInput(num);
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
            modifyInput(id);
            break;
        }

        //handle decimal point
        case'dp': {
            console.log(`decimal point ${id}`);
            //check no dp already
            //if(! keysEntered.includes('.')){
            if(!decimal){
                //flag decimal true
                decimal = true;
                keysEntered += '.';
                //log the length of keysEntered string including dp
                //for later check value no more than content display width
                numLength = keysEntered.length;
            }
            break;
        }

        //handle maths operations   (changed now just symbols 09/02/24)
        case '/':          //implement math functions
        case '*':
        case '-':
        case '+':{
            console.log(`action operator ${id}`);
            //operator indicates end of first input
            if(first === null){
                //so save first input number value
                validateInput(parseFloat(keysEntered));
            }
           ///// valuesEntered.push(keysEntered);
            //empty the keysEntered string ready for second number value
            keysEntered = '';
            //store the operator
            valuesEntered.push(id);
            //log it
            lastValueWasOperator = true;
            content.textContent ='';
            content.textContent = valuesEntered[0].toString()+' '+valuesEntered[1].toString();
            break;
        }

        case '=': {
            obtainResult();
            //console.log('#.. = ${result}');
            //content.textContent=result;
            break;
        }

        //error possibly never reached
        console.log(`error id ${id}`);

    }

}

//modify input
function modifyInput(id){
    let revStr='';
    switch(id){
        case 'clr': {
            console.log('clr');
            content.textContent='';
            keysEntered = '';
            valuesEntered = [];
            numLength = 0;
            decimal = false;
            lastValueWasOperator=false;
            first = null;
            second = null;
            operator = null;
            result = 0;
            break;
        }
        case 'del': {
            console.log('del');
            if(lastValueWasOperator){
                lastValueWasOperator = false;
                valuesEntered[1]='';
            }else{
                revStr = keysEntered.slice(0,keysEntered.length-1);
                keysEntered = '';
                console.log('@.. ' + keysEntered);
                keysEntered = revStr;
                content.textContent= '';
                //setTimeout(()=>{}, 5000);
                console.log('#.. ' + keysEntered);
                content.textContent= keysEntered;
            }
            break;
        }
        case 'sign':{
            let currentSign = keysEntered.slice(0,1);
            console.log(keysEntered, currentSign);
            if(currentSign === '-'){
                revStr=keysEntered.replace('-','+');
                keysEntered ='';
                keysEntered= revStr;
                console.log(keysEntered);
            }else{
                keysEntered = '-'+ keysEntered;
                console.log(keysEntered);
            }
            break;
        }
    }
}

function obtainResult() {
    console.log(`result : ${result}`);
    console.log(`operate( ${valuesEntered[0]}, ${valuesEntered[1]}, ${valuesEntered[2]})`);
    console.log(typeof valuesEntered[0]);
    console.log(typeof valuesEntered[1]);
    console.log(typeof valuesEntered[2]);
    result =  operate(valuesEntered[0], valuesEntered[1], valuesEntered[2]);
    console.log(`result : ${result}`);
    content.textContent=result;
    resetValues();
}

function resetValues(){
    //content.textContent='';
    keysEntered = '';
    valuesEntered = [];
    numLength = 0;
    decimal = false;
    lastValueWasOperator=false;
    first = result;
    valuesEntered.push(first);
    second = null;
    operator = null;
    result = 0;
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


//test code
