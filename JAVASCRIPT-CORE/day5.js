// ++++++++++++++++++++++++++++++++++++++ FILTER ++++++++++++++++++++++++++++++++++++++

//OK so there is a problem with the foreach that it does not return anything, 
//so we have to use filter instead
const coding = ["javascript", "python", "java", "c++", "ruby"];

const values = coding.forEach((item) => console.log(item))//this will print all the items inthe array
                             // but it will return undefined because forEach does not return anything
console.log(values);
// so we have to use filter instead of forEach 

const val = [1,2,3,4,5,6,7,8,9,10];

// this will give us an empty array because by curly braces we opened a new scope and we are not
//  returning anything from that scope so it is returning undefined and filter is expecting a 
// boolean value to decide whether to include the item in the new array or not,
//  but we are not returning anything so it is returning undefined
 const newnum1 = val.filter((item) => {item >= 4});
 console.log(newnum1);

//this will give usthe correct result because weare returning the boolean value from arrow function
 const newnum = val.filter((item) => {return item >= 4});
 console.log(newnum);

// we can also do the same thing with foreach loop
//example
 const newnum2 = val.forEach((item) => {
   if(item >= 4){
        console.log(item); 
    }
 })

//ok i have a realworld example of filter 
const books = [
    {title : "book1", genre : "history", price : 100 , publishYear : 1930},
    {title : "book2", genre : "fiction", price : 200 , publishYear : 1957},
    {title : "book3", genre : "science", price : 300 , publishYear : 2000},
    {title : "book4", genre : "history", price : 400 , publishYear : 1980},
    {title : "book5", genre : "fiction", price : 500 , publishYear : 2010},
] ;  // this is how data comes from database in real world applications

let wanntedBooks = books.filter((bk) => bk.genre === "history")
wanntedBooks = wanntedBooks.filter((bk) => bk.price <= 200)
console.log(wanntedBooks);

// we have map() which is same as filter : example

const val2 = [1,2,3,4,5,6,7,8,9,10];

const newnum3 = val2.map((item) => item * 2);
console.log(newnum3);

// so the MAIN DIFFERENCE between filter and map is that filter removes(filters) the items and 
// map transforms(change) the items but it does not remove any item returns the same lenght of items
// we use filter in realworld applications when (SEARCHING , REMOVING , APPLY CONDITION)
// and map when (Rendering UI lists , Modifying structure)

// now we have concept of chaining methods like we can chain filter and map together example

const newnum4 = val2.filter((item) => item > 4).map((item) => item *2).map((item) => item +1);
console.log(newnum4);

// example of chaining methods from books array 
const books2 = [
    {title : "book1", genre : "history", price : 100 , publishYear : 1930},
    {title : "book2", genre : "fiction", price : 200 , publishYear : 1957},
    {title : "book3", genre : "science", price : 300 , publishYear : 2000},
    {title : "book4", genre : "history", price : 400 , publishYear : 1980},
    {title : "book5", genre : "fiction", price : 500 , publishYear : 2010},
] ;

const wantbook2 = books2.filter((bk) => bk.publishYear > 1957).map((bl) => bl.title);
console.log(wantbook2);

// +++++++++++++++++++++++++++++++++++++++ REDUCE ++++++++++++++++++++++++++++++++++++++

//  reduce is usefull method it is an data processing tool we can use it in grouping logics
//basic example
const num = [1,2,3,4,5];
const sum = num.reduce((acc ,curr) => {
    console.log(acc); //at start acc is 0 because we have provided 0 as initial as it itrates acc
                      // will be updated with the recent return value   
    return acc + curr;
} , 0);
console.log(sum);

//realworld usecases of reduce 
const cart = [
    {product : "laptop", price : 1000, quantity : 2},
    {product : "phone", price : 500, quantity : 3},
    {product : "tablet", price : 300, quantity : 4},
]
const total = cart.reduce((acc , curr) => {return acc + (curr.price * curr.quantity)} , 0);

console.log(total);

// ex :2
const books3 = [
    {title : "book1", genre : "history", price : 100 , publishYear : 1930},
    {title : "book2", genre : "fiction", price : 200 , publishYear : 1957},
    {title : "book3", genre : "science", price : 300 , publishYear : 2000},
    {title : "book4", genre : "history", price : 400 , publishYear : 1980},
    {title : "book5", genre : "history", price : 500 , publishYear : 2010},
] ;
const genrecount = books3.reduce((acc , curr) => { 
    if(curr.genre == "history"){
        acc = acc + 1;
    }
    return acc;
} , 0)
console.log(genrecount);

const allgenre = books3.reduce((acc , curr)=> {
    const genre = curr.genre;
    if(acc[genre] == null) {
        acc[genre] = [];
    }
    acc[genre].push(curr);
    return acc;
}, {});

console.log(allgenre);

const users = [
  { name: "Ali", role: "admin" },
  { name: "Ahmed", role: "user" },
  { name: "Sara", role: "admin" },
  { name: "Zain", role: "user" },
  { name: "Areeba", role: "user" },
];
const groupedusers = users.reduce((acc , curr) => {
    if(acc[curr.role] == null){ // if there is no key in acc object with the name of current role 
        acc[curr.role] = [];    // then we will create an empty array for that role
    }
    acc[curr.role].push(curr);  // then we will push the current user object in that array
    return acc;           // then we will return the acc object for the next iteration
}, {});

console.log(groupedusers);

const users2 = [
  { name: "Ali", role: "admin" },
  { name: "Sara", role: "user" },
  { name: "Ahmed", role: "admin" },
  { name: "Fatima", role: "user" },
  { name: "Zain", role: "moderator" }
];

const numgroup = users2.reduce((acc , curr) => {
    if(acc[curr.role] == null){
        acc[curr.role] = 0;
    }
    acc[curr.role] = acc[curr.role] + 1;
    return acc;

} , {})
 console.log(numgroup);

