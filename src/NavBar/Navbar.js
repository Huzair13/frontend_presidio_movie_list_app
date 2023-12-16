import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container } from 'react-bootstrap';
import '../CustomStyles/styles.css';

const AppNavbar = () => {
  return (
    <Navbar className="custom-navbar custom-dark-olive" expand="md">
        <Container>
      <Navbar.Brand as={Link} to="/" className="ml-auto custom-navbar-brand title2">Movie List Application</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link as={Link} to="/" className="text-light">Home</Nav.Link>
          <Nav.Link as={Link} to="/add-movie" className="text-light">Add Movie</Nav.Link>
          <Nav.Link as={Link} to="/update-movie" className="text-light">Update Movie</Nav.Link>
        </Nav>
      </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
