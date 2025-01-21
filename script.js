const myLibrary = [];

function Book(author, title, pages, read) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(author, title, pages, read) {
    const book = new Book(author, title, pages, read);
    myLibrary.push(book);
}

function updateView() {
    const booklist = document.querySelector(".book-list");
    booklist.innerHTML = "";

    if (myLibrary.length === 0) {
        const empty_title = document.createElement("h3");
        empty_title.textContent = "Empty";
        const empty_comment = document.createElement("p");
        empty_comment.textContent = "You haven't added any books yet";
        booklist.appendChild(empty_title);
        booklist.appendChild(empty_comment);

        return;
    }

    myLibrary.forEach((book, index) => {
        const card = document.createElement("div");
        card.classList.add("book-card");
        card.dataset.index = index;

        const title = document.createElement("h3");
        title.textContent = book.title;
        card.appendChild(title);

        const author = document.createElement("p");
        author.textContent = book.author;
        card.appendChild(author);

        const pages = document.createElement("p")
        pages.textContent = book.pages;
        card.appendChild(pages);

        const read = document.createElement("input");
        read.type = "checkbox";
        read.checked = book.read;
        card.appendChild(read);

        const deletebtn = document.createElement("button");
        deletebtn.textContent = "Delete";
        deletebtn.addEventListener("click", () => {
            myLibrary.splice(index, 1);
            updateView();
        });

        booklist.appendChild(card);
    });
}

// addBookToLibrary("J.K. Rowling", "Harry Potter and the Philosopher's Stone", 223, true);

const dialog = document.querySelector("dialog");
const showButton = document.querySelector(".add-book-btn");
const closeButton = document.querySelector(".cancel-btn");

showButton.addEventListener("click", () => {
  dialog.showModal();
});

closeButton.addEventListener("click", () => {
  dialog.close();
});

updateView();