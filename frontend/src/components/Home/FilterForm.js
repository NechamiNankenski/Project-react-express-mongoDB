import React from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import styled from 'styled-components';

export default function FilterForm({ startDate, setStartDate, endDate, setEndDate, sortOrder, handleSortChange, handleFilterChange }) {
  return (
    <StyledForm>
      <Row className="align-items-end">
        <Col md={3}>
          <Form.Group>
            <Form.Label>Sort by Date</Form.Label>
            <Form.Control as="select" value={sortOrder} onChange={handleSortChange}>
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </Form.Control>
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group>
            <Form.Label>Start Date</Form.Label>
            <Form.Control type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group>
            <Form.Label>End Date</Form.Label>
            <Form.Control type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
          </Form.Group>
        </Col>
        <Col md={3}>
          <Button variant="primary" onClick={handleFilterChange}>Filter</Button>
        </Col>
      </Row>
    </StyledForm>
  );
}

const StyledForm = styled(Form)`
  margin-bottom: 1rem;
  padding: 1rem;
  background-color: #28a745;
  background-opacity: 0.75;
`;
