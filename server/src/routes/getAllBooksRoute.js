import getAllBooks  from '../db/getAllBooks.js';

 const getAllBooksRoute = {
    method: 'get',
    path: '/books',
    handler: async (req, res) => {
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
        const sortby = req.query.sortby;
        const rating = parseInt(req.query.rating);
        const format = req.query.format;
        const genre = req.query.genre;
        const books = await getAllBooks(page, limit, sortby, rating, format, genre);
        res.status(200).json(books);
    }
}
export default getAllBooksRoute
export {getAllBooksRoute}