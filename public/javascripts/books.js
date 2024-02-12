$(document).ready(function () {
    async function fetchBooks() {
        try {
            const response = await fetch('/api/books/');
            const books = await response.json();
            return books;
        } catch (error) {
            console.error('Error fetching books:', error);
            return [];
        }
    }

    async function displayBooks() {
        const books = await fetchBooks();
        const bookList = document.getElementById('bookList');
        bookList.innerHTML = '';

        books.forEach(book => {
            const bookItem = document.createElement('div');
            bookItem.classList.add('col-md-3', 'card', 'p-2', 'm-2');
            bookItem.innerHTML = `
                    <img src="book-cover.jpg" class="card-img-top" alt="Book Cover">
                    <div class="card-body">
                        <h5 class="card-title">${book.title}</h5>
                        <p class="card-text">Author: ${book.author} Name</p>
                        <p class="card-text">Genre: ${book.genre.join(', ')}</p>
                        <p class="card-text">Published: ${book.published}</p>
                        <a href="#" class="btn btn-primary w-100">Read More</a>
                    </div>
          `;
            bookList.appendChild(bookItem);
        });
    }

    function searchBooks() {
        console.log('wef');
        const searchInput = document.getElementById('searchInput').value.toLowerCase();
        const bookCards = document.querySelectorAll('.card');
        bookCards.forEach(card => {
            const title = card.querySelector('.card-title').textContent.toLowerCase();
            if (title.includes(searchInput)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    
    $('#searchButton').on('click', searchBooks);
    displayBooks();
})