import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import '../assets/NavBar.css'
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../context/Context.User'

function NavBar() {
    const navigate = useNavigate()
    const contextUser = useUserContext()
    return (
        <Navbar bg="light" expand="lg">
            <Container >
                <Navbar.Brand className='logo' onClick={() => navigate("/")}>SHORTENER </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavDropdown title="Menu Usario" id="basic-nav-dropdown">
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={contextUser.user[0].isLogin ? () => navigate("/user/user-menu") : () => navigate("/log-in")}>
                                Mis Urls
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
                <Navbar.Collapse className="justify-content-end">
                    <Button variant="light" onClick={() => navigate("/log-in")} size='lg'>Iniciar Sesion</Button>
                    <Button variant="light" onClick={() => Sing_out()} size='lg'>Cerrar Sesion</Button>
                    <Button variant="light" onClick={() => navigate("/users/register")} size='lg'>Registro</Button>
                    <Navbar.Text>
                        <p>{contextUser.user.name}</p>
                    </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;