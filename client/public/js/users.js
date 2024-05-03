document.addEventListener("DOMContentLoaded", function() {
    fetchUsers();
    document.getElementById("back-button").addEventListener("click", function() {
        window.location.href = "/feed";
    });
});

function fetchUsers() {
    fetch('/api/user')
    .then(response => response.json())
    .then(users => {
        const userContainer = document.getElementById('user-container');
        userContainer.innerHTML = '';
        users.forEach(user => {
            userContainer.appendChild(createUserElement(user));
        });
    })
    .catch(error => console.error('Error fetching users:', error));
}

function createUserElement(user) {
    const userDiv = document.createElement('div');
    userDiv.classList.add('user');

    const userName = document.createElement('h2');
    userName.textContent = user.username;

    const followButton = document.createElement('button');
    followButton.textContent = 'Follow';
    followButton.onclick = () => followUser(user.id);

    const unfollowButton = document.createElement('button');
    unfollowButton.textContent = 'Unfollow';
    unfollowButton.onclick = () => unfollowUser(user.id);

    const followCount = document.createElement('span');
    followCount.textContent = `Followers: ${user.follow_count}`;
    followCount.classList.add('follow-count');

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.dataset.userId = user.Id;
    deleteButton.onclick = () => deleteUser(user.id);

    userDiv.appendChild(userName);
    userDiv.appendChild(followButton);
    userDiv.appendChild(unfollowButton);
    userDiv.appendChild(followCount);
    userDiv.appendChild(deleteButton);

    return userDiv;
}

function followUser(userId) {
    const requestBody = {
        userToFollowId: userId,
    };
    fetch(`/api/user/${userId}/follow`, { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Follow successful', data);
        fetchUsers(); 
    })
    .catch(error => console.error('Error following user:', error));
}

function unfollowUser(userId) {
    const requestBody = {
        userToUnfollowId: userId,
    };
    fetch(`/api/user/${userId}/unfollow`, { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Unfollow successful', data);
        fetchUsers(); 
    })
    .catch(error => console.error('Error unfollowing user:', error));
}

function deleteUser(userId) {
    console.log("Deleting user with ID:", userId);
    fetch(`/api/user/${userId}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        console.log('Delete successful', data);
        fetchUsers();
    })
    .catch(error => console.error('Error deleting user:', error));
}