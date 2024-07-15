import { useState, useEffect } from 'react';
import { getScreenings } from '../../api/screening';
import { createMovieApi, createSchedule, deleteMovieApi, deleteScreeningApi, updateMovieApi } from '../../api/admin';

export default function useAdmin() {
    const [movies, setMovies] = useState([]);
    const [newMovie, setNewMovie] = useState({ title: '', description: '', duration: '', poster: '' });
    const [schedule, setSchedule] = useState({ movieId: '', date: '' });
    const [editingMovie, setEditingMovie] = useState(null);

    useEffect(() => {
        fetchMovies();
    }, []);

    const fetchMovies = async () => {
        try {
            const response = await getScreenings();
            setMovies(response.data);
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewMovie({ ...newMovie, [name]: value });
    };

    const handleScheduleChange = (e) => {
        const { name, value } = e.target;
        setSchedule({ ...schedule, [name]: value });
    };

    const createMovie = async () => {
        try {
            const response = await createMovieApi(newMovie);
            setMovies([...movies, response.data]);
            setNewMovie({ title: '', description: '', duration: '', poster: '' });
        } catch (error) {
            console.error('Error creating movie:', error);
        }
    };

    const updateMovie = async () => {
        try {
            const response = await updateMovieApi(editingMovie.movieId, newMovie);
            const updatedMovies = movies.map(movie => (movie.movieId === editingMovie.movieId ? response.data : movie));
            setMovies(updatedMovies);
            setNewMovie({ title: '', description: '', duration: '', poster: '' });
            setEditingMovie(null);
        } catch (error) {
            console.error('Error updating movie:', error);
        }
    };

    const deleteMovie = async (id) => {
        try {
            await deleteMovieApi(id);
            setMovies(movies.filter(movie => movie.movieId !== id));
        } catch (error) {
            console.error('Error deleting movie:', error);
        }
    };

    const scheduleMovie = async () => {
        try {
            await createSchedule(schedule.movieId, schedule.date);
            fetchMovies(); // Refresh movies list to show new screening
            setSchedule({ movieId: '', date: '' });
        } catch (error) {
            console.error('Error scheduling movie:', error);
        }
    };

    const deleteScreening = async (movieId, screeningId) => {
        try {
            await deleteScreeningApi(movieId, screeningId);
            fetchMovies(); // Refresh movies list to show the updated screenings
        } catch (error) {
            console.error('Error deleting screening:', error);
        }
    };

    const editMovie = (movie) => {
        setNewMovie({ title: movie.title, description: movie.description, duration: movie.duration, poster: movie.poster });
        setEditingMovie(movie);
    };

    return {
        movies,
        newMovie,
        schedule,
        editingMovie,
        setEditingMovie,
        handleInputChange,
        handleScheduleChange,
        createMovie,
        updateMovie,
        deleteMovie,
        scheduleMovie,
        deleteScreening,
        editMovie
    };
}
