import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Navbar, Nav, Container, NavDropdown, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'; // npm i react-router-bootstrap
import { useGamification } from '../../hooks/useGamification'; // Optional hearts/coins
import './NavBar.css'; // Custom styles below

function NavBar() {
  const { user, logout, token } = useAuth();
  const { hearts, coins } = useGamification();

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top" className="lynqo-navbar">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>
            <strong>Lynqo</strong> 🦉
          </Navbar.Brand>
        </LinkContainer>

        <Navbar.Toggle aria-controls="lynqo-nav" />
        <Navbar.Collapse id="lynqo-nav">
          <Nav className="me-auto">
            <LinkContainer to="/main">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/news">
              <Nav.Link>News</Nav.Link>
            </LinkContainer>
            {user ? (
              <>
                <LinkContainer to="/dashboard">
                  <Nav.Link>Dashboard</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/leaderboard">
                  <Nav.Link>Leaderboard</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/shop">
                  <Nav.Link>Shop</Nav.Link>
                </LinkContainer>
              </>
            ) : null}
          </Nav>

          <Nav>
            {user ? (
              <>
                <NavDropdown title={`👤 ${user.DisplayName}`} id="user-dropdown" align="end">
                  <LinkContainer to="/settings">
                    <NavDropdown.Item>Settings</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                </NavDropdown>
                <span className="user-stats mx-2">
                  ❤️{hearts} 💰{coins}
                </span>
              </>
            ) : (
              <>
                <LinkContainer to="/login">
                  <Nav.Link>Login</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/register">
                  <Button variant="outline-light" size="sm">Register</Button>
                </LinkContainer>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
