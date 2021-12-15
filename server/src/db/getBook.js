import  db  from './db.js';
import obj from 'bson';
const {ObjectId} = obj;

const getBook = async (bookId) => {
    const connection = db.getConnection();
    // Query one document that matches the particular criteria
    const book = await connection.collection('books').findOne({"_id": ObjectId(bookId)})
    return book;
}
export default getBook
export {getBook}