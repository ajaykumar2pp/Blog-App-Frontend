import React from 'react'
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useNavigate,NavLink } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Icon from "../images/blog-logo.png"

const NavbarComp = () => {

  const NavLinkCss = ({ isActive }) => {
    return {
      fontSize: isActive ? "18px" : "18px",
      color: isActive ? "blue" : "black",
      borderBottom: isActive ? "2px solid blue" : "",

    }
  }

  const auth = JSON.parse(localStorage.getItem("user"));
  // console.log(auth)

  if (auth ) {
    const username = auth.username;
    const email = auth.email;

    console.log(`Username: ${username}`);
    console.log(`Email: ${email}`);
  } else {
    console.log("User data not found in localStorage");
  }

    // console.log(auth)
    const navigate = useNavigate();
    const logout = () => {
      console.log("user logout");
      toast.success('User Logout Successfully!');
      localStorage.clear();
      navigate("/register");
    };
  return (
  
<div>
<Navbar expand="lg" bg="light" data-bs-theme="light" >
      <Container>
      <NavLink to="/" className="navbar-brand fw-semibold text-danger">
            <img
              alt="blog-icon"
              src={Icon}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            Blog
          </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav >
            {auth ? (
              <>
                {" "}
                <NavLink 
                  to="/all-blog"  style={NavLinkCss}
                  className="py-2 ps-3 pe-4 fw-semibold text-decoration-none"
                >
                  Home
                </NavLink>
                <NavLink
                  to="author/blog" style={NavLinkCss}
                  className="py-2 ps-3 pe-4 fw-semibold text-decoration-none"
                >
                  Author Blog
                </NavLink>
                <NavLink
                  to="blog/add-blog" style={NavLinkCss}
                  className="py-2 ps-3 fw-semibold pe-4 text-decoration-none"
                >
                  Add Blog
                </NavLink>
                
                <NavDropdown title="Profile" className=" ps-3 fw-semibold pe-4 " id="basic-nav-dropdown">
                  <NavDropdown.Item href="/"  className="py-2 ps-3 pe-4 text-secondary   fw-semibold text-decoration-none">Name :  {auth.username}</NavDropdown.Item>
                 
                  <NavDropdown.Item href="/"  className="py-2 ps-3 pe-4 text-secondary   fw-semibold text-decoration-none">Email : {auth.email}</NavDropdown.Item>
                 
                </NavDropdown>
                <NavLink
                  to="/register"
                  style={NavLinkCss}
                  onClick={logout}
                  className="py-2 ps-3 pe-4 fw-semibold text-decoration-none"
                >
                  Logout
                </NavLink>
                {" "}
              </>
            ) : (
              <>
                <NavLink
                  to="/register" style={NavLinkCss}
                  className="py-2 ps-3 pe-4 fw-semibold text-decoration-none"
                >
                  Register
                </NavLink>
                <NavLink
                  to="/login"  style={NavLinkCss}
                  className="py-2 ps-3 pe-4 fw-semibold text-decoration-none"
                >
                  Login
                </NavLink>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
</div>
  )
}

export default NavbarComp