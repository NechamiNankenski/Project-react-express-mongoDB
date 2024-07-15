import React from 'react';
import { Card } from 'react-bootstrap';
import styled from 'styled-components';

export default function ScreeningInfo({ screening }) {
  return (
    <StyledCard>
      <Card.Body>
        <Card.Text><strong>Description: </strong>{screening.description}</Card.Text>
        <Card.Text><strong>Duration: </strong>{screening.duration} minutes</Card.Text>
        <Card.Text><strong>Date: </strong>{new Date(screening.date).toLocaleString()}</Card.Text>
      </Card.Body>
    </StyledCard>
  );
}

const StyledCard = styled(Card)`
  background-color: #28a745;
  background-opacity: 0.75;
`;
