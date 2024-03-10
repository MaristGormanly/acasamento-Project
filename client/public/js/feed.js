document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("back-button").addEventListener("click", function() {
        window.location.href = "/";
    });
});

let feedPost = {title: 'Morgan Wallen sucks!', body: 'Morgan Wallen is fake country music!!!'}
let feedPost2 = {title: 'I LOVE MORGAN WALLEN', body: 'MORGAN WALLEN COULD STEAL MY GIRL AND I WOULDNT EVEN CARE'}
let feedPost3 = {title: 'I hate country music', body: 'I am stupid'}
let feedPosts = [feedPost, feedPost2, feedPost3]

window.addEventListener('load', () => {
    const container = document.getElementById('container1');

	for(let i = 0; i < feedPosts.length; i++){
        const post = document.createElement('div');
        post.classList.add('post');

        const title = document.createElement('h2');
        title.textContent = feedPosts[i].title;

        const body = document.createElement('p');
        body.textContent = feedPosts[i].body;

        post.appendChild(title);
        post.appendChild(body);

        container.appendChild(post);
    }
});

console.log(feedPosts);
