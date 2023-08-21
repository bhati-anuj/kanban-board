import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useSelector } from "react-redux";
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from "react-router-dom";



function Header() {
  const currentUser = useSelector((state) => {
    return state.userList.loginUser;
  });
 

  return (
    <Navbar expand="lg" bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="#home">Kanban Board</Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">About</Nav.Link>
          </Nav>
          <NavDropdown style={{ color: "white" }} title={currentUser.userName} id="basic-nav-dropdown">
            <NavDropdown.Item> <Link to={"/signin"} style={{ color: "white",textDecoration:"none" }}>Logout</Link></NavDropdown.Item>
          </NavDropdown>
        
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
