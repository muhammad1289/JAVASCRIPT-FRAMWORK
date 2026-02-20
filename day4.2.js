//++++++++++++++++++++++++++++++++++ JAVASCRIPT EXECUTION CONTEXT +++++++++++++++++++++++++++++++++++++++

// The execution context is the environment in which the JavaScript code is executed. 
// javascript execute code in two phases : at first phase it creates the global execution context and then put
//  itin the this keyword 
// the global ec of browser is different the window object and in node js environment it is the global object

// the 2nd phase is the function execution context 
        // it has 2 cycles : creation stage and execution stage
// we will understand the execution context with the help of an example of a simple code 
                          
                         // Global Execution will created and stored in the this keyword
let a = 10;    // firstly in creation stage a will be stored as undefined ,
let b = 20;    // UNDEFINED
function sum(num1, num2){   // at first only definition of function will be stored in the memory   
    let c = num1 + num2;    
    return c;
}
let result = sum(a,b);     // result = UNDEFINED 
let result2 = sum(30,40);  // result2 = UNDEFINED

        // now after creation cycle is completed , the execution cycle will start and the values will be
    //assigned to the variables and the functions will be executed and the result will be stored in variables 
                                            
      // IMPORTANT --> when whole func completed the return value will returned to parent execution context
    //and whenever a function is called a new execution context will be created for that function and whole 
    // process will be repeated (cretion , execution cycle) and after the function is executed the execution 
    // context will be destroyed and the control will be returned to the global execution context


//+++++++++++++++++++++++++++++++ CALL STACK ++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// the call stack is a data structure that keeps track of the execution context in a program. 
// when a function is called, a new execution context is created and pushed onto the call stack. 
// when the function returns, the execution context is popped from the call stack and control is 
// returned to the previous execution context.

//example of call stack
function first(){ 
    console.log("first function");
    second();
    console.log("first function completed");
}
function second(){ 
    console.log("second function");
    third();
    console.log("second function completed");
}
function third(){ 
    console.log("third function");
    console.log("third function completed");
}
first();

