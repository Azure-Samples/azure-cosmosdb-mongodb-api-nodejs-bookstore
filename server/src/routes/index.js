import  getAllBooksRoute  from './getAllBooksRoute.js';
import  getBookRoute  from './getBookRoute.js';
import  updateCommentRoute from './updateCommentRoute.js';
import  removeCommentRoute  from './removeCommentRoute.js';
import  searchBooksRoute  from './searchBooksRoute.js';
import  searchGenresRoute  from './searchGenresRoute.js';

const routes = [
    getAllBooksRoute,
    getBookRoute,
    updateCommentRoute,
    removeCommentRoute,
    searchBooksRoute,
    searchGenresRoute
]
export default routes
export {routes}
