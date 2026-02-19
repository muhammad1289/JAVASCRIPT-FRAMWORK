//++++++++++++++++++++++++++++++++++ OBJECTS ++++++++++++++++++++++++++++++++++

// there are two types of obj -

//  and 1. object constructors  EXAMPLE

Object.create({
    name : "ahmed"
})

//  2. object literals
const user = {
    name : "ahmed",
    age : 30 ,
    "email" : "ahmed@example.com",
    isloggedin : true,
    lastloggedin : ["2023-01-01", "2023-02-01", "2023-03-01"]
}

Object.freeze(user);  // will make the object immutable we cannot change the values of the object after freezing

// we can access the properties of an object in two ways

console.log(user.email);

//we use bracket notation occationally like in my user obj email key is written in inverted comas 
// so we cannot access it using dot notation we have to use bracket notation
console.log(user["email"]);
console.log(user);

// interview question - take a symbol and use it as a key in an object and access it 
const sym = Symbol();
const user1 = {
    [sym] : "ahmed"
}
console.log(user1[sym]);    


// another interview question is that how to get the keys and values of an object in an array form
console.log(Object.keys(user));  // will give us an array of keys of the object
console.log(Object.values(user));  // will give us an array of values of the object



// now we will work with database or API data we will get the data in the form of an array of objects like
//below we have all the methods and oprations which can be benificial to work with database or API data fetch

const users = [
    {
        name : "ahmed",
        age : 30,
        email : "ahmed@example.com"
    },
      {
        name : "ali",
        age : 20,
        email : "ali@example.com"
    },
      {
        name : "areeba",
        age : 21,
        email : "areeba@example.com"
    }
]

console.log(users[1].name);

console.log(Object.keys(users[1]));
console.log(Object.values(users[1]));

console.log(users[1].hasOwnProperty('emai'));//check if the object has property or not will return true orfalse

// now here is the concept of destructuring we will understand it with example of react js but it is a 
// very important concept in javascript we can use it in react js to get the values from the props and state

const course = {
    name : "javascript",
    price : 999,
    instructor : "hitesh choudhary"
}
// instead of getting the values like this
//console.log(course.name);

const {name : nam, price : pri, instructor : inst} = course;  // we are destructuring the course object
console.log(nam, pri, inst);                                  //  and getting the values in separate variables

// EXAMPLE OF DESTRUCTURING IN REACT JS

 const Course = (props) => {
    const {name, price, instructor} = props;  // we are destructuring the props object
    return (
        <div>
            <h1>{name}</h1>
            <p>{price}</p>
            <p>{instructor}</p>
        </div>
    )
 }