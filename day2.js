// ++++++++++++++++++++++++++++++++++++++++++++++//

// STACK (PRIMITIVE DATA TYPES)        IN THIS MEMORY LOCATION WE GET 
// THE COPY OF  THE  VALUE  IF  WE  CHANGE  THE VALUE IN ONE VARIABLE
//  IT DOES NOT AFFECT THE ORIGINAL VARIABLE

let myname = 'ahmed';
let lastname = myname;

console.log(myname , lastname);

lastname = 'mughal';

console.log(myname , lastname);

// HEAP (NON PRIMITIVE DATA TYPES)     IN THIS MEMORY LOCATION WE GET
//  THE REFERENCE OF THE VALUE IF WE CHANGE THE VALUE IN ONE VARIABLE 
//  IT AFFECTS THE ORIGINAL VARIABLE BECAUSE BOTH THE VARIABLES 
// ARE POINTING TO THE SAME LOCATION IN THE HEAP MEMORY 

let user1 = {
    name : "ahmed",
    age : 30 , 
    email : "ahmed@gmail.com"
}

let user2 = user1;
console.log(user1 , user2);

user2.age = 21;
console.log(user1 , user2);

//++++++++++++++++++++++++++++++++++ ARRAY +++++++++++++++++++++++++++++++++++++//

const marvel = ['thor', 'ironman', 'hulk'];
const dc = ['superman', 'batman', 'flash'];

marvel.push(dc);
console.log(marvel);

console.log(marvel[3][1])

let newarr = marvel.concat(dc);
console.log(newarr);

const allnewheros = [...dc, ...marvel];
console.log(allnewheros);

const anotherarr  = [1,2,3,[4,5],7,[8,9]];
console.log(anotherarr.flat());

console.log(Array.isArray("ahmed"));   //will check if the value is an array or not
console.log(Array.from("ahmed"));  //will convert the string into an array of characters

console.log(Array.from({name : "ahmed", age : 30})); //will convert the object into an array of key value pairs 
            // we will get an empty array because from doesnt know which thing to convert key or value ?

