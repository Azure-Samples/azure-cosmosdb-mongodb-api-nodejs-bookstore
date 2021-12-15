import React from 'react';

export const BooksList = ({isLoading, books, ListItemComponent}) => {

    if (isLoading) {
        return <p>Loading...</p>
    }

    const booksMap = books.map(book => (
        <ListItemComponent key={book._id ? book._id : book.doc_id} book={book} />));
    
    return <section className="books" id="books"><ul>{booksMap}</ul></section>

}
