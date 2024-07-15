import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { bookSeat, getScreening } from '../../api/screening';

export default function useSchedule() {
  const { screeningId } = useParams();
  const [screening, setScreening] = useState(null);
  const [selectedSeat, setSelectedSeat] = useState(null);

  useEffect(() => {
    fetchScreening();
  }, []);

  const fetchScreening = async () => {
    try {
      const response = await getScreening(screeningId);
      setScreening(response.data);
    } catch (error) {
      console.error('Error fetching screening:', error);
    }
  };

  const handleSeatClick = (row, number) => {
    if (selectedSeat && selectedSeat.row === row && selectedSeat.number === number) {
      // Unselect the seat if it's already selected
      setSelectedSeat(null);
    } else {
      // Select the new seat
      setSelectedSeat({ row, number });
    }
  };

  const handleBookSeat = async () => {
    try {
      if (selectedSeat) {
        await bookSeat(screeningId, selectedSeat);
        alert('Seat booked successfully');
        fetchScreening(); // Refresh the seating chart
        setSelectedSeat(null); // Reset selected seat
      }
    } catch (error) {
      console.error('Error booking seat:', error);
    }
  };

  return {
    screening,
    selectedSeat,
    handleSeatClick,
    handleBookSeat
  }
};