CREATE DATABASE s24;

CREATE USER s24 WITH ENCRYPTED PASSWORD 's24';
GRANT ALL PRIVILEGES ON DATABASE s24 TO s24;
GRANT CONNECT ON DATABASE s24 TO s24;

\c s24 s24;
CREATE SCHEMA IF NOT EXISTS S24;
CREATE TABLE s24.users (id SERIAL PRIMARY KEY, firstname VARCHAR, lastname VARCHAR, email VARCHAR, username VARCHAR, password VARCHAR);

CREATE TABLE follows (
    follower_id INTEGER NOT NULL,
    followed_id INTEGER NOT NULL,
    PRIMARY KEY (follower_id, followed_id),
    FOREIGN KEY (follower_id) REFERENCES users (id) ON DELETE CASCADE,
    FOREIGN KEY (followed_id) REFERENCES users (id) ON DELETE CASCADE
);

CREATE TABLE s24.posts (id SERIAL PRIMARY KEY, title VARCHAR, body VARCHAR, likes INTEGER DEFAULT 0);
