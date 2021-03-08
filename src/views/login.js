import React from 'react'
import { useForm } from 'react-hook-form';
import { useHistory, useLocation } from 'react-router-dom';
import { axiosInstance, parseJwt } from '../utils';
import { Link } from 'react-router-dom';
import {
Container,
Row,
Col,
Card,
Form,
Button
} from 'react-bootstrap';

export default function Login(props) {
    const { register, handleSubmit, watch, errors } = useForm();
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: '/' } };
    const onSubmit = async function (data) {
        try {
          const res = await axiosInstance.post('/auth', data);
          if (res.data.authenticated) {
            localStorage.account_accessToken = res.data.accessToken;
            localStorage.account_ID = parseJwt(res.data.accessToken).userId;
            localStorage.account_email = data.email;
            // history.push(from.pathname);
            history.replace(from);
          } else {
            alert('Invalid login.');
          }
        } catch (err) {
          console.log(err.response.data);
        }
    }

    const BackToHome_Clicked = function() {
      history.push("/home");
    }

    return (
        // <div className="container">
        //     <form onSubmit={handleSubmit(onSubmit)}>
        //         <h3>Login</h3>
        //         <div className="fg">
        //             <input type="text" name="email" placeholder="email" ref={register({ required: true })} autoFocus />
        //             {errors.username && <span>*</span>}
        //         </div>
        //         <div className="fg">
        //             <input type="password" name="password" placeholder="password" ref={register({ required: true })} />
        //             {errors.password && <span>*</span>}
        //         </div>
        //         <div className="fg mt-3">
        //             <button type="submit">Login</button>
        //         </div>
        //     </form>
        // </div>
      <Container>
        <br></br>
        <Row>
          <Col><Button variant="danger" size="lg" onClick={BackToHome_Clicked}>Back</Button></Col>
          <Col xs={6}>
            <Card>
              <Card.Body>
              <Form onSubmit={handleSubmit(onSubmit)}>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control type="email" name="email" placeholder="Enter email" ref={register({ required: true })} autoFocus />
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                  <Form.Control type="password" name="password" placeholder="Password" ref={register({ required: true })} />
                  </Form.Group>
                  <Button variant="primary" type="submit">Login</Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          <Col></Col>
        </Row>
        
      </Container>
    )
}