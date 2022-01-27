import { Form, Button, Alert } from 'react-bootstrap';
import {Typography} from "../../components/atoms/typography"
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import swal from 'sweetalert';
import { useNavigate } from "react-router-dom";

export const LoginPage = ()=>{

    const loginUrl = process.env.REACT_APP_LOGIN
    const navigate = useNavigate();

    const loginSchema = Yup.object().shape({
        email: Yup.string()
          .min(2, 'Email Invalid!')
          .required('Email required'),
        password: Yup.string()
          .min(2, 'Too Short at least 2 caracters!')
          .required('Password required')
      });

    const formik = useFormik({
        initialValues: {
          email: '',
          password: ''
        },
        validationSchema:loginSchema,
        onSubmit: (values,{setSubmitting, resetForm}) => {
            setSubmitting(true)

            axios.post(loginUrl,{
                  email: values.email,
                  password: values.password
              })
            .then((response)=>{
                localStorage.setItem("token",response.data.token)
                navigate("/");
            })
            .catch((err)=>{
                console.log(err)
                swal({
                    title: "Upps!",
                    text: "Something went wrong, check the email and the password",
                    icon: "error"
                  });
            })

            setSubmitting(false)
            
        },
      });

    const {handleSubmit,handleChange,values,errors,touched,isSubmitting,} =  formik

    return(
        <div className='max-w mx-auto'>
            <Typography className='text-center' variant='h1'> Inicia sesion</Typography>
            <Form onSubmit={handleSubmit} >
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label >Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={values.email} name="email" onChange={handleChange}/>
                    {errors.email && touched.email ?
                        <Alert variant='danger' className='mt-1 py-1'>
                            {errors.email}
                        </Alert>
                    :null}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={values.password} name="password" onChange={handleChange}/>
                    {errors.password && touched.password ?
                        <Alert variant='danger' className='mt-1 py-1'>
                            {errors.password}
                        </Alert>
                    :null}
                </Form.Group>
                <Button variant="primary" type="submit" disabled={isSubmitting}>
                    Enviar
                </Button>
            </Form>
        </div>
    )
}