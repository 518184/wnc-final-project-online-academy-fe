import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useHistory, useLocation } from 'react-router-dom';
import { axiosInstance, parseJwt } from '../utils';
import swal from 'sweetalert';
import {
    Container,
    Row,
    Col,
    Card,
    Form,
    Button
} from 'react-bootstrap';

export default function Profile(props) {
    const { register, handleSubmit, watch, errors } = useForm();
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: '/' } };
    const [account, setAccount] = useState();
    const [payment, setPayment] = useState();
    const [disablePassword, setDisablePassword] = useState(true);

    useEffect(function () {
        async function loadDataUser() {
            const res = await axiosInstance.get('/users/' + localStorage.account_userID, { headers: { 'x-access-token': localStorage.account_accessToken } });
            if (res.status === 200) {
                res.data.watchlistJS = JSON.parse(res.data.watchlist).course;
                setAccount(res.data);
                console.log("user ", res.data);
            }
        }
        async function loadDataPayment() {
            const res = await axiosInstance.get('/transaction/user/' + localStorage.account_userID, { headers: { 'x-access-token': localStorage.account_accessToken } });
            if (res.status === 200) {
                setPayment(res.data);
                console.log("transaction ", res.data);
            }
            console.log(payment);
        }
        loadDataUser();
        loadDataPayment();
    }, []);


    const onSubmit = async function (data) {
        if (data) {
            if (data.switchPass) {
                if (data.password && data.password === data.confirmPassword) {
                    try {
                        delete data.confirmPassword;
                        delete data.switchPass;
                        const res = await axiosInstance.put('/users/' + account.id, data, { headers: { 'x-access-token': localStorage.account_accessToken } });
                        if (res.status === 200) {
                            swal({
                                title: "Profile Saved",
                                icon: "success",
                                button: "OK"
                            });
                        } else {
                            swal({
                                title: "Not Save Profile",
                                icon: "warning",
                                button: "OK",
                            });
                        }
                    } catch (err) {
                        console.log(err.response.data);
                        swal({
                            title: "Not Save Profile",
                            icon: "warning",
                            button: "OK",
                        });
                    }
                } else {
                    swal({
                        title: "Not Save Profile",
                        text: "Confirm password wrong",
                        icon: "warning",
                        button: "OK",
                    });
                }
            } else {
                try {
                    delete data.confirmPassword;
                    delete data.switchPass;
                    const res = await axiosInstance.put('/users/' + account.id, data, { headers: { 'x-access-token': localStorage.account_accessToken } });
                    if (res.status === 200) {
                        swal({
                            title: "Profile Saved",
                            icon: "success",
                            button: "OK"
                        });
                    } else {
                        swal({
                            title: "Not Save Profile",
                            icon: "warning",
                            button: "OK",
                        });
                    }
                } catch (err) {
                    console.log(err.response.data);
                    swal({
                        title: "Not Save Profile",
                        icon: "warning",
                        button: "OK",
                    });
                }
            }
        } else {
            swal({
                title: "Not Save Profile",
                icon: "warning",
                button: "OK",
            });
        }
    }

    const addCourse = async function () {
        let data = {};
        data.courseId = "5";
        console.log(data);
        const res = await axiosInstance.post('/transaction', data, { headers: { 'x-access-token': localStorage.account_accessToken } });
        console.log(res.data);
        const res2 = await axiosInstance.put('/transaction/' + res.data.id + '/payment', data, { headers: { 'x-access-token': localStorage.account_accessToken } });
        console.log(res2.data);
    }
    const addWhiteList = async function () {
        try {
            const res = await axiosInstance.post('/users/watchlist/5', {}, { headers: { 'x-access-token': localStorage.account_accessToken } });
        } catch (err) {
            console.log(err.response.data);
        }

    }

    const changePassword = function () {
        disablePassword === true ? setDisablePassword(false) : setDisablePassword(true);
    }

    const cancelButton_Clicked = function () {
        history.push("/home");
    }

    return (
        <Container>
            <Row>
                <Col xs={2} className="mt-1">
                    <Button className="float-right mr-3 py-2" variant="secondary" onClick={cancelButton_Clicked}>Go Academy</Button>
                </Col>
            </Row>
            <Row>
                <Col xs={6} className="mt-1">
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Card>
                            <Card.Body>
                                <Card.Title as="h3"><center>Profile</center></Card.Title>
                                <hr></hr>
                                <Form.Group controlId="formBasicFullName">
                                    <Form.Label>Fullname</Form.Label>
                                    <Form.Control type="text" name="fullname" defaultValue={account == null ? "" : account.fullname} placeholder="Enter fullname" ref={register({ required: true })} />
                                </Form.Group>

                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" name="email" defaultValue={account == null ? "" : account.email} placeholder="Enter email" ref={register({ required: true })} readOnly />
                                </Form.Group>

                                <Form.Check type="switch" name="switchPass" id="custom-switch" label="Change password" onChange={changePassword} ref={register({ required: false })} />
                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>New Password</Form.Label>
                                    <Form.Control type="password" name="password" placeholder="Password" ref={register({ required: false })} disabled={disablePassword} />
                                </Form.Group>
                                <Form.Group controlId="formBasicConfirmPassword">
                                    <Form.Label>Confirm New Password</Form.Label>
                                    <Form.Control type="password" name="confirmPassword" placeholder="Confirm Password" ref={register({ required: false })} disabled={disablePassword} />
                                </Form.Group>
                            </Card.Body>
                            <Card.Footer>
                                <Button className="float-right py-2" variant="primary" type="submit">Save</Button>
                            </Card.Footer>
                        </Card>
                    </Form>
                </Col>
                <Col xs={6} className="mt-1">
                    <Card>
                        <Card.Body>
                            <Card.Title as="h3"><center>My Courses</center></Card.Title>
                            <hr></hr>
                            {payment === undefined ? "" : payment.map(item =>
                                <Card>
                                    <Card.Img variant="top" src="holder.js/100px180" />
                                    <Card.Body>
                                        <Card.Title>{item.courseId}</Card.Title>
                                        <Card.Text>
                                            Some quick example text to build on the card title and make up the bulk of
                                            the card's content.
                                            </Card.Text>
                                        <Button variant="primary">Go somewhere</Button>
                                    </Card.Body>
                                </Card>
                            )}
                        </Card.Body>
                        <Card.Footer>
                            <Button className="float-right py-2" variant="primary" onClick={addCourse}>Add</Button>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <Card>
                        <Card.Body>
                            <Card.Title as="h3"><center>My Favourite Courses</center></Card.Title>
                            <hr></hr>
                            <Card>
                                <Card.Img variant="top" src="holder.js/100px180" />
                                <Card.Body>
                                    {account === undefined ? "" : account.watchlistJS.map(item =>
                                        <Card>
                                            <Card.Img variant="top" src="holder.js/100px180" />
                                            <Card.Body>
                                                <Card.Title>{item}</Card.Title>
                                                <Card.Text>
                                                    Some quick example text to build on the card title and make up the bulk of
                                                    the card's content.
                                            </Card.Text>
                                                <Button variant="primary">Go somewhere</Button>
                                            </Card.Body>
                                        </Card>
                                    )}
                                </Card.Body>
                            </Card>
                        </Card.Body>
                        <Card.Footer>
                            <Button className="float-right py-2" variant="primary" onClick={addWhiteList}>Add</Button>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}
