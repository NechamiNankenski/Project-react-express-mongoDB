import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ListGroup, Row, Col, Button } from 'react-bootstrap';

export default function ScreeningList({ movieId, screenings, deleteScreening }) {
    return (
        <ListGroup>
            {screenings?.map(screening => (
                <ListGroup.Item className='border border-warning m-2' key={screening.screeningId}>
                    <Row>
                        <Col>{new Date(screening.date).toLocaleString()}</Col>
                        <Col className="text-end">
                            <Button
                                variant="outline-danger"
                                size="sm"
                                onClick={() => deleteScreening(movieId, screening.screeningId)}
                            >
                                Cancel
                            </Button>
                        </Col>
                    </Row>
                </ListGroup.Item>
            ))}
        </ListGroup>
    );
}
