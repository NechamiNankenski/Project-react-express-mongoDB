import React, { createContext, useContext, useState, useEffect } from 'react';
import useAdmin from './useAdmin';

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
    const {
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
    } = useAdmin();

    // יצירת רשימה ייחודית של סרטים
    const uniqueMovies = movies.filter((movie, index, self) => self.findIndex(m => m.movieId === movie.movieId) === index);

    return (
        <AdminContext.Provider value={{
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
            editMovie,
            uniqueMovies
        }}>
            {children}
        </AdminContext.Provider>
    );
};

export const useAdminContext = () => useContext(AdminContext);
