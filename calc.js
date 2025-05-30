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
let delkeys = '';           //saved keysEntered if need to adjust
let valuesEntered = [];     //empty array to store possible three entered values [first, operator, second]
let numLength = 0;          //to enable check the entered num value no longer than content display length
let decimal = false;        // no decimal yet
let lastValueWasOperator = false;
let result = 0;
let historicEntries = []; // empty array for result objects objects
/*nb historic entry from result obj
const resultObj = {
        'result' : result,
        'first' : valuesEntered[0],
        'operator': valuesEntered[1],
        'second': valuesEntered[2]
    }
*/

/*
//****** dev only ******
const CLEARSTORAGE = false;
//const CLEARSTORAGE = true;
if(CLEARSTORAGE){localStorage.clear();console.log("storage cleared");}
//****** dev only ******
*/
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
/*
function updateHistories(){
    let count = 3;
    for(count; count < 0; count--){
        if(count> 0){
            historicEntries[count] = historicEntries[count-1];
        }
        if(count == 0){
            historicEntries[count] = null;
        }
       */ /*
        if(count == 0){
            historicEntries[count] = historicEntries[count+3];
        }
        *//*
    }
}
*/
//show the history display
function showHistory() {
    clearHistoryDisplay();
    let count = historicEntries.length - 4;
    if(count < 0){count = 0;}
    let currentEntry;
    history.forEach(prev => {
        if(count < historicEntries.length){
            currentEntry = historicEntries[count++] ;
            prev.textContent = `${currentEntry.first} ${currentEntry.operator} ${currentEntry.second} = ${currentEntry.result} ` ; 
            console.log(prev.textContent);
        }
  });
}

/* LOCAL STORAGE NOT NEEDED
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
*/
//validate floating point numeric input
function validateInput(input){
    num = input;
    let test;
 
    if(second == null && first == null) {
        first = num;
        valuesEntered.push(first);
        setContent(valuesEntered[0].toString());
        //reset decimal flag
        decimal = false;
    }else{
               if((second === null) && !(first === null)) {
            second = num;
            valuesEntered.push(second);
            setContent(valuesEntered[0].toString()+' '+valuesEntered[1].toString()+' '+valuesEntered[2].toString());
            //reset decimal flag
            decimal = false;
        }
    }

}

//add two numbers and return result
function add (a, b) {
   // console.log(a + b)
    return a + b;
}

//subtract two numbers and return result
function subtract (a, b) {
   // console.log(a - b)
    return a - b;
}

//multiply two numbers and return result
function multiply (a, b) {
   // console.log(a * b)
    return a * b;
}

//divide two numbers and return result
function divide (a, b) {
    //console.log(a / b)
    return (a / b);
}

//apply the selected operator to first and second numbers
function operate ( firstVal, operator, secondVal){
   // console.log(`operate on ${firstVal}, ${operator}, ${secondVal}`);
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
            if(secondVal === 0) {
               return firstVal;
            }else{
                return divide(firstVal,secondVal);
            }
        }
        case '*':{
            //console.log('multiplying');
            return multiply(firstVal, secondVal);
        }
        case '+':{
            //console.log(`adding ${first}, ${second}`);
            return add(firstVal, secondVal);
        }
        case '-':{
            //console.log('subtracting');
            return subtract(firstVal,secondVal);
        }
    }
}

