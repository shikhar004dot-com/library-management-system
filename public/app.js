const BASE_URL = "";

window.onload = () => {
    const token = sessionStorage.getItem("token");
    const role = sessionStorage.getItem("role");
    const email = sessionStorage.getItem("email");
    const expiry = sessionStorage.getItem("expiry");

    if (!token || !expiry) {
        showLogin();
        return;
    }

    if (Date.now() > expiry) {
        logout();
        return;
    }

    showLibrary();
    document.getElementById("userEmail").innerText =
        role + " (" + email + ")";

    applyRoleUI();
    displayBooks();
    startCountdown();
};

function showLogin() {
    document.getElementById("loginSection").style.display = "flex";
    document.getElementById("librarySection").style.display = "none";
}

function showLibrary() {
    document.getElementById("loginSection").style.display = "none";
    document.getElementById("librarySection").style.display = "block";
}

function applyRoleUI() {
    const role = sessionStorage.getItem("role");

    if (role === "student") {
        document.querySelector(".add-book").style.display = "none";
        document.querySelector(".clear-btn").style.display = "none";
    } else {
        document.querySelector(".add-book").style.display = "block";
        document.querySelector(".clear-btn").style.display = "inline-block";
    }
}

async function login() {
    const role = document.getElementById("role").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const endpoint =
        role === "admin" ? "/admin-login" : "/student-login";

    const res = await fetch(BASE_URL + endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (data.token) {
        const payload = JSON.parse(
            atob(data.token.split(".")[1])
        );

        const expiryTime = payload.exp * 1000;

        sessionStorage.setItem("token", data.token);
        sessionStorage.setItem("role", data.role);
        sessionStorage.setItem("email", email);
        sessionStorage.setItem("expiry", expiryTime);

        showLibrary();
        document.getElementById("userEmail").innerText =
            data.role + " (" + email + ")";

        applyRoleUI();
        displayBooks();
        startCountdown();
    } else {
        alert(data.message);
    }
}

async function displayBooks() {
    const response = await fetch(`${BASE_URL}/library-read`);
    const result = await response.json();

    renderBooks(result.data || []);
}

function renderBooks(books) {
    const bookList = document.getElementById("bookList");
    const role = sessionStorage.getItem("role");

    bookList.innerHTML = "";

    books.forEach((book, index) => {
        bookList.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>${book.status}</td>
                <td>
                    ${
                        role === "admin"
                            ? `
                                <button onclick="issueBook('${book._id}')">Issue</button>
                                <button onclick="returnBook('${book._id}')">Return</button>
                                <button onclick="deleteBook('${book._id}')">Delete</button>
                              `
                            : "View Only"
                    }
                </td>
            </tr>
        `;
    });
}

async function searchBooks() {
    const keyword =
        document.getElementById("searchInput").value.toLowerCase();

    const response = await fetch(`${BASE_URL}/library-read`);
    const result = await response.json();

    const filtered = (result.data || []).filter(book =>
        book.title.toLowerCase().includes(keyword) ||
        book.author.toLowerCase().includes(keyword)
    );

    renderBooks(filtered);
}

async function addBook() {
    const title =
        document.getElementById("title").value.trim();

    const author =
        document.getElementById("author").value.trim();

    if (!title || !author) {
        alert("Please fill out both fields.");
        return;
    }

    const token = sessionStorage.getItem("token");

    const res = await fetch(`${BASE_URL}/library-insert`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token
        },
        body: JSON.stringify({ title, author })
    });

    if (res.status === 401 || res.status === 403) {
        logout();
        return;
    }

    document.getElementById("title").value = "";
    document.getElementById("author").value = "";

    displayBooks();
}

async function issueBook(id) {
    const token = sessionStorage.getItem("token");

    await fetch(`${BASE_URL}/library-update/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token
        },
        body: JSON.stringify({ status: "Issued" })
    });

    displayBooks();
}

async function returnBook(id) {
    const token = sessionStorage.getItem("token");

    await fetch(`${BASE_URL}/library-update/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token
        },
        body: JSON.stringify({ status: "Available" })
    });

    displayBooks();
}

async function deleteBook(id) {
    if (!confirm("Are you sure you want to delete this book?")) return;

    const token = sessionStorage.getItem("token");

    await fetch(`${BASE_URL}/library-delete/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: "Bearer " + token
        }
    });

    displayBooks();
}

async function clearAll() {
    if (!confirm("Are you sure you want to clear all entries?")) return;

    const token = sessionStorage.getItem("token");

    await fetch(`${BASE_URL}/library-clearall`, {
        method: "DELETE",
        headers: {
            Authorization: "Bearer " + token
        }
    });

    displayBooks();
}

function startCountdown() {
    const timerElement =
        document.getElementById("sessionTimer");

    const interval = setInterval(() => {
        const expiry =
            sessionStorage.getItem("expiry");

        const remaining = expiry - Date.now();

        if (remaining <= 0) {
            clearInterval(interval);
            alert("Session expired.");
            logout();
            return;
        }

        const minutes =
            Math.floor(remaining / 60000);

        const seconds =
            Math.floor((remaining % 60000) / 1000);

        timerElement.innerText =
            "Session expires in: " +
            minutes +
            "m " +
            seconds +
            "s";
    }, 1000);
}

function logout() {
    sessionStorage.clear();
    showLogin();
}