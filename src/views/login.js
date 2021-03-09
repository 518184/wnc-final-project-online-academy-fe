import React from 'react'
import { useForm } from 'react-hook-form';
import { useHistory, useLocation } from 'react-router-dom';
import { axiosInstance, parseJwt } from '../utils';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button, DropdownButton, Dropdown } from 'react-bootstrap';

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
      <Container>
        <br></br>
        <Row>
          <Col></Col>
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
          
                </Form>
              </Card.Body>
              <Card.Footer>
                  <Button className="float-right py-2" variant="primary" type="submit">Login</Button>
                  <Button className="float-right mr-3 py-2" variant="danger" onClick={BackToHome_Clicked}>Cancel</Button>
              </Card.Footer>
            </Card>
          </Col>
          <Col></Col>
        </Row>
        
      </Container>
    )
}