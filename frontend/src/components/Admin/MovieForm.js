import React from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import styled from 'styled-components';
import { useAdminContext } from './AdminContext';

export default function MovieForm() {
    const {
        newMovie,
        handleInputChange,
        createMovie,
        updateMovie,
        editingMovie,
        cancelEdit,
    } = useAdminContext();

    return (
        <StyledForm>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">
                    Title
                </Form.Label>
                <Col sm="10">
                    <Form.Control
                        type="text"
                        name="title"
                        value={newMovie.title}
                        onChange={handleInputChange}
                        placeholder="Title"
                    />
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">
                    Description
                </Form.Label>
                <Col sm="10">
                    <Form.Control
                        type="text"
                        name="description"
                        value={newMovie.description}
                        onChange={handleInputChange}
                        placeholder="Description"
                    />
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">
                    Duration
                </Form.Label>
                <Col sm="10">
                    <Form.Control
                        type="number"
                        name="duration"
                        value={newMovie.duration}
                        onChange={handleInputChange}
                        placeholder="Duration"
                    />
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">
                    Poster URL
                </Form.Label>
                <Col sm="10">
                    <Form.Control
                        type="text"
                        name="poster"
                        value={newMovie.poster}
                        onChange={handleInputChange}
                        placeholder="Poster URL"
                    />
                </Col>
            </Form.Group>
            <Button variant="primary" onClick={editingMovie ? updateMovie : createMovie}>
                {editingMovie ? 'Update' : 'Create'}
            </Button>
            {editingMovie && (
                <Button variant="secondary" className="ml-2" onClick={cancelEdit}>
                    Cancel
                </Button>
            )}
        </StyledForm>
    );
}

const StyledForm = styled(Form)`
  margin-bottom: 1rem;
`;