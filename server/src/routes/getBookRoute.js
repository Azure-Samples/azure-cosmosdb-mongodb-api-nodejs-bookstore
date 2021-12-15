import getBook  from '../db/getBook.js';

 const getBookRoute = {
    method: 'get',
    path: '/books/:id',
    handler: async (req, res) => {
        const { id } = req.params;
        const book = await getBook(id);
        res.status(200).json(book);
    }
}
export default getBookRoute
export {getBookRoute}