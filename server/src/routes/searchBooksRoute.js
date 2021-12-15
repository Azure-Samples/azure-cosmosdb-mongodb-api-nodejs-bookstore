import searchBooks  from '../db/searchBooks.js';

const searchBooksRoute = {
    method: 'get',
    path: '/search',
    handler: async (req, res) => {
        const searchString = req.query.search;
        const skip = parseInt(req.query.skip);
        const top = parseInt(req.query.top);
        const orderby = req.query.orderby;
        const rating = req.query.rating;
        const format = req.query.format;
        const genre = req.query.genre;
        const books = await searchBooks(skip, top, searchString, orderby, rating, format, genre);
        res.status(200).json(books);
    }
}
export default searchBooksRoute
export {searchBooksRoute}