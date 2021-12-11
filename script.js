const addBookButton = document.querySelector("#add_book");
const submitButton = document.querySelector("#submit_button");
const closeModalButton = document.querySelector("#close_modal_button");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const booksElement = document.querySelector(".books");
const titleInput = document.querySelector('#input_title');
const authorInput = document.querySelector('#input_author');
const pagesInput = document.querySelector('#input_pages');
const requiredText = document.querySelector('.required');
let removeCardButtons;

function Book(title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
}

books = [];

closeModalButton.addEventListener('click', closeModal);

addBookButton.addEventListener('click', () => {
    resetInput();
    if(modal.classList.contains("hidden")) {
        modal.classList.remove("hidden");
        overlay.classList.remove("hidden");
    }
});

submitButton.addEventListener('click', () => {
    let required = [];
    requiredText.innerHTML = "";

    if(titleInput.value === "") {
        required.push("<li>* Enter a valid title</li>");
    }

    if(authorInput.value === "") {
        required.push("<li>* Enter a valid author</li>");
    }

    if(isNaN(pagesInput.value) || pagesInput.value === "" 
    || pagesInput.value < 0 || pagesInput.value.includes(".")) {
        required.push("<li>* Enter a valid number of pages</li>");
    }

    required.forEach((element) => {
        requiredText.innerHTML += element;
    })

    if(required.length === 0) {
        closeModal();
        createBook();
    }
});

function resetInput() {
    titleInput.value = "";
    authorInput.value = "";
    pagesInput.value = "";
    requiredText.innerHTML = "";
}

function closeModal() {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
}

function createBook() {
    let book = new Book(titleInput.value, authorInput.value, pagesInput.value);

    books.push(book);

    createCard(book);
}

function updateRemoveButtons() {
    removeCardButtons = document.querySelectorAll(".card_delete_button");

    removeCardButtons.forEach(button => {
        const card = button.closest(".book_card");
        button.addEventListener('click', button => {
            removeCard(card)});
        }
    );
}

function createCard(book) {
    const newCard = `
        <div class="book_card">
            <div class="card_title">${book.title}</div>
            <div class="card_author">${book.author}</div>
            <div class="card_pages">${book.pages} Pages</div>
            <div class="card_read">
                <p>Finished Reading</p>
                <input type=checkbox>
            </div>
            <button class="card_delete_button">Remove</button>
        </div>
    `;

    booksElement.innerHTML += newCard;
    updateRemoveButtons();
}

function removeCard(card) {
    for(let i=0;i<books.length;i++){
        if(books[i].title === card.firstElementChild.innerHTML) {
            books.splice(i,1);
            booksElement.removeChild(card);
        }
    }
}