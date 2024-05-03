class Post {
    constructor (postId, title, body) {
        this.postId = postId;
        this.title = title;
        this.body = body;
        this.likes = 0;
    }
}

exports.createPost = function(postId, title, body) {
    return new Post(postId, title, body);
}