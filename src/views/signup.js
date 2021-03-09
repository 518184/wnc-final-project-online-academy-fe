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
    Button,
    Select
} from 'react-bootstrap';

export default function Login(props) {
    const { register, handleSubmit, watch, errors } = useForm();
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: '/' } };
    const onSubmit = async function (data) {
        console.log(data);
        if (data.password === data.confirmPassword) {
            try {
                data.type = parseInt(data.type);
                delete data.confirmPassword;
                const res = await axiosInstance.post('/users', data);
                console.log(res);
                // if (res.data.authenticated) {
                //     localStorage.account_accessToken = res.data.accessToken;
                //     localStorage.account_ID = parseJwt(res.data.accessToken).userId;
                //     localStorage.account_email = data.email;
                //     // history.push(from.pathname);
                //     history.replace(from);
                // } else {
                //     alert('Invalid login.');
                // }
            } catch (err) {
                console.log(err.response.data);
            }
        }
    }

    const cancelButton_Clicked = function () {
        history.push("/home");
    }

    return (
        <Container>
            <br></br>
            <Row>
                {/* <Col><Button variant="danger" size="lg" onClick={cancelButton_Clicked}>Back</Button></Col> */}
                <Col xs={6}>
                    <Card>
                        <Card.Body>
                            <Form onSubmit={handleSubmit(onSubmit)}>
                                <Form.Group controlId="formBasicFullName">
                                    <Form.Label>Fullname</Form.Label>
                                    <Form.Control type="text" name="fullname" placeholder="Enter fullname" ref={register({ required: true })} autoFocus />
                                </Form.Group>

                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" name="email" placeholder="Enter email" ref={register({ required: true })} />
                                </Form.Group>

                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" name="password" placeholder="Password" ref={register({ required: true })} />
                                </Form.Group>

                                <Form.Group controlId="formBasicConfirmPassword">
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control type="password" name="confirmPassword" placeholder="Confirm Password" ref={register({ required: true })} />
                                </Form.Group>

                                <Form.Group controlId="formBasicType">
                                    <Form.Label>Account Type</Form.Label>
                                    <Form.Control as="select" name="type" ref={register({ required: true })} >
                                        <option value="1">Student</option>
                                        <option value="2">Teacher</option>
                                    </Form.Control>
                                </Form.Group>
                                <Button variant="primary" type="submit">Sign up</Button>
                                <Button variant="danger" onClick={cancelButton_Clicked}>Cancel</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
                <Col></Col>
            </Row>

        </Container>
    )
}