let books = JSON.parse(localStorage.getItem("books")) || [
    { title: "Harry Potter", category: "fiction" },
    { title: "Physics Basics", category: "education" },
    { title: "Short Stories", category: "story" },
    { title: "Math Guide", category: "education" },
    { title: "Jungle Book", category: "story" },
    { title: "English Grammar", category: "education" },
    { title: "Fairy Tales", category: "story" },
    { title: "Science World", category: "education" },
    { title: "Adventure Time", category: "fiction" },
    { title: "Mystery Novel", category: "fiction" }
];

let history = JSON.parse(localStorage.getItem("history")) || [];

displayBooks();
displayHistory();

function saveData() {
    localStorage.setItem("books", JSON.stringify(books));
    localStorage.setItem("history", JSON.stringify(history));
}

function addBook() {
    let title = document.getElementById("title").value;
    let category = document.getElementById("category").value;

    if (title === "" || category === "") {
        alert("Fill all fields");
        return;
    }

    books.push({ title, category: category.toLowerCase() });
    saveData();
    displayBooks();

    document.getElementById("title").value = "";
    document.getElementById("category").value = "";
}

function displayBooks(filtered = books) {
    let container = document.getElementById("bookList");
    container.innerHTML = "";

    filtered.forEach((book, index) => {
        let card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <h3>${book.title}</h3>
            <p>${book.category}</p>
            <button onclick="borrowBook(${index})">Borrow</button>
        `;

        container.appendChild(card);
    });
}

function searchBook() {
    let value = document.getElementById("search").value.toLowerCase();
    let filtered = books.filter(b => b.title.toLowerCase().includes(value));
    displayBooks(filtered);
}

function filterCategory() {
    let cat = document.getElementById("categoryFilter").value;

    if (cat === "all") return displayBooks();

    let filtered = books.filter(b => b.category === cat);
    displayBooks(filtered);
}

function borrowBook(index) {
    history.push(books[index]);
    saveData();
    displayHistory();
}

function displayHistory() {
    let list = document.getElementById("historyList");
    list.innerHTML = "";

    history.forEach((book, i) => {
        let li = document.createElement("li");
        li.innerHTML = `
            ${book.title} (${book.category})
            <button onclick="deleteHistory(${i})">❌</button>
        `;
        list.appendChild(li);
    });
}

function deleteHistory(i) {
    history.splice(i, 1);
    saveData();
    displayHistory();
}

function toggleDarkMode() {
    document.body.classList.toggle("dark");
}
function sendEmail() {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let message = document.getElementById("message").value;

    if (name === "" || email === "" || message === "") {
        alert("Please fill all fields");
        return;
    }

    let subject = "Library Contact from " + name;
    let body = "Name: " + name + "%0AEmail: " + email + "%0A%0AMessage:%0A" + message;

    window.location.href = `mailto:faryalfatima956@gmail.com?subject=${subject}&body=${body}`;
}