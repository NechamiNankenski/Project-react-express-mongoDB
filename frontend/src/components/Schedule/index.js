import React from 'react';
import { Container, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import useSchedule from './useSchedule';
import ScreeningInfo from './ScreeningInfo';
import Seating from './Seating';

export default function Schedule() {
  const {
    screening,
    selectedSeat,
    handleSeatClick,
    handleBookSeat
  } = useSchedule();

  if (!screening) return <div>Loading...</div>;

  return (
    <Container>
      <h1 className="my-4">{screening.title}</h1>
      <ScreeningInfo screening={screening} />
      <h2 className="my-4">Seating Chart</h2>
      <Seating 
        screening={screening} 
        selectedSeat={selectedSeat} 
        handleSeatClick={handleSeatClick} 
      />
      <Button
        variant="primary"
        className="m-3"
        onClick={handleBookSeat}
        disabled={!selectedSeat}
      >
        Book Seat
      </Button>
    </Container>
  );
}
