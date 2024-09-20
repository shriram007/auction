import React, { useState ,useEffect} from 'react';
import { Navbar,Nav,NavDropdown ,Container} from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';

const NavBar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(true);

    
      
  return (
    <div>
        <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">eAuction</Navbar.Brand>
          <Nav className="me-auto">
           <Nav.Link as={Link} to="/pro">Product Register</Nav.Link> 
            <Nav.Link as={Link} to="/products" >Product Details</Nav.Link>
            <Nav.Link as={Link} to="/chart" >Charts</Nav.Link>
            <Nav.Link  as={Link} to="/" >Logout</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  )
}

export default NavBar