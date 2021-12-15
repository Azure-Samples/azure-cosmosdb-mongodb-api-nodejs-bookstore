import { useState, useEffect, useRef } from 'react';

export const useGenresListVisible = (initialIsVisible, genre) => {
    const [isGenreListVisible, setIsGenreListVisible] = useState(initialIsVisible);
    const ref = useRef(null);

    const handleClickOutside = (event) => {
        if (ref.current && ref.current.contains(event.target)) {
            setIsGenreListVisible(true);
        } else {
            setIsGenreListVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    });

    useEffect(() => {
        setIsGenreListVisible(false);
    }, [genre]);
    
    return { ref, isGenreListVisible, setIsGenreListVisible };
}