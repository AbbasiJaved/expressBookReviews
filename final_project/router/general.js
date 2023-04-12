const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();



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
  res.send(JSON.stringify(books));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
  //There is no isbn key in book objects in booksdb
  //This is the reason of considering key of each book object as isbn
  
  return res.send(books[req.params.isbn]);
});

// Get book details based on author
public_users.get('/author/:author', function (req, res) {
  //Write your code here
  let booksOfAuthor = [];
  for (const element in books) {
    for (const book in books[element]) {
      if (book === "author" && books[element][book] === req.params.author) {
        booksOfAuthor.push(books[element]);
      }
    }

  }
  res.send(JSON.stringify(booksOfAuthor));
  
});

// Get all books based on title
public_users.get('/title/:title', function (req, res) {
  //Write your code here
  let booksByTitle = [];
  for (const element in books) {
    for (const book in books[element]) {
      if (book === "title" && books[element][book] === req.params.title) {
        booksByTitle.push(books[element]);
      }
    }

  }
  res.send(booksByTitle);
  
});

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
  //Write your code here
   let bookReviews = books[req.params.isbn]["reviews"];
   res.send(bookReviews)
});

module.exports.general = public_users;
