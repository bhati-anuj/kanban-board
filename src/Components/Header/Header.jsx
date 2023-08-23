import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useDispatch, useSelector } from "react-redux";
import NavDropdown from "react-bootstrap/NavDropdown";
import Dropdown from 'react-bootstrap/Dropdown';
import { useNavigate } from "react-router-dom";
import Avatar from "react-avatar";
import { logoutUser } from "../../Store/ListSlice/UserSlice";



function Header() {
  const currentUser = useSelector((state) => {
    return state.userList.loginUser;
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLogout(){
    dispatch(logoutUser(false));
    navigate("/signin")

  }

  if (currentUser) {
    return (
      <Navbar expand="lg" bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Kanban Board</Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#">Home</Nav.Link>
              <Nav.Link href="#">About</Nav.Link>
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
              <Dropdown.Item
                onClick={handleLogout}
                style={{ color: "white", textDecoration: "none" }}
              >
                Logout
              </Dropdown.Item>
            </NavDropdown>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}

export default Header;
