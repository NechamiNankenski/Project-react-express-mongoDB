import React from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import styled from 'styled-components';
import ScreeningList from './ScreeningList';
import { useAdminContext } from './AdminContext';

export default function MovieList() {
    const {
        uniqueMovies,
        movies,
        editMovie,
        deleteMovie,
        deleteScreening,
    } = useAdminContext();
    return (
        <>
            {uniqueMovies && uniqueMovies.length > 0 ? (
                uniqueMovies.map((movie) => {
                    const movieScreenings = movies.filter(
                        (x) => x.movieId === movie.movieId
                    );

                    return (
                        <StyledCard key={movie.movieId}>
                            <StyledCardHeader>
                                <Row>
                                    <Col>{movie.title}</Col>
                                    <Col className="text-end">
                                        <a
                                            href="#top"
                                            className="btn btn-warning"
                                            onClick={() => editMovie(movie)}
                                        >
                                            Edit
                                        </a>
                                        <Button
                                            variant="danger"
                                            className="ml-2"
                                            onClick={() => deleteMovie(movie.movieId)}
                                        >
                                            Delete
                                        </Button>
                                    </Col>
                                </Row>
                            </StyledCardHeader>
                            <StyledCardBody>
                                <p>{movie.description}</p>
                                <p>Duration: {movie.duration} minutes</p>
                                {movieScreenings && movieScreenings.filter(x => x.screeningId).length === 0 ?
                                    <p>No Schedule</p> :
                                    <ScreeningList movieId={movie.movieId} screenings={movieScreenings} deleteScreening={deleteScreening} />}
                            </StyledCardBody>
                        </StyledCard>
                    );
                })
            ) : (
                <p>No movies available</p>
            )}
        </>
    );
}

const StyledCard = styled(Card)`
  margin-bottom: 1rem;
`;

const StyledCardHeader = styled(Card.Header)`
  background-color: #ffc107;
  color: white;
  padding: 1rem;
  background-opacity: 0.75;
`;

const StyledCardBody = styled(Card.Body)`
  border: 1px solid #ffc107;
`;
