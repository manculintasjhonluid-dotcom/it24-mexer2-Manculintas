const button = document.getElementById("loadBtn");
const userList = document.getElementById("userList");
const status = document.getElementById("status");
const searchInput = document.getElementById("searchInput");

let users = [];

button.addEventListener("click", getUsers);

searchInput.addEventListener("input", function () {
    displayUsers(searchInput.value);
});

async function getUsers() {
    status.textContent = "Loading users...";
    userList.replaceChildren();
    button.disabled = true;

    try {
        const response = await fetch(
            "https://jsonplaceholder.typicode.com/users"
        );

        if (!response.ok) {
            throw new Error("Failed to retrieve users.");
        }

        users = await response.json();

        console.log("Retrieved users:", users);

        displayUsers(searchInput.value);

        status.textContent = `Loaded ${users.length} users successfully.`;

    } catch (error) {
        status.textContent = "Error: " + error.message;
        console.error("API request failed:", error);

    } finally {
        button.disabled = false;
    }
}

function displayUsers(searchTerm = "") {
    userList.replaceChildren();

    const filteredUsers = users.filter(function (user) {
        return user.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
    });

    if (filteredUsers.length === 0) {
        status.textContent = "No matching users found.";
        return;
    }

    filteredUsers.forEach(function (user) {
        const card = document.createElement("div");
        card.className = "user-card";

        const name = document.createElement("h3");
        name.textContent = user.name;

        const email = document.createElement("p");
        email.textContent = "Email: " + user.email;

        const city = document.createElement("p");
        city.textContent = "City: " + user.address.city;

        const username = document.createElement("p");
        username.textContent = "Username: " + user.username;
        
        const catchPhrase = document.createElement("p");
catchPhrase.textContent = "Catchphrase: " + user.company.catchPhrase;
         

        card.append(name, email, city, username);
        userList.appendChild(card);
    });
}