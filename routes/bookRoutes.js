const express = require('express');
const router = express.Router();

const {
    getAllBooks,
    getBookByISBN,
    getBooksByAuthor,
    getBooksByTitle,
    getBookReview,
    addOrModifyReview,
    deleteReview,
    getAllBooksAsyncCallback,
    searchByISBNPromise,
    searchByAuthor,
    searchByTitle 
} = require('../controllers/bookController');

router.get('/', getAllBooks);
router.get('/isbn/:isbn', getBookByISBN);
router.get('/author/:author', getBooksByAuthor);
router.get('/title/:title', getBooksByTitle);
router.get('/review/:isbn', getBookReview);
router.put('/review/:isbn', addOrModifyReview);
router.delete('/review/:isbn', deleteReview);
router.get('/async/books', getAllBooksAsyncCallback);
router.get('/promise/isbn/:isbn', searchByISBNPromise);+
router.get('/search/author/:author', searchByAuthor);
router.get('/search/title/:title', searchByTitle);



module.exports = router;
