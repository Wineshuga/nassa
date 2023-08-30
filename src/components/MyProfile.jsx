// import React from 'react';
import { useSelector } from 'react-redux';
import { Container, ListGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/rockets.css';

const Rocket = () => {
  const rockets = useSelector((state) => state.rockets);
  const myRockets = rockets.RocketList.filter((rocket) => rocket.reserved === true);
  if (myRockets.length === 0) {
    return (
      <Container>
        <h3>My Rockets</h3>
        You have not reserved any rockets.
      </Container>
    );
  }
  return (
    <Container>
      <h3>My Rockets</h3>
      <ListGroup as="ol" numbered>
        {myRockets.map((rocket) => (
          <ListGroup.Item as="li" key={rocket.id}>{rocket.name}</ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

const MyProfile = () => (
  <Container className="d-flex">
    <Rocket />
  </Container>
);

export default MyProfile;
