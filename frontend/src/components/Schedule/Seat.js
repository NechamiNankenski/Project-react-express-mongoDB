import React from 'react';
import { ListGroup } from 'react-bootstrap';
import styled from 'styled-components';

export default function Seat({ seat, selectedSeat, handleSeatClick }) {
  const isSelected = selectedSeat && selectedSeat.row === seat.row && selectedSeat.number === seat.number;

  return (
    <StyledListGroupItem
      isAvailable={seat.isAvailable}
      isSelected={isSelected}
      onClick={() => seat.isAvailable && handleSeatClick(seat.row, seat.number)}
    >
      <div>Row {seat.row}</div>
      <div>Seat {seat.number}</div>
    </StyledListGroupItem>
  );
}

const StyledListGroupItem = styled(ListGroup.Item)`
  cursor: ${props => (props.isAvailable ? 'pointer' : 'not-allowed')};
  background-color: ${props => 
    props.isAvailable
      ? props.isSelected
        ? 'lightblue'
        : 'white'
      : 'red'
  };
  color: ${props => (props.isAvailable ? 'black' : 'white')};
  text-align: center;
`;
