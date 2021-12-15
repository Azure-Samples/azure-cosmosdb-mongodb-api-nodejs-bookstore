import { useState, useEffect } from 'react';

export const useNavbarFilters = () => {
    const [rating, setRating] = useState(0);
    const [format, setFormat] = useState("");
    const [genre, setGenre] = useState("");
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        setRating(0);
        setFormat("");
        setGenre("");
    }, [searchText])
  
    return { rating, setRating, format, setFormat, searchText, setSearchText, genre, setGenre};
}