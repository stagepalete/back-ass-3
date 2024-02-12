$(document).ready(function () {

    $('#saveBookButton').on('click', (event) => {
        event.preventDefault();
    
        const title = $('#title').val();
        const author = $('#author').val();
        const isbn = $('#isbn').val();
    
        const book = { title, author, isbn };
    
        $.ajax({
            type: 'POST',
            url: '/admin/books/add_book',
            data: book,
            success: function(response) {
                console.log('Book added successfully:', response);
                 },
            error: function(xhr, status, error) {
                console.error('Error adding book:', error);
            }
        });
    });
    

    $('.updateButtons').on('click', (event) => {
        event.preventDefault();
    
        const bookId = $(event.target).data('id');
    
        const updatedTitle = $('#title' + bookId).val();
        const updatedAuthor = $('#author' + bookId).val();
        const genre = $('#genre' + bookId).val().split(', ');
        
        const updatedBook = {
            title: updatedTitle,
            author: updatedAuthor,
            genre: genre
        };
    
        $.ajax({
            type: 'PUT',
            url: '/admin/books/' + bookId,
            data: updatedBook,
            success: function(response) {
                console.log('Book updated successfully:', response);
            },
            error: function(xhr, status, error) {
                console.error('Error updating book:', error);
            }
        });
    });
    

    $('.DeleteBookBtn').on('click', (event) => {
        event.preventDefault();
    
        const bookId = $(event.target).data('id');
    
        if (!confirm('Are you sure you want to delete this book?')) {
            return; 
        }
    
        $.ajax({
            type: 'DELETE',
            url: '/admin/books/' + bookId,
            success: function(response) {
                console.log('Book deleted successfully:', response.message);
             },
            error: function(xhr, status, error) {
                console.error('Error deleting book:', error);
                
            }
        });
    });
    
})