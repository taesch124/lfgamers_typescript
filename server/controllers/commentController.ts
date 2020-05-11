const Thread = require('./../models/Thread.ts');
const Comment = require('./../models/Comment.ts');

async function getThreadsByGame(gameId) {
    try {
        const threads = Thread.find({gameId: gameId})
        .populate('originalComment')
        .populate('postedBy')
        .sort({postedAt: -1});
    
        return threads;
    } catch(error) {
        return {
            error: true,
            message: error,
        }
    }
}

async function getCommentsByThread(threadId) {
    try {
        const thread = await Thread.findOne({_id: threadId})
        .populate('originalComment')
        .populate({
            path: 'originalComment',
            populate: {path: 'postedBy'}
        });

        const comments = Comment.populateChildren(thread.originalComment);
        return comments;
    } catch(error) {
        return {
            error: true,
            message: error
        }
    }
}

async function createThread(data) {
    const commentData = {
        postedBy: data.userId,
        postedAt: new Date(),
        title: data.title,
        text: data.text,
    };
    const comment = new Comment(commentData);

    const threadData = {
        gameId: data.gameId,
        postedBy: data.userId,
        postedAt: new Date(),
        originalComment: comment._id,
    };
    const thread = new Thread(threadData);

    try {
        const commentResults = await Comment.create(comment);
        const threadResults = await Thread.create(thread);
        return {
            threadResults,
            commentResults,
        }
    } catch(error) {
        return {
            error: true,
            message: error,
        }
    }
}

async function createComment(data) {
    const parentId = data.parentId;
    const commentData = {
        postedBy: data.userId,
        postedAt: new Date(),
        text: data.text,
    }
    const comment = new Comment(commentData);

    try {
        const commentResult = await Comment.create(comment);
        const updateResult = await Comment.update(
            {_id: parentId}, 
            {$push: 
                {
                    children: commentResult._id
                }
            }
        );
        return updateResult;
    } catch(error) {
        return {
            error: true,
            message: error,
        }
    }
}

module.exports = {
    getCommentsByThread,
    getThreadsByGame,
    createThread,
    createComment,
}