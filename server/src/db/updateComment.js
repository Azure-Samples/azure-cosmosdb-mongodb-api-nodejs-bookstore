import  db  from './db.js';
import obj from 'mongodb';
const {ObjectId} = obj;


const updateComment = async (bookId, name, comment) => {
    const connection = db.getConnection();
    // Append comment to the reviewcomments array field of a book
    await connection.collection('books').updateOne(
                                            {"_id": ObjectId(bookId)}, 
                                            {$push: {reviewcomments: {"name": name,
                                                                      "comment": comment }
                                                                    }})
}
export default updateComment
export {updateComment}