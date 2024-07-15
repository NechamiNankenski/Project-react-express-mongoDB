import React from 'react';
import { Container, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import ScheduleForm from './ScheduleForm';
import MovieList from './MovieList';
import MovieForm from './MovieForm';
import { AdminProvider, useAdminContext } from './AdminContext';

const AdminContent = () => {
    const { editingMovie } = useAdminContext();

    return (
        <StyledContainer>
            <h1 className="my-4">Admin Page</h1>

            <StyledCard>
                <StyledCardHeader>
                    {editingMovie ? 'Edit Movie' : 'Create Movie'}
                </StyledCardHeader>
                <StyledCardBody>
                    <MovieForm />
                </StyledCardBody>
            </StyledCard>

            <StyledCard>
                <StyledCardHeader>Schedule Movie</StyledCardHeader>
                <StyledCardBody>
                    <ScheduleForm />
                </StyledCardBody>
            </StyledCard>

            <MovieList />
        </StyledContainer>
    );
};

export default function Admin() {
    return (
        <AdminProvider>
            <AdminContent />
        </AdminProvider>
    );
}

const StyledContainer = styled(Container)`
  margin-top: 2rem;
`;

const StyledCard = styled(Card)`
  margin-bottom: 1rem;
`;

const StyledCardHeader = styled(Card.Header)`
  background-color: #28a745;
  color: white;
  padding: 1rem;
  background-opacity: 0.75;
`;

const StyledCardBody = styled(Card.Body)`
  border: 1px solid #28a745;
`;
