import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useSelector } from "react-redux";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import Avatar from "react-avatar";


function Header() {
  const currentUser = useSelector((state) => {
    return state.userList.loginUser;
  });

  if (currentUser) {
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
             <Avatar
                      className="me-2"
                      name={currentUser.userName}
                      round
                      size="35px"
                    />
            <NavDropdown
              style={{ color: "white" }}
              title={currentUser.userName}
              id="basic-nav-dropdown"
            >
              <Link
                to={"/signin"}
                style={{ color: "white", textDecoration: "none" }}
              >
                Logout
              </Link>
            </NavDropdown>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}

export default Header;
