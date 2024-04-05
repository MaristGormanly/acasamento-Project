class Post {
    constructor (author, title, body) {
        this.author = author;
        this.title = title;
        this.body = body;
    }
}

exports.createPost = function(author, title, body) {
    return new Post(author, title, body);
}