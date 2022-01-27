import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import { Form, Button,Card,Alert,Row } from 'react-bootstrap';
import { useFormik } from 'formik';
import axios from 'axios';

import { recipesContext } from '../../store/store';
import { addRecipes } from '../../store/recipes/recipes.action';


export const BuscarRecetas = ()=>{

    const {dispatchRecipes} = useContext(recipesContext)
    const [recetas, setRecetas] = useState([])

    const navigate =  useNavigate();

    const validate = values => {
        const errors = {};
        if (values.receta.length < 4) {
            errors.receta = 'El nombre debe ser de almenos 2 caracteres';
        }
        return errors
    }

    const API_KEY = process.env.REACT_APP_API_KEY
    const URL = process.env.REACT_APP_URL

    const formik = useFormik({
        initialValues: {
            receta: '',
        },
        validate,
        onSubmit: values => {
            axios.get(`${URL}complexSearch?apiKey=${API_KEY}&query=${values.receta}&addRecipeInformation=true`)
                .then(function (response) {
                    setRecetas(response.data.results)
                })
                .catch(function (error) {
                    console.log(error)
                })
            },
      });

    const {handleSubmit,handleChange,errors,handleBlur} = formik;

    return(
        <div>
            <h1 className='mb-4'> Recipe finder</h1>

            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Name of the dish</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Receta"
                        name="receta" 
                        onChange={handleChange} 
                        
                        onBlur={handleBlur}/>
                </Form.Group>

                {errors.receta &&
                    <Alert variant="danger">
                        {errors.receta}
                    </Alert>
                }

                <Button className={!errors.receta ? "" : "disabled"} variant="primary" type="submit" >
                    Enviar
                </Button>
            </Form>
            
            <div className="list mt-5">
                <h3 className='mb-4'> Search results :</h3>
                <Row xs={1} md={2} xxl={4}>
                    {recetas.map(receta=>(

                        <Card className="mt-3 mx-1 d-flex" key={receta.id} border="white" style={{background: "#212529", width: '18rem' }}>
                            <Card.Img src={receta.image} />
                            <Card.Body>
                                <Card.Title>{receta.title}</Card.Title>
                                <Card.Text>
                                    {receta.vegan ? "Vegan": "Not vegan"}
                                    {receta.glutenFree && " - Gluten FREE"}
                                    {receta.veryHealthy && " - Healthy"}
                                </Card.Text>
                                <div className="d-flex flex-column">
                                    <Button 
                                    className='mb-2 '
                                    variant="outline-light"
                                    onClick={()=>{ navigate(`/verDetalle/${receta.id}`) }}>See more</Button>
                                    <Button 
                                    variant="primary"
                                    onClick={()=>dispatchRecipes(addRecipes(receta))}>Add to Menu</Button>
                                </div>
                                    
                            </Card.Body>
                        </Card>
                    ))}
                </Row>
            </div>
            
        </div>
    )
}