console.log("[postService] initialized");

const {Pool, Client} = require('pg');

const pool = new Pool ({
    user: 's24',
    host: 'localhost',
    database: 's24',
    password: 's24',
    port: '5432',
});

exports.pool = pool;

exports.getAllPosts = async () => {
    let query = "select * from s24.posts;";
    let res = await pool.query(query);

    let posts = [];
    if (res.rowCount > 0) {
        posts = res.rows.map(row => ({
            id: row.id,
            title: row.title,
            body: row.body,
            likes: row.likes
        }));
    }
    console.log(posts);
    return posts;
}

exports.createPost = async (title, body) => {
    const query = "INSERT INTO s24.posts (title, body, likes) VALUES ($1, $2, $3) RETURNING *;";
    const values = [title, body, 0];
    try {
        const res = await pool.query(query, values);
        return res.rows[0];
    } catch (error) {
        console.error('Error creating post:', error);
        throw error;
    }
}

/*
let posts = [];
    if(res.rowCount > 0) {
        for(let i=0; i < res.rows.length; i++) {
            let post = {};
            post.id = res.rows[i].id;
            post.author = res.rows[i].author;
            post.title = res.rows[i].title;
            post.body = res.rows[i].body;
            post.likes = res.rows[i].likes;
            console.log(post);
            posts.push(post);
        }
    }
    console.log(posts);
    return posts;
    */