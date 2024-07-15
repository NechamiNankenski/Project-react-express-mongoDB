import React from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import styled from 'styled-components';
import { useAdminContext } from './AdminContext';

export default function ScheduleForm() {
    const {
        schedule,
        uniqueMovies,
        handleScheduleChange,
        scheduleMovie,
    } = useAdminContext();

    return (
        <StyledForm>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">
                    Select Movie
                </Form.Label>
                <Col sm="10">
                    <Form.Control
                        as="select"
                        name="movieId"
                        value={schedule.movieId}
                        onChange={handleScheduleChange}
                    >
                        <option value="">Select Movie</option>
                        {uniqueMovies.map((movie) => (
                            <option key={movie.movieId} value={movie.movieId}>
                                {movie.title}
                            </option>
                        ))}
                    </Form.Control>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">
                    Date
                </Form.Label>
                <Col sm="10">
                    <Form.Control
                        type="datetime-local"
                        name="date"
                        value={schedule.date}
                        onChange={handleScheduleChange}
                    />
                </Col>
            </Form.Group>
            <Button variant="primary" onClick={scheduleMovie}>
                Schedule
            </Button>
        </StyledForm>
    );
}

const StyledForm = styled(Form)`
  margin-bottom: 1rem;
`;

