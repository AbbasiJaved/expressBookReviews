const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const axios = require('axios');


public_users.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  
  if (username!=" " && password!=" ") {
    if (!isValid(username)) {
      users.push({ "username": username, "password": password });
      return res.status(200).json({ message: "User successfully registred. Now you can login"});
    } else {
      return res.status(404).json({ message: "User already exists!" });
    }
  }
  return res.status(404).json({ message: "Unable to register user." });
});



// Get the book list available in the shop
public_users.get('/', function (req, res) {
  //Write your code here
  let myPromise = new Promise((resolve,reject) => {
     
      resolve(books);
    })
    myPromise.then((data)=>{

      res.send(data);
    })
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
  //There is no isbn key in book objects in booksdb
  //This is the reason of considering key of each book object as isbn
  let myPromise = new Promise((resolve,reject) => {
     
    resolve(books);
  })
  myPromise.then((data)=>{

    res.send(data[req.params.isbn]);
  })
  


});

// Get book details based on author
public_users.get('/author/:author', function (req, res) {
  //Write your code here
  let myPromise = new Promise((resolve,reject) => {
    
    let booksOfAuthor = [];
    for (const element in books) {
      for (const book in books[element]) {
        if (book === "author" && books[element][book] === req.params.author) {
          booksOfAuthor.push(books[element]);
        }
      }
    }
    resolve(booksOfAuthor);
  })

  myPromise.then((data)=>{
    res.send(data);
  })
  

  
  
});

// Get all books based on title
public_users.get('/title/:title', function (req, res) {
  //Write your code here
  let myPromise = new Promise((resolve,reject) => {
    let booksByTitle = [];
    for (const element in books) {
      for (const book in books[element]) {
        if (book === "title" && books[element][book] === req.params.title) {
          booksByTitle.push(books[element]);
        }
      }
    } 
    resolve(booksByTitle);
  });

  myPromise.then((data)=>{
    res.send(data);
  })
  
  
});

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
  //Write your code here
   let bookReviews = books[req.params.isbn]["reviews"];
   res.send(bookReviews)
});

module.exports.general = public_users;
