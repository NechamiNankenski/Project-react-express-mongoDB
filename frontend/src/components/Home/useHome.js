import { useEffect, useState } from 'react';
import { getScreenings } from '../../api/screening';

export default function useHome() {
    const [movies, setMovies] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');

    useEffect(() => {
        fetchMovies();
    }, []);

    const fetchMovies = async () => {
        try {
            const response = await getScreenings();
            setMovies(response.data);
            setFilteredMovies(response.data);
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    };

    const handleSortChange = (e) => {
        setSortOrder(e.target.value);
        sortMovies(e.target.value);
    };

    const sortMovies = (order) => {
        const sortedMovies = [...filteredMovies].sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return order === 'asc' ? dateA - dateB : dateB - dateA;
        });
        setFilteredMovies(sortedMovies);
    };

    const handleFilterChange = () => {
        const filtered = movies.filter(movie => {
            const movieDate = new Date(movie.date);
            const start = startDate ? new Date(startDate) : new Date('1900-01-01');
            const end = endDate ? new Date(endDate) : new Date('2100-12-31');
            return movieDate >= start && movieDate <= end;
        });
        setFilteredMovies(filtered);
    };

    return {
        filteredMovies,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        sortOrder,
        handleSortChange,
        handleFilterChange
    };

}