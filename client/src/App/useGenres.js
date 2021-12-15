import { useState, useEffect } from 'react';

export const useGenres = (genre) => {
    const [genreInput, setGenreInput] = useState("");
    const [autocompleteGenresList, setAutocompleteGenresList] = useState([]);

    useEffect(() => {
        const loadGenres = async () => {
            const response = await fetch("/genres?searchString="+genreInput);
            const genres = await response.json();
            setAutocompleteGenresList(genres);
        }
        loadGenres();
    }, [genreInput]);

    useEffect(() => {
        setGenreInput("");
    },[genre])
  
    return {genreInput, setGenreInput, autocompleteGenresList};
}