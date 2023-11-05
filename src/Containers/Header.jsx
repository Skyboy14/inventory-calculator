import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link, Outlet } from "react-router-dom";
import './StyleSheet/Header.css';
import logo from "../Assets/Images/1-1.png"
import { useState } from "react";
import styled from '@emotion/styled';

const SignOutStyledLink = styled(Link)`
    font-size: medium;
    color: aliceblue;
    text-decoration: none;
    padding: 0 5px;

     &:hover {
    color:grey;
  }
    `;
const StyledLink = styled(Link)`
    font-size: large;
    color: aliceblue;
    text-decoration: none;
    padding: 0 5px;
    &:hover {
    color:grey;
  }
    `;

function HomePageNav() {
  const [signIn, setSignIn] = useState(true)
  let Admin = true;
  let expand = 'sm'
  return (
    <>
      <Navbar key={expand} bg="dark" variant="dark" expand={expand} className="mb-3 header">
        <Container fluid>
          <Navbar.Brand>
            <img
              src={logo}
              className="d-inline-block align-top LogoStyle"
              alt="Alex's Logo"
            /></Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-${expand}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                Alex's Home Furnishings
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="me-auto">
                {signIn ? (<>
                  {!Admin ? (<StyledLink to="/Calculator">Calculator</StyledLink>) :
                    (<>
                      <StyledLink to="/Calculator">Calculator</StyledLink>
                      <StyledLink to="/UpdateScreen">Appliances/Furniture</StyledLink>
                      <StyledLink to="/UserMaster">UserMaster</StyledLink>
                    </>)}
                </>) : ('')
                }
              </Nav>
              {signIn ? (
                <Nav className="ms-auto">
                  <SignOutStyledLink to="/">SignOut</SignOutStyledLink>
                </Nav>
              ) : (
                ''
              )}
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
}

export default HomePageNav;