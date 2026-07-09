const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const axios = require('axios').default;


public_users.post("/register", (req,res) => {   //Task 6 
const username = req.body.username;
    const password = req.body.password;

    // Check if both username and password are provided
    if (username && password) {
        // Check if the user does not already exist
        if (!isValid(username)) {
            // Add the new user to the users array
            users.push({"username": username, "password": password});
            return res.status(200).json({message: "User successfully registered. Now you can login"});
        } else {
            return res.status(404).json({message: "User already exists!"});
        }
    }
    // Return error if username or password is missing
    return res.status(404).json({message: "Unable to register user."});
});

// Get the book list available in the shop Task 1 Work's
public_users.get('/',function (req, res) {
    return res.send(JSON.stringify(books, null, 4));
});

const getBooks = () => {      //Tash 10
  let url = 'http://localhost:5000/';
  // Sending a GET request to the specified URL using axios
  const req = axios.get(url)
  // Logging the initial promise object
  console.log(req);
  // Handling the promise resolution
  req.then(resp => {
    // Logging the Book list
    console.log("Book list received");
    // Logging the response data
    console.log(resp.data);
  })
    // Handling the promise rejection
    .catch(err => {
      // Logging the rejection message with the URL
      console.log("Rejected for url " + url);
      // Logging the error message
      console.log(err.toString());
    });
}

//getBooks();

// Get book details based on ISBN  Task 2  Work's
public_users.get('/isbn/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  return res.send(JSON.stringify(books[isbn]));
});

//Task 11
const getISBN = (isbn) => {     
  let url = 'http://localhost:5000/isbn/' + isbn;
  // Sending a GET request to the specified URL using axios
  const req = axios.get(url)
  // Logging the initial promise object
  console.log(req);
  // Handling the promise resolution
  req.then(resp => {
    // Logging the Book details for single ISBN
    console.log("Book details for single ISBN");
    // Logging the response data
    console.log(resp.data);
  })
    // Handling the promise rejection
    .catch(err => {
      // Logging the rejection message with the URL
      console.log("Rejected for url " + url);
      // Logging the error message
      console.log(err.toString());
    });
}

//getISBN(3);
  
// Get book details based on author Task 3 works's
public_users.get('/author/:author', function (req, res) {
  const author = req.params.author;
  
  for (const id in books) {
    let book = books[id];
    if (book.author == author){
      return res.send(book);
    }
  }

  return res.status(404).json({message: "Book not found"});
});

//Task 12 
const getAuthor = (author) => {     
  let url = 'http://localhost:5000/author/' + author;
  // Sending a GET request to the specified URL using axios
  const req = axios.get(url)
  // Logging the initial promise object
  console.log(req);
  // Handling the promise resolution
  req.then(resp => {
    // Logging the Book details for author
    console.log("Book details for author");
    // Logging the response data
    console.log(resp.data);
  })
    // Handling the promise rejection
    .catch(err => {
      // Logging the rejection message with the URL
      console.log("Rejected for url " + url);
      // Logging the error message
      console.log(err.toString());
    });
}

//getAuthor(Samuel);

// Get all books based on title  Task 4 Work's
public_users.get('/title/:title',function (req, res) {
  const title = req.params.title;
  
  for (const id in books) {
    let book = books[id];
    if (book.title == title){
      return res.send(book);
    }
  }

  return res.status(404).json({message: "Title not found"});
});

//Task 13
const getTitle = (title) => {     
  let url = 'http://localhost:5000/title/' + title;
  // Sending a GET request to the specified URL using axios
  const req = axios.get(url)
  // Logging the initial promise object
  console.log(req);
  // Handling the promise resolution
  req.then(resp => {
    // Logging the Book details according to the title
    console.log("Book details for title");
    // Logging the response data
    console.log(resp.data);
  })
    // Handling the promise rejection
    .catch(err => {
      // Logging the rejection message with the URL
      console.log("Rejected for url " + url);
      // Logging the error message
      console.log(err.toString());
    });
}

getTitle(Things Fall Apart);

//  Get book review Task 5 work's 
public_users.get('/review/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  let book = books[isbn];
  if (book) {
    return res.send(book.reviews);
  }
  return res.status(404).json({ message: "Review not found" });
});

module.exports.general = public_users;
