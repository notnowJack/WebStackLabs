let cachedUsers = [];

async function fetchUsers() {
    const response = await fetch("https://randomuser.me/api/?results=20");
    const data = await response.json();

    localStorage.setItem("users", JSON.stringify(data.results));
    cachedUsers = data.results;
    displayUsers(cachedUsers)
}

function createUserCard(user) {
    const card = document.createElement("div");
    card.className = "col-md-4 mb-3";
    card.innerHTML = `
        <div class="card">
            <img src="${user.picture.large}" class="card-img-top" alt="${user.name.first}">
            <div class="card-body">
                <h5 class="card-title">${user.name.first} ${user.name.last}</h5>
                <p class="card-text">${user.email}</p>
                <a href="profile.html?userID=${user.login.uuid}" class="btn btn-primary">View Profile</a>
            </div>
        </div>`;

    return card;
}

function displayUsers(users) {
    const container = document.getElementById("userContainer");
    container.innerHTML = "";

    users.forEach(user => {
        container.appendChild(createUserCard(user));
    })


}
function searchUsers(query) {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const resultsContainer = document.getElementById("userContainer");
    resultsContainer.innerHTML = "";

    const filteredUsers = users.filter(user =>
        user.name.first.toLowerCase().includes(query.toLowerCase()) ||
        user.name.last.toLowerCase().includes(query.toLowerCase())
    );

    displayUsers(filteredUsers);
}

document.getElementById("searchInput").addEventListener("input", (e) => {
    searchUsers(e.target.value);
});

if (localStorage.getItem("users")) {
    cachedUsers = JSON.parse(localStorage.getItem("users"));
    displayUsers(cachedUsers);
} else {
    fetchUsers();
}

function loadUserProfile() {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const params = new URLSearchParams(window.location.search);
    const userID = params.get("userID");

    const user = users.find(u => u.login.uuid === userID); 
    if (!user) {
        document.getElementById("profileContainer").innerHTML = "<h3>User not found</h3>";
        return;
    }

    document.getElementById("profileContainer").innerHTML = 
        `<div class="card">
            <img src="${user.picture.large}" class="card-img-top" alt="${user.name.first}">
            <div class="card-body">
                <h5 class="card-title">${user.name.first} ${user.name.last}</h5>
                <p>Email: ${user.email}</p>
                <p>Phone: ${user.phone}</p>
                <p>Location: ${user.location.city}, ${user.location.country}</p>
                <a href="main.html" class="btn btn-secondary">Back to Search</a>
            </div>
        </div>`;
}

loadUserProfile();