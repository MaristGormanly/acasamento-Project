# acasamento-Project
## Twanger: The social media for country music fans.

### Twanger's Features
Twanger is a social media platform for country music fans. It works similar to any other mainstream social media platform. You can easily
- Create an account
- Log in to your account
- Browse all users
- Follow/unfollow users
- Delete your account
- Create posts with a title and body
- Browse all posts
- Edit posts
- Like/unlike posts 
- Delete posts

## Code Installation / Development

### Dependencies
- Node.js
- Postgres

### Clone the repo
Clone this GitHub repo:
- git clone https://github.com/MaristGormanly/acasamento-Project.git
- cd acasamento-Project

### Database Setup
You can run /server/db/create-db.sql
- From the acasamento-Project home directory:
    > psql -U postgres -f server/db/create-db.sql
- When this command is entered, it will prompt you for the password for the postgres user which is '123456'.
- Once the database and role are created, the script will create the tables using the s24 role. The password is 's24'.

### Quick Start Setup
After ensuring that Node.js and PostgreSQL are installed and working, and your database is created, you need to create a .env file.
- Make a copy of the .env.example file and call the copy '.env' and save it in the project home directory.
- Install node.js dependencies:
    - npm install express
    - npm install pg
- Start Twanger
    - npm start

----- output -----

acasamento-project@1.0.0 start
node server/app.js

[userRoute] initialized
[userController] initialized
[userService] initialized
[postService] initialized
[postController] initialized
Twanger listening on port 1337!

- Navigate your web browser to http://localhost:1337