import axios from 'axios';
import config from '../config';

export async function createMovieApi(newMovie) {
    return await axios.post(`${config.apiBaseUrl}/admin`, newMovie);
}

export async function updateMovieApi(movieId, newMovie) {
    return await axios.put(`${config.apiBaseUrl}/admin/${movieId}`, newMovie);
}

export async function deleteMovieApi(id) {
    await axios.delete(`${config.apiBaseUrl}/admin/${id}`);
}

export async function createSchedule(movieId, date) {
    await axios.post(`${config.apiBaseUrl}/admin/${movieId}/screenings`, { date: date });
}

export async function deleteScreeningApi(movieId, screeningId) {
    await axios.delete(`${config.apiBaseUrl}/admin/${movieId}/screenings/${screeningId}`);
}