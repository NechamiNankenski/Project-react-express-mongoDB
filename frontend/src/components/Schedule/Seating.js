import React from 'react';
import { Row, Col, ListGroup } from 'react-bootstrap';
import styled from 'styled-components';
import Seat from './Seat';

export default function Seating({ screening, selectedSeat, handleSeatClick }) {
  return (
    <StyledRow>
      {screening.seats.map((seat, index) => (
        <Col key={index} xs={12} sm={6} md={4} lg={1} className="mb-3">
          <Seat
            seat={seat}
            selectedSeat={selectedSeat}
            handleSeatClick={handleSeatClick}
          />
        </Col>
      ))}
    </StyledRow>
  );
}

const StyledRow = styled(Row)`
  background-color: #ffc107; 
  padding: 1rem;
  background-opacity: 0.75;
`;