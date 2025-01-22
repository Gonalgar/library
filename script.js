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
        const empty_div = document.createElement("div");
        empty_div.classList.add("empty-comment");
        const empty_title = document.createElement("h3");
        empty_title.textContent = "Empty";
        const empty_comment = document.createElement("p");
        empty_comment.textContent = "You haven't added any books yet";
        empty_div.appendChild(empty_title);
        empty_div.appendChild(empty_comment);
        booklist.appendChild(empty_div);

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
        pages.textContent = book.pages + " pages";
        card.appendChild(pages);

        const readIcon = document.createElement("img");
        readIcon.src = book.read ? "icons/bookmark.svg" : "icons/bookmark-outline.svg";

        const buttons = document.createElement("div");
        buttons.classList.add("buttons");

        const read = document.createElement("button");
        read.addEventListener("click", () => {
            myLibrary[index].read = !myLibrary[index].read;
            updateView();
        });
        let btntitle = book.read? "Mark as unread" : "Mark as read";
        read.setAttribute("title", btntitle);
        read.appendChild(readIcon);
        buttons.appendChild(read);

        const deleteIcon = document.createElement("img");
        deleteIcon.src = "icons/delete-outline.svg";

        const deletebtn = document.createElement("button");
        deletebtn.appendChild(deleteIcon);
        deletebtn.setAttribute("title", "Delete Book");
        deletebtn.addEventListener("click", () => {
            myLibrary.splice(index, 1);
            updateView();
        });
        buttons.appendChild(deletebtn);
    
        card.appendChild(buttons);
        booklist.appendChild(card);
    });
}

document.getElementById("add-book-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const name = this.elements["name"].value.trim();
    const author = this.elements["author"].value.trim();
    const pages = this.elements["pages"].value.trim();
    const read = this.elements["read"].checked;

    if (!name || !author || !pages || isNaN(pages) || pages <= 0) {
        return;
    }

    addBookToLibrary(author, name, parseInt(pages), read);
    updateView();
    dialog.close();
    this.reset();
});

addBookToLibrary("J.K. Rowling", "Harry Potter and the Philosopher's Stone", 223, true);

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