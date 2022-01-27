import { useEffect,useState } from 'react';
import './verDetalle.styles.scss';
import { useParams } from 'react-router-dom';

import { Row,Col,Table } from 'react-bootstrap';
import axios from 'axios';
import { Typography } from '../../components/atoms/typography';

export const VerDetalle = ()=>{
    
    const [receta, setReceta] = useState({})
    const [flag, setFlag] = useState(false)

    const {id} = useParams();

    const API_KEY = process.env.REACT_APP_API_KEY
    const URL = process.env.REACT_APP_URL

    useEffect(() => {
        axios.get(`${URL}${id}/information?apiKey=${API_KEY}`)
        .then(function (response) {
            setReceta(response.data)
            setFlag(true)
        })
        .catch(function (error) {
            console.log(error)
        })
    }, [])

    return(
        <>
            {flag &&
                <>
                <Row> 
                    <Col xl={12}>
                        <div className="texto">
                            <Typography variant="h1" className="mt-3">{receta.title}</Typography>
                            <div className="img">
                                <img src={receta.image} alt="" />
                            </div>
                            <div className="detalles">
                                <div className="caracGrales">
                                    <Typography variant="subTitle" > Summary </Typography>
                                    <Typography variant="p" ><span className=""dangerouslySetInnerHTML={{ __html: receta.summary}}/></Typography>
                                    <Typography variant="p" > </Typography>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col>
                        <Typography variant="h1" className="mb-3">Other features</Typography>
                        <div className="row"> 
                            <Typography variant="p" width='max-content'>Health Score : {receta.healthScore}</Typography>
                            <Typography variant="p" width='max-content'>Price per serving: $ {receta.pricePerServing}</Typography>
                            {!receta.vegan && <Typography variant="p" width='max-content'>Vegan</Typography>}
                            {!receta.vegetarian && <Typography variant="p" width='max-content'>Vegetarian</Typography>}
                            {!receta.glutenFree && <Typography variant="p" width='max-content'>Gluten free</Typography>}
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Typography variant="subTitle" className="mb-3">Ingredients</Typography>
                    <Table striped bordered hover  variant="dark">
                        <thead>
                            <tr>
                            <th>#</th>
                            <th>Ingredient</th>
                            <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {receta.extendedIngredients.map((ingredient,idx)=>
                                <tr key={idx}>
                                <th>#</th>
                                <th>{ingredient.name}</th>
                                <th>{ingredient.originalString}</th>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </Row>
                <Row>
                    <div className="detalles">
                        <div className="caracGrales">
                            <Typography variant="subTitle" > Instructions </Typography>
                            <Typography variant="p" ><span dangerouslySetInnerHTML={{ __html: receta.instructions}}/></Typography>
                            <Typography variant="p" > </Typography>
                        </div>
                    </div>
                </Row>
                </>
            }
        </>
    )
}