document.addEventListener("DOMContentLoaded", function() {
    displayLoggedInUser();
    fetchPosts();
    document.getElementById("back-button").addEventListener("click", function() {
        window.location.href = "/";
    });
    document.getElementById("new-post-form").addEventListener("submit", function(event) {
        event.preventDefault();
        createPost();
    });
    document.getElementById("users-button").addEventListener("click", function() {
        window.location.href = "/users";
    });
});



function displayLoggedInUser() {
    const user = JSON.parse(sessionStorage.getItem('currentUser'));
    const welcomeContainer = document.getElementById('user-welcome-container');
    if (!welcomeContainer) {
        console.log('Welcome container not found on this page.');
        return;
    }
    welcomeContainer.innerHTML = '<h1>Welcome, ' + user.username + '</h1>';
}

let feedPost = {title: 'Morgan Wallen sucks!', body: 'Morgan Wallen is fake country music!!!'}
let feedPost2 = {title: 'I LOVE MORGAN WALLEN', body: 'MORGAN WALLEN COULD STEAL MY GIRL AND I WOULDNT EVEN CARE'}
let feedPost3 = {title: 'I hate country music', body: 'I am stupid'}
let feedPosts = [feedPost, feedPost2, feedPost3]

function fetchPosts() {
    fetch('/api/post')
    .then(response => response.json())
    .then(posts => {
        const postsContainer = document.getElementById('container2');
        postsContainer.innerHTML = '';

        posts.forEach(post => {
            const postElement = createPostElement(post);
            postsContainer.appendChild(postElement);
        });
    })
    .catch(error => console.error('Failed to fetch posts:', error));
}

function createPostElement(post) {
    const postDiv = document.createElement('div');
    postDiv.classList.add('post');

    // Displaying the post
    const titleDisplay = document.createElement('h2');
    titleDisplay.textContent = post.title;
    const bodyDisplay = document.createElement('p');
    bodyDisplay.textContent = post.body;

    // Editable fields
    const titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.value = post.title;
    titleInput.classList.add('post-title-edit');
    titleInput.style.display = 'none'; 
    const bodyTextArea = document.createElement('textarea');
    bodyTextArea.textContent = post.body;
    bodyTextArea.classList.add('post-body-edit');
    bodyTextArea.style.display = 'none'; 

    // Edit/Save buttons
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.onclick = () => toggleEdit(titleDisplay, bodyDisplay, titleInput, bodyTextArea, editButton, post);

    // Delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.dataset.postId = post.Id;
    deleteButton.onclick = () => deletePost(post.id);

    // Like button
    const likeButton = document.createElement('button');
    likeButton.textContent = 'Like';
    likeButton.onclick = () => likePost(post.id);

    // Unlike button
    const unlikeButton = document.createElement('button');
    unlikeButton.textContent = 'Unlike';
    unlikeButton.onclick = () => unlikePost(post.id);

    // Like Count
    const likeCount = document.createElement('span');
    likeCount.textContent = `Likes: ${post.likes}`;
    likeCount.id = `like-count-${post.id}`;

    postDiv.appendChild(titleDisplay);
    postDiv.appendChild(bodyDisplay);
    postDiv.appendChild(titleInput);
    postDiv.appendChild(bodyTextArea);
    postDiv.appendChild(editButton);
    postDiv.appendChild(deleteButton);
    postDiv.appendChild(likeButton);
    postDiv.appendChild(unlikeButton);
    postDiv.appendChild(likeCount);


    return postDiv;
}

function createPost() {
    const title = document.getElementById('post-title').value;
    const body = document.getElementById('post-body').value;
    const post = { title: title, body: body };

    fetch('/api/post', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(post)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        fetchPosts();
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

function toggleEdit(titleDisplay, bodyDisplay, titleInput, bodyTextArea, editButton, post) {
    const isEditing = titleInput.style.display === 'none';
    
    if (isEditing) {
        // Switch to edit mode
        titleDisplay.style.display = 'none';
        bodyDisplay.style.display = 'none';
        titleInput.style.display = '';
        bodyTextArea.style.display = '';
        editButton.textContent = 'Save';
    } else {
        // Save changes and switch back to display mode
        titleDisplay.textContent = titleInput.value;
        bodyDisplay.textContent = bodyTextArea.value;
        titleInput.style.display = 'none';
        bodyTextArea.style.display = 'none';
        titleDisplay.style.display = '';
        bodyDisplay.style.display = '';
        editButton.textContent = 'Edit';
        
        updatePost(post.id, { title: titleInput.value, body: bodyTextArea.value });
    }
}

function updatePost(postId, updatedData) {
    fetch(`/api/post/${postId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Post updated:', data);
    })
    .catch((error) => {
        console.error('Error updating post:', error);
    });
}

function deletePost(postId) {
    fetch(`/api/post/${postId}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        console.log('Delete successful', data);
        fetchPosts();
    })
    .catch(error => console.error('Error deleting post:', error));
}

function likePost(postId) {
    fetch(`/api/post/${postId}/like`, {
        method: 'POST'
    })
    .then(response => response.json())
    .then(data => {
        console.log('Liked post:', data);
        updateLikeCount(postId, data.post.likes);
    }).catch(error => console.error('Error liking post:', error));
}

function unlikePost(postId) {
    fetch(`/api/post/${postId}/unlike`, {
        method: 'POST'
    }).then(response => response.json())
      .then(data => {
          console.log('Unliked post:', data);
          updateLikeCount(postId, data.post.likes);
      }).catch(error => console.error('Error unliking post:', error));
}

function updateLikeCount(postId, likes) {
    const likeCountElement = document.getElementById(`like-count-${postId}`);
    if (likeCountElement) {
        likeCountElement.textContent = `Likes: ${likes}`;
    }
}

/*
window.addEventListener('load', () => {
    const container = document.getElementById('container2');

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
*/
