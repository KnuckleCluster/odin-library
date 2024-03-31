const modal = document.querySelector('.modal');
const openModal = document.querySelector('.open-modal');
const closeModal = document.querySelector('#close-modal');
const addBookButton = document.querySelector('#add-book');
const bookListContainer = document.querySelector('.book-container');
const bookform = document.querySelector('.modalinput');

const myLibrary = [];

function Book(title, author, year, pages, doneReading) {
    this.id = myLibrary.length + 1;
    this.title = title;
    this.author = author;
    this.year = year;
    this.pages = pages;
    this.doneReading = doneReading;
}

function createBookFromInput() {
    const title = document.querySelector(".title").value;
    const author = document.querySelector(".author").value;
    const year = parseInt(document.querySelector(".year").value);
    const pages = parseInt(document.querySelector(".pages").value);
    const doneReading = document.querySelector(".status").checked;

    const newBook = new Book(title, author, year, pages, doneReading);
    
    myLibrary.push(newBook);
    
    modal.close();

    // Update the book list UI
    updateBookListUI();
}

function deleteBookById(bookId) {
    const index = myLibrary.findIndex(book => book.id === bookId);
    if (index !== -1) {
        myLibrary.splice(index, 1);
        // Update the book list UI after deletion
        updateBookListUI();
    }
}

function updateBookListUI() {
    bookListContainer.innerHTML = ''; // Clear the book list container
    myLibrary.forEach(book => {
        const bookItem = document.createElement('div');
        bookItem.classList.add('book-card');

        const titleElement = document.createElement('h2');
        titleElement.classList.add('card-title');
        titleElement.textContent = book.title;

        const deetsElement = document.createElement('div');
        deetsElement.classList.add('card-deets');
        deetsElement.innerHTML = `<p><i>${book.author}</i>,</p><p>${book.year}</p>`;

        const pagesElement = document.createElement('p');
        pagesElement.classList.add('card-pages');
        pagesElement.textContent = `${book.pages} pages`;

        const statusElement = document.createElement('label');
        statusElement.classList.add('card-status');
        statusElement.innerHTML = `Done reading? <input class="status-tick" type="checkbox" ${book.doneReading ? 'checked' : ''}>`;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => {
            deleteBookById(book.id);
        });

        const btnCont = document.createElement('div');
        btnCont.classList.add('btn-cont');
        btnCont.appendChild(deleteBtn);

        bookItem.appendChild(titleElement);
        bookItem.appendChild(deetsElement);
        bookItem.appendChild(pagesElement);
        bookItem.appendChild(statusElement);
        bookItem.appendChild(btnCont);

        bookListContainer.appendChild(bookItem);
    });
}

openModal.addEventListener('click', () => {
    modal.showModal();
});

closeModal.addEventListener('click', () => {
    
    modal.close();
    bookform.reset();
});

addBookButton.addEventListener('click', () => {
    
    createBookFromInput();
    bookform.reset();
});

console.log(myLibrary);
