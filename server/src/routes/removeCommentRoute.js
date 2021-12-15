import removeComment  from '../db/removeComment.js';
const removeCommentRoute = {
    method: 'post',
    path: '/books/:id/comments/:commentIndex',
    handler: async (req, res) => {
        const { id, commentIndex } = req.params;
        const response = await removeComment(id, commentIndex);
        res.status(200);
    }
}
export default removeCommentRoute
export {removeCommentRoute}