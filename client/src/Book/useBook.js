import { useState, useEffect } from 'react';

export const useBook = (url) => {
    const [book, setBook] = useState('');

    useEffect(() => {
        const loadBook = async () => {
            const response = await fetch(url);
            const book = await response.json();
            setBook(book);
        }
        loadBook();
    }, [url, book]);

    return { book, setBook };
}