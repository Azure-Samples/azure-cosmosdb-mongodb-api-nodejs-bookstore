import {updateComment} from '../db/updateComment.js';

const updateCommentRoute = {
    method: 'post',
    path: '/books/:id/comments',
    handler: async (req, res) => {
        const { id } = req.params;
        const { name, comment } = req.body;
        const response = await updateComment(id, name, comment);
        res.status(200);
    }
}
export default updateCommentRoute
export {updateCommentRoute}