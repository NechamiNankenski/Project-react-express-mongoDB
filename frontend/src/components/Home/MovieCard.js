import React from 'react';
import { Card, ListGroup, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export default function MovieCard({ screening }) {
  return (
    <Col className='p-0' md={4}>
      <ListGroup.Item className='border border-light'>
        <Link to={`/schedule/${screening.screeningId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <StyledCard>
            <Card.Body>
              <Card.Title>{screening.title}</Card.Title>
              <Card.Text>{new Date(screening.date).toLocaleString()}</Card.Text>
            </Card.Body>
          </StyledCard>
        </Link>
      </ListGroup.Item>
    </Col>
  );
}

const StyledCard = styled(Card)`
  background-color: #ffc107;
  background-opacity: 0.75;
  border: 1px solid #f8f9fa;
`;
