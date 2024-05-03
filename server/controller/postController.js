const Post = require('../model/post');
let postService = require('../service/postService');
const {pool} = require('../service/postService');

let posts = [];

let post1 = Post.createPost("@kyrieirving", "i love morgan wallen", "his make good music");
//posts.push(post1);

let post2 = Post.createPost("@aj.casamento", "morgan wallen sucks", "if I ever meet him, he's gonna catch these hands");
//posts.push(post2);

let post3 = Post.createPost("@Elon", "AI Country", "i made an AI country music artist thats better than morgan wallen");
//posts.push(post3);

// GET Request
exports.getAllPosts = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    let posts = await postService.getAllPosts();
    res.send(posts);
}

// GET Request
exports.getPost = (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(posts[req.params.index]);
}

// POST Request
exports.createPost = async (req, res) => {
    const { title, body } = req.body; // Removed author
    try {
        const newPost = await postService.createPost(title, body);
        res.status(201).json(newPost);
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).send('Failed to create post');
    }
};

/*
    const { title, body } = req.body; 
    try {
        const result = await pool.query(
            'INSERT INTO s24.posts (title, body, likes) VALUES ($1, $2, $3, $4) RETURNING *;',
            [title, body, 0] 
        );
        res.status(201).json(result.rows[0]); 
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).send('Failed to create post');
    }
*/

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
exports.deletePost = async (req, res) => {
    const postId = parseInt(req.params.postId);
    const queryText = 'DELETE FROM s24.posts WHERE id = $1 RETURNING *;';
    const result = await pool.query(queryText, [postId]);

    try {
        if (result.rowCount > 0) {
            res.status(200).send({ message: "Post deleted successfully", post: result.rows[0] });
        } else {
            res.status(404).send({ message: "Post not found" });
        }
    } catch (error) {
        console.error('Error deleting post:', error);
        res.status(500).send({ message: "Error deleting post" });
    }
};

// POST Request (like)
exports.likePost = async (req, res) => {
    const postId = req.params.postId;
    const query = "UPDATE s24.posts SET likes = likes + 1 WHERE id = $1 RETURNING *;";

    try {
        const result = await pool.query(query, [postId]);
        if (result.rowCount > 0) {
            res.status(200).json({ message: "Like successful", post: result.rows[0] });
        } else {
            res.status(404).send("Post not found");
        }
    } catch (error) {
        console.error('Error liking post:', error);
        res.status(500).send("Error liking post");
    }
};

// POST Request (unlike)
exports.unlikePost = async (req, res) => {
    const postId = req.params.postId;
    const query = "UPDATE s24.posts SET likes = GREATEST(0, likes - 1) WHERE id = $1 RETURNING *;";

    try {
        const result = await pool.query(query, [postId]);
        if (result.rowCount > 0) {
            res.status(200).json({ message: "Unlike successful", post: result.rows[0] });
        } else {
            res.status(404).send("Post not found or no likes to remove");
        }
    } catch (error) {
        console.error('Error unliking post:', error);
        res.status(500).send("Error unliking post");
    }
};

console.log("[postController] initialized");