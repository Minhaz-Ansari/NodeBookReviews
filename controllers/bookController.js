const express = require('express');
const books = require('../data/books');

const getAllBooks = (req, res) => res.json(books);
const getBookByISBN = (req, res) => res.json(books[req.params.isbn] || {});
const getBooksByAuthor = (req, res) => {
  const result = Object.entries(books).filter(([_, b]) => b.author === req.params.author);
  res.json(Object.fromEntries(result));
};
const getBooksByTitle = (req, res) => {
  const result = Object.entries(books).filter(([_, b]) => b.title === req.params.title);
  res.json(Object.fromEntries(result));
};

const getBookReview = (req, res) => {
  const { isbn } = req.params;
  const book = books.find((b) => b.isbn === isbn);

  if (book) {
    res.json(book.reviews || {});
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
};
const addOrModifyReview = (req, res) => {
  const { isbn } = req.params;
  const { username, review } = req.body;
  const book = books.find((b) => b.isbn === isbn);

  if (book) {
    if (!book.reviews) book.reviews = {};
    book.reviews[username] = review;
    return res.status(200).json({ message: 'Review added/modified' });
  }

  res.status(404).json({ message: 'Book not found' });
};
const deleteReview = (req, res) => {
  const { isbn } = req.params;
  const { username } = req.body;
  const book = books.find((b) => b.isbn === isbn);

  if (book && book.reviews && book.reviews[username]) {
    delete book.reviews[username];
    return res.status(200).json({ message: 'Review deleted' });
  }

  res.status(404).json({ message: 'Review not found' });
};

const asyncGetAllBooks = async (req, res) => {
  setTimeout(() => {
    res.status(200).json(books);
  }, 100); // simulate async
};
const getBookByISBNPromise = (req, res) => {
  const { isbn } = req.params;
  new Promise((resolve, reject) => {
    const book = books.find(b => b.isbn === isbn);
    book ? resolve(book) : reject('Book not found');
  })
  .then(book => res.json(book))
  .catch(err => res.status(404).json({ message: err }));
};
const getBooksByAuthorPromise = async (req, res) => {
  const { author } = req.params;

  try {
    const result = await new Promise((resolve, reject) => {
      const matches = books.filter(b => b.author.toLowerCase() === author.toLowerCase());
      matches.length ? resolve(matches) : reject('Author not found');
    });

    res.json(result);
  } catch (err) {
    res.status(404).json({ message: err });
  }
};

const getBooksByTitlePromise = async (req, res) => {
  const { title } = req.params;

  try {
    const result = await new Promise((resolve, reject) => {
      const matches = books.filter(b => b.title.toLowerCase() === title.toLowerCase());
      matches.length ? resolve(matches) : reject('Title not found');
    });

    res.json(result);
  } catch (err) {
    res.status(404).json({ message: err });
  }
};
const getAllBooksAsyncCallback = (req, res) => {
  // Simulate async operation using setTimeout (callback style)
  setTimeout(() => {
    res.status(200).json(books);
  }, 100); // 100ms delay
};

const searchBookByISBN = (isbn) => {
  return new Promise((resolve, reject) => {
    const book = books.find(b => b.isbn === isbn);
    if (book) {
      resolve(book);
    } else {
      reject('Book not found');
    }
  });
};

const searchByISBNPromise = (req, res) => {
  const { isbn } = req.params;

  searchBookByISBN(isbn)
    .then(book => {
      res.status(200).json(book);
    })
    .catch(err => {
      res.status(404).json({ message: err });
    });
};

const searchByAuthor = (req, res) => {
  const { author } = req.params;

  const results = books.filter(b => b.author.toLowerCase() === author.toLowerCase());

  if (results.length === 0) {
    return res.status(404).json({ message: 'No books found for the given author' });
  }

  res.status(200).json(results);
};


const searchByTitle = (req, res) => {
  const { title } = req.params;

  const results = books.filter(b => b.title.toLowerCase().includes(title.toLowerCase()));

  if (results.length === 0) {
    return res.status(404).json({ message: 'No books found with that title' });
  }

  res.status(200).json(results);
};



module.exports = {
  getAllBooks,
  getBookByISBN,
  getBooksByAuthor,
  getBooksByTitle,
  getBookReview,
  addOrModifyReview,
  deleteReview,asyncGetAllBooks,
  getBookByISBNPromise,
  getBooksByAuthorPromise,
  getBooksByTitlePromise,
  getAllBooksAsyncCallback,
  searchByISBNPromise,
  searchByAuthor,
  searchByTitle
};
