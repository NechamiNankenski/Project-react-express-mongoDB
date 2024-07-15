import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, ListGroup } from 'react-bootstrap';
import useHome from './useHome';
import FilterForm from './FilterForm';
import MovieCard from './MovieCard';

export default function Home() {
  const {
    filteredMovies,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    sortOrder,
    handleSortChange,
    handleFilterChange
  } = useHome();

  return (
    <Container>
      <h1 className="my-4">Scheduled Movies</h1>
      <FilterForm
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        sortOrder={sortOrder}
        handleSortChange={handleSortChange}
        handleFilterChange={handleFilterChange}
      />
      <ListGroup>
        <Row>
          {filteredMovies && filteredMovies.length > 0 && filteredMovies.map((screening) => (
            <MovieCard key={screening.screeningId} screening={screening} />
          ))}
        </Row>
      </ListGroup>
    </Container>
  );
}
