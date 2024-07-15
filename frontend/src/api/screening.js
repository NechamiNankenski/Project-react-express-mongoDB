import axios from 'axios';
import config from '../config';

export async function getScreenings() {
    return await axios.get(`${config.apiBaseUrl}/screenings`);
}

export async function bookSeat(screeningId, selectedSeat) {
    await axios.post(`${config.apiBaseUrl}/screenings/${screeningId}/book`, selectedSeat);
}

export async function getScreening(screeningId) {
    return await axios.get(`${config.apiBaseUrl}/screenings/${screeningId}`);
}