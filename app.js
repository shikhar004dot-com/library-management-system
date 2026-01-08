async function displayBooks(){
    const response = await fetch("http://localhost:8000/library-read");
    const result = await response.json();
    const bookList = document.getElementById("bookList");
    bookList.innerHTML = "";
    result.data.forEach((book, index) => {
        bookList.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>${book.status}</td>
                <td>
                    <button onclick="issueBook('${book._id}')">Issue</button>
                    <button onclick="returnBook('${book._id}')">Return</button>
                    <button onclick="deleteBook('${book._id}')">Delete</button>
                </td>
            </tr>
        `;
    });
}
async function addBook(){
    const title = document.getElementById("title").value.trim();
    const author = document.getElementById("author").value.trim();
    if (title === "" || author === "") {
        alert("Please fill out both fields.");
        return;
    }
    await fetch("http://localhost:8000/library-insert", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ title, author })
    });
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    displayBooks();
}
async function issueBook(id) {
    await fetch(`http://localhost:8000/library-update/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({status:"Issued"})
    });
    displayBooks();
}
async function returnBook(id) {
    await fetch(`http://localhost:8000/library-update/${id}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body:JSON.stringify({status:"Available"})
    });
    displayBooks();
}
async function deleteBook(id) {
    if (confirm("Are you sure you want to delete this book?")) {
        await fetch(`http://localhost:8000/library-delete/${id}`, {
            method: "DELETE"
        });
        displayBooks();
    }
}
async function clearAll() {
    if(!confirm("Are you sure you want to clear all entries?")) {
        return;
    }
    await fetch("http://localhost:8000/library-clearall", {
        method: "DELETE"
    });
    const bookList = document.getElementById("bookList");
    bookList.innerHTML = "";
}
window.onload = displayBooks;
