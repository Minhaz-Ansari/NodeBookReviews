const express = require('express');
const axios = require('axios');

// Task 10: Async Callback
const fetchAllBooks = async () => {
  try {
    const res = await axios.get('http://localhost:3000/books');
    console.log('All Books:', res.data);
  } catch (err) {
    console.error(err);
  }
};

// Task 11: Promise-based
const fetchByISBN = (isbn) => {
  return axios.get(`http://localhost:3000/books/${isbn}`)
    .then(res => console.log('Book:', res.data))
    .catch(err => console.error(err));
};

// Task 12
const fetchByAuthor = async (author) => {
  const res = await axios.get(`http://localhost:3000/books/author/${author}`);
  console.log('Books by Author:', res.data);
};

// Task 13
const fetchByTitle = async (title) => {
  const res = await axios.get(`http://localhost:3000/books/title/${title}`);
  console.log('Books by Title:', res.data);
};

module.exports = {
  fetchAllBooks,
  fetchByISBN,
  fetchByAuthor,
  fetchByTitle,
};
