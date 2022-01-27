import {Routes, Route,Link} from "react-router-dom";
import './App.scss';

import { HomePage } from "./pages/home/home.component";
import { LoginPage } from "./pages/login/login.component";
import { PageNotFound } from "./pages/pageNotFound/pageNotFound";
import { BuscarRecetas } from "./pages/buscarRecetas/buscarRecetas.component";
import { VerDetalle } from "./pages/verDetalle/verDetalle.component";

import { Navbar,Nav,Container, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserAuth from "./routes/auth";


function App() {
  return (
    <div className="App">

      <Navbar bg="dark" variant="dark">
        <Container>
          <Nav className="py-auto w-100 d-flex algn-items-center">
              <Link className="navItem mx-3" to="/">Home</Link> 
              <Link className="navItem" to="/buscarRecetas">Search recipes</Link>
              <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>
                  <Button variant="outline-light">log out</Button>
                </Navbar.Text>
              </Navbar.Collapse>
          </Nav>
        </Container>
      </Navbar>

      <Container>
        <Routes>
          <Route path="/login" element={<LoginPage/>}/>
          <Route element={<UserAuth/>}>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/buscarRecetas" element={<BuscarRecetas/>}/>
            <Route path="/verDetalle/:id" element={<VerDetalle/>}/>
          </Route>
          <Route path="*" element={ <PageNotFound/> }/>
        </Routes>
      </Container>

    </div>
  );
}

export default App;
