import {Routes, Route} from "react-router-dom";
import './App.scss';

import { HomePage } from "./pages/home/home.component";
import { LoginPage } from "./pages/login/login.component";
import { PageNotFound } from "./pages/pageNotFound/pageNotFound";
import { BuscarRecetas } from "./pages/buscarRecetas/buscarRecetas.component";
import { VerDetalle } from "./pages/verDetalle/verDetalle.component";

import {Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserAuth from "./routes/auth";
import { NavbarComponent } from "./components/organisms/navbar/navbar.component";


function App() {
  return (
    <div className="App">

      <NavbarComponent links={["home","Search recipes"]} to={["/","/buscarRecetas"]}/>

      <Container className="pt-5">
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
