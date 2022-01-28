import { Navbar,Nav,Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from "prop-types"

export const NavbarComponent = ({links,to})=> {
    const navigate =  useNavigate()

    const LogOut = ()=>{
       navigate("/login")
        localStorage.removeItem("token")
    }

    return(
    <>
        <Navbar bg="dark" >
            <Container>
                <Nav className="py-auto w-100 d-flex algn-items-center">
                    {links.map((link,idx)=>{
                        return(<Link key={idx} className="navItem mx-3" to={to[idx]}>{link}</Link> )
                    })}
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            <Button onClick={()=>{LogOut()}} variant="outline-light">log out</Button>
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Nav>
            </Container>
      </Navbar>
    </>)
}

NavbarComponent.propTypes= {
    links: PropTypes.array,
    to: PropTypes.array,
}
NavbarComponent.defaultValues = {
    links: [],
    to: []
}