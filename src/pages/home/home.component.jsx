import './home.styles.scss'
import { Card, Row, Alert, Col,Container } from 'react-bootstrap';
import { recipesContext } from '../../store/store';
import { useContext, useEffect } from 'react';
import { Typography } from '../../components/atoms/typography';
import { useState } from 'react';
import { List } from '../../components/molecules/list.component';


export const HomePage = ()=>{
    
    const {recipes:{recipes}} = useContext(recipesContext)
    const [Stats,setStats] = useState([])

    useEffect(()=>{
        let stats= [0,0,0]
        recipes.map((recipe)=>{
            stats[0] = [parseInt(stats[0])+parseInt(recipe.pricePerServing)]
            stats[1] = [parseInt(stats[1])+parseInt(recipe.readyInMinutes)]
            stats[2] = [parseInt(stats[2])+parseInt(recipe.healthScore)]
        })
        setStats(stats)
    },[recipes])

    return(
        <>
        {recipes.length === 0?
            <Alert variant="info">
                Aun no hay platos en el menu. 
            </Alert>
        :
        <Container>
            <Row xs={1} md={2} xxl={4}>
                <div className="w-100 d-flex flex-column mt-5">
                    <Typography className='text-center' variant='h1'>User's Menu</Typography>
                    <div className="d-flex flex-wrap justify-content-center">
                        {recipes.map((recipe,idx)=>(
                            <Card className="mt-3 mx-1 d-flex" key={idx} border="white" style={{background: "#212529", width: '18rem' }}>
                                <Card.Img src={recipe.image} />
                                <Card.Body>
                                    <Card.Title>{recipe.title}</Card.Title>
                                    <Card.Text>
                                        {recipe.vegan ? "Vegan": "Not vegan"}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        ))}
                    </div>
                </div>
            </Row>
            <Row>
                <Col>
                    <Typography variant='subTitle'>Menu Stats</Typography>
                    <List propertys={["Menu price","Average preparation time","Average health score"]} values={Stats}/>
                </Col>
            </Row>
        </Container>
        }
        </> 
    )
}