function btnClicked(id) {
    //console.log(`at btnClicked() id is: ${id}`);
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
           if(lastValueWasOperator){
                setContent(`${valuesEntered[0]} ${valuesEntered[1]} ${keysEntered}`);
            }else{
                if(valuesEntered[0]== undefined){
                    setContent(keysEntered);
                }else{
                    //remember key just entered
                    let temp = keysEntered;
                    //clear everything but history and restart
                    //console.log('clr all but except history' );
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
                    //reinstate just entered key
                    keysEntered = temp;
                    setContent(keysEntered); 
                }
           }
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
            modifyInput(id);
            break;
        }

        //handle decimal point
        case'dp': {
            if(!decimal){
                //flag decimal true
                decimal = true;
                keysEntered = keysEntered+'.';
                //log the length of keysEntered string including dp
                //for later check value no more than content display width
                numLength = keysEntered.length;
                if(lastValueWasOperator){
                    //must be second value
                    setContent(`${valuesEntered[0].toString()} ${valuesEntered[1].toString()} ${keysEntered}`);
                }else{
                    //must be first value
                    setContent(keysEntered);
                }
            }
            break;
        }

        //handle maths operations   (changed now just symbols 09/02/24)
        case '/':          //implement math functions
        case '*':
        case '-':
        case '+':{
            //don't accept another if altready entered an operator
            if(lastValueWasOperator ){ 
                //then just complete by reset of id -> equals  
                id = '=';
            }else{
                //operator indicates end of first input
                if(first === null){
                    //so save first input number value
                    validateInput(parseFloat(keysEntered));
                }
                //remember keysEntered for 'del' action
                keysEntered = keysEntered+id;
                delkeys = keysEntered.slice(0) ;     //a copy
                console.log(`keysEntered -> ${keysEntered}, delKeys = ${delkeys}`);
                //empty the keysEntered string ready for second number value
                keysEntered = '';
                //store the operator
                valuesEntered.push(id);
                operator = id;
                //log it
                lastValueWasOperator = true;
                if((id === '/') && (valuesEntered[2] === 0) ){setContent('#Division by zero error#');}
                else{
                    setContent(valuesEntered[0].toString()+' '+valuesEntered[1].toString());
                }
                break;
            }
            
        }

        case '=': {
            console.log(lastValueWasOperator);
            //have we had an operator 
            if(lastValueWasOperator){
                console.log("at337");
                //do we have a value
                if(!(keysEntered === '')){
                    console.log("at340");
                    console.log(keysEntered);
                    //store the last value
                    valuesEntered.push(parseFloat(keysEntered));
                    //reset decimal flag
                    decimal = false;
                    //display expression
                    //check for division by zero error
                    if((valuesEntered[1] === '/') && (valuesEntered[2] === 0 )){
                        setContent('Division by zero error!');
                        valuesEntered[2] = null;
                    }else{
                        validateInput(parseFloat(keysEntered));
                        obtainResult();
                        //cancel previous
                        lastValueWasOperator = false;
                    }
                }
            }

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
            clearHistoryDisplay();
            historicEntries.length = 0;
            break;
        }
        case 'del': {
                console.log(`keysEntered = ${keysEntered}`);
                let cutStr = keysEntered.slice(0,1); // first char
                revStr = keysEntered.slice(0,keysEntered.length-1); // the rest
                console.log(`cutStr = ${cutStr} , revStr = ${revStr}`);
                //check if just deleted decimal point and reset
                if( keysEntered.includes('.') && (!(revStr.includes('.'))) ){decimal = false;}
                //check if just deleted operator and reset
                if(( cutStr.includes('+' || '-') || '/' || '*')
                        && (operator === cutStr )) {
                            lastValueWasOperator = false;
                            valuesEntered[1]='';
                    }
                keysEntered = '';
                keysEntered = revStr;
                setContent(keysEntered);
            
            break;
        }
        case 'sign':{
            //are we changing first or second value
            console.log(`445 - first is ${first} second is ${second} !`);
            let currentSign = keysEntered.slice(0,1);
            console.log('448' + keysEntered +', '+ currentSign);
            if(currentSign === '-'){
                revStr=keysEntered.replace('-','+');
                keysEntered ='';
                keysEntered= revStr;
            }else{
                keysEntered = '-'+ keysEntered;
                content.textContent = keysEntered;
            }
            if(first === null){
                setContent(keysEntered);
            }
            if((!(first === null))&&(operator === null)){
                valuesEntered[0]= valuesEntered[0]*-1;  // + -> - or - -> +
                setContent(valuesEntered[0].toString());
            }else{
                if(!(valuesEntered[0] === (null || undefined) ) && !(valuesEntered[1]=== (null || undefined))){
                    const temp0 = valuesEntered[0].toString();
                    const temp1 = valuesEntered[1].toString();
                    setContent(`${temp0} ${temp1} ${keysEntered}`);
                }
            }
            break;
        }
    }
}

function obtainResult() {
    result =  operate(valuesEntered[0], valuesEntered[1], valuesEntered[2]);
    //avoid rounding errors to many dec places
    result = parseFloat(result.toFixed(6)); //6 dec places
    const resultObj = {
        'result' : result,
        'first' : valuesEntered[0],
        'operator': valuesEntered[1],
        'second': valuesEntered[2]
    }
    historicEntries.push(resultObj);
    content.textContent=result;
    setContent(result.toString());
    showHistory();
    resetValues();
}

function resetValues(){
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

function setContent(text){
    if(text.length > 16){
        content.style.fontSize= '20px';
    }else{
        content.style.fontSize= '40px';
    }
    content.textContent = text;
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

