const Comment = require('../Model/commentModel');

// Add Comment
exports.addComment = async (req, res) => {
    try {
        const { content } = req.body;
        const comment = new Comment({ content, author: req.user.id, post: req.params.postId });
        await comment.save();
        res.status(201).json(comment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Edit Comment
exports.editComment = async (req, res) => {
    try {
        const { content } = req.body;
        const comment = await Comment.findByIdAndUpdate(req.params.commentId, { content }, { new: true });
        res.status(200).json(comment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete Comment
exports.deleteComment = async (req, res) => {
    try {
        await Comment.findByIdAndDelete(req.params.commentId);
        res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};