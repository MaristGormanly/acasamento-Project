const Post = require('../model/post');

let posts = [];

let post1 = Post.createPost("@kyrieirving", "i love morgan wallen", "his make good music");
posts.push(post1);

let post2 = Post.createPost("@aj.casamento", "morgan wallen sucks", "if I ever meet him, he's gonna catch these hands");
posts.push(post2);

let post3 = Post.createPost("@Elon", "AI Country", "i made an AI country music artist thats better than morgan wallen");
posts.push(post3);

// GET Request
exports.getAllPosts = (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(posts);
}

// GET Request
exports.getPost = (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(posts[req.params.index]);
}

// POST Request
exports.createPost = (req, res) => {
    let newPost = Post.createPost(req.body.author, req.body.title, req.body.body);
    posts.push(newPost);
    res.setHeader('Content-Type', 'application/json');
    res.send(posts);
}

// PUT Request
exports.updatePost = (req, res) => {
    const index = req.params.index;
    const {author, title, body} = req.body;

    if (index >= 0 && index < posts.length) {
        let updatedPost = Post.createPost(author, title, body);
        posts[index] = updatedPost;
        res.setHeader('Content-Type', 'application/json');
        res.send(posts[index]);
    } else {
        res.status(404).send("Post not found");
    }
}

// PATCH Request
exports.partialUpdatePost = (req, res) => {
    const index = req.params.index;
    const {title, body} = req.body;

    if (index >= 0 && index < posts.length) {
        const currentPost = posts[index];
        if (title) currentPost.title = title;
        if (body) currentPost.body = body;
        res.send(posts);
    } else {
        res.status(404).send("Post not found");
    }
}

// DELETE Request
exports.deletePost = (req, res) => {
    const index = req.params.index;

    if (index >= 0 && index < posts.length) {
        posts.splice(index, 1);
        res.send(posts);
    } else {
        res.status(404).send("Post not found");
    }
}

// POST Request (like)
exports.likePost = (req, res) => {
    const index = req.params.index;

    if (index >= 0 && index < posts.length) {
        posts[index].likes++;
        res.setHeader('Content-Type', 'application/json');
        res.send(posts[index]);
    } else {
        res.status(404).send("Post not found");
    }
}

// POST Request (unlike)
exports.unlikePost = (req, res) => {
    const index = req.params.index;

    if (index >= 0 && index < posts.length && posts[index].likes > 0) {
        posts[index].likes--;
        res.setHeader('Content-Type', 'application/json');
        res.send(posts[index]);
    } else {
        res.status(404).send("Post not found or no likes to remove");
    }
}

console.log("[postController] initialized");