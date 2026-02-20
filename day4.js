//++++++++++++++++++++++++++++++++++ FUNCTIONS ++++++++++++++++++++++++++++++++++++++++

function calculatecarprice(...num1){    // ... is called rest operator (or spread oprator as per usecase), 
    return num1;                        // it allows us to pass an indefinite number of arguments as an array
}

console.log(calculatecarprice(1000,2000,3000)); // usecase (like a cart in an e-commerce website where user will 
//add multiple items we dont know how many, so we can use rest operator to pass all the items in the cart as an array)

const user = {
    name : "ahmed",
    age : 30 ,
    
    welcome: function(){   // this is a method of the object user
        console.log("welcome to our website " + this.name);//this keyword refers to the current object (user in this case)
    
        console.log(this); // this will give us the whole object user as this refers to the current object
    }
}
user.welcome();
user.name = "ali";  
user.welcome();  

console.log(this); // this will give us the global object (window in browser) as this refers to the
//  current object and in this case we are not inside any object so it refers to the global object 
// but when we run this in browser it will give us the window object cause in browserthe global objectis window 

function chai(){
    let username = "ahmed";  
    console.log(this.username);  // this will give us undefined because this.username is not accessing
                                // the username variable, it is trying to access the username variable in the
                                //  global scope but it is not defined there 
                                // this works best with objects because this refers to the current object
                                //  and we can access the properties of object 
    
}
chai(); 

const chai1 = function(){  
    let username = "ahmed";  
    console.log(this.username);  // SAME AS ABOVE
}

//AROW FUNCTION
const chai2  = () => {
       let username = "ahmed";  
    console.log(this.username);  // this will give us undefined because arrow functions do not have their own this keyword,
}


//++++++++++++++++++++++++++++++++++ IIFE ++++++++++++++++++++++++++++++++++++++++
(function welcome(){
    console.log("welcome to our website");
}()); //when we have to add 2 iife in same file we have to add comma after the first iife to separate them

((name) => {
    console.log("welcome to our website " + name);
})('ahmed')