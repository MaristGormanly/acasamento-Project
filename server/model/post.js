let currentId = -1;

class Post {
    constructor (author, title, body) {
        this.id = ++currentId;
        this.author = author;
        this.title = title;
        this.body = body;
        this.likes = 0;
    }
}

exports.createPost = function(author, title, body) {
    return new Post(author, title, body);
}