/*document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("login-button").addEventListener("click", function() {
        window.location.href = "/feed";
    });
});
*/
document.addEventListener("DOMContentLoaded", function() {
    const signupForm = document.getElementById('signup-form');
    signupForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const firstname = document.getElementById('signup-firstname').value;
        const lastname = document.getElementById('signup-lastname').value;
        const email = document.getElementById('signup-email').value;
        const username = document.getElementById('signup-username').value;
        const password = document.getElementById('signup-password').value;

        fetch('/api/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firstname,
                lastname,
                email,
                username,
                password
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            fetchUsers();
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    });
});

document.addEventListener("DOMContentLoaded", function() {
    fetchUsers();
});

function fetchUsers() {
    fetch('/api/user')
    .then(response => response.json())
    .then(users => {
        const userList = document.getElementById('user-list');
        userList.innerHTML = '';

        users.forEach(user => {
            const userItem = document.createElement('li');
            userItem.textContent = user.username;
            userItem.style.cursor = 'pointer';
            userItem.onclick = () => loginUser(user);
            userList.appendChild(userItem);
        });
    })
    .catch(error => console.error('Error fetching users:', error));
}

function loginUser(user) {
    sessionStorage.setItem('currentUser', JSON.stringify(user));
    window.location.href = "/feed";
}

function displayLoggedInUser() {
    const user = JSON.parse(sessionStorage.getItem('currentUser'));
    const loginContainer = document.getElementById('user-list-container');
    loginContainer.innerHTML = '<h1>Welcome, ' + user.username + '</h1>';
}