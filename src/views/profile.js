import React, { useContext, useReducer, useEffect, useState } from 'react'
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
import academyApppContext from '../onlineAcademyAppContext';

export default function Profile(props) {
    const { register, handleSubmit, watch, errors } = useForm();
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: '/' } };
    const [account, setAccount] = useState();
    const [payment, setPayment] = useState();
    const [disablePassword, setDisablePassword] = useState(true);
    const [changeForm, setChangeForm] = useState(false);

    // const initialAppState = {
    //     courses: [],
    //     query: '',
    //     categories: [],
    // };

    // const [store, dispatch] = useReducer(reducer, initialAppState);
    const { store, dispatch } = useContext(academyApppContext);

    useEffect(function () {
        async function loadDataUser() {
            const res = await axiosInstance.get('/users/' + localStorage.account_userID, { headers: { 'x-access-token': localStorage.account_accessToken } });
            if (res.status === 200) {
                res.data.watchlistJS = res.data.watchlist ? JSON.parse(res.data.watchlist).course : [];
                dispatch({
                    type: 'setAccount',
                    payload: {
                        account: res.data,
                        query: '',
                    }
                });
            }
        }
        async function loadDataPayment() {
            const res = await axiosInstance.get('/transaction/user/' + localStorage.account_userID, { headers: { 'x-access-token': localStorage.account_accessToken } });
            if (res.status === 200) {

                dispatch({
                    type: 'setPayment',
                    payload: {
                        payment: res.data,
                        query: '',
                    }
                });
            }
        }
        loadDataUser();
        loadDataPayment();
    }, [changeForm]);

    const onSubmit = async function (data) {
        if (data) {
            if (data.switchPass) {
                if (data.password && data.password === data.confirmPassword) {
                    try {
                        delete data.confirmPassword;
                        delete data.switchPass;
                        const res = await axiosInstance.put('/users/' + store.account.id, data, { headers: { 'x-access-token': localStorage.account_accessToken } });
                        if (res.status === 200) {
                            swal({
                                title: "Profile Saved",
                                icon: "success",
                                button: "OK"
                            });
                            setChangeForm(true);
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
                    const res = await axiosInstance.put('/users/' + store.account.id, data, { headers: { 'x-access-token': localStorage.account_accessToken } });
                    if (res.status === 200) {
                        swal({
                            title: "Profile Saved",
                            icon: "success",
                            button: "OK"
                        });
                        setChangeForm(true);
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
        const res = await axiosInstance.post('/transaction', data, { headers: { 'x-access-token': localStorage.account_accessToken } });
        const res2 = await axiosInstance.put('/transaction/' + res.data.id + '/payment', data, { headers: { 'x-access-token': localStorage.account_accessToken } });
    }
    const addWhiteList = async function () {
        try {
            const res = await axiosInstance.post('/users/watchlist/5', {}, { headers: { 'x-access-token': localStorage.account_accessToken } });
        } catch (err) {
            console.log(err.response.data);
        }

    }
    const delWhiteList = async function () {
        try {
            const res = await axiosInstance.delete('/users/delete/watchlist/4', { headers: { 'x-access-token': localStorage.account_accessToken } });
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
    const goHome = function () {
        dispatch({
            type: 'changeMode',
            payload: {
                mode: 'default'
            }
        })
    }

    return (
        <>
            <Row>
                <Col xs={2} className="mt-1">
                    <Button className="float-right mr-3 py-2" variant="secondary" onClick={goHome}>Go Academy</Button>
                </Col>
            </Row>
            <Row>
                <Col xs={6} className="mt-1">
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Card>
                            <Card.Header>
                                <Card.Title as="h3"><center>Profile</center></Card.Title>
                            </Card.Header>
                            <Card.Body style={{height: 500, overflowY: 'auto'}}>
                                <Form.Group controlId="formBasicFullName">
                                    <Form.Label>Fullname</Form.Label>
                                    <Form.Control type="text" name="fullname" defaultValue={store.account ? store.account.fullname : ""} placeholder="Enter fullname" ref={register({ required: true })} />
                                </Form.Group>
                                <br></br>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" name="email" defaultValue={store.account ? store.account.email : ""} placeholder="Enter email" ref={register({ required: true })} readOnly />
                                </Form.Group>

                                <Form.Check type="switch" name="switchPass" id="custom-switch" label="Change password" onChange={changePassword} ref={register({ required: false })} />
                                <br></br>
                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>New Password</Form.Label>
                                    <Form.Control type="password" name="password" placeholder="Password" ref={register({ required: false })} disabled={disablePassword} />
                                </Form.Group>
                                <br></br>
                                <Form.Group controlId="formBasicConfirmPassword">
                                    <Form.Label>Confirm New Password</Form.Label>
                                    <Form.Control type="password" name="confirmPassword" placeholder="Confirm Password" ref={register({ required: false })} disabled={disablePassword} />
                                </Form.Group>
                            </Card.Body>
                            <Card.Footer>
                                <Button className="float-right py-2" variant="primary" type="submit" size="lg">Save</Button>
                            </Card.Footer>
                        </Card>
                    </Form>
                </Col>
                <Col xs={6} className="mt-1">
                    <Card>
                        <Card.Header>
                            <Card.Title as="h3"><center>My Courses</center></Card.Title>
                        </Card.Header>
                        
                        <Card.Body  style={{height: 500, overflowY: 'auto'}}>
                            {/* { console.log(store.payment)} */}
                            {store.payment ? store.payment.map(item =>
                                <Card>
                                    <Card.Img variant="top" src="holder.js/100px180" />
                                    <Card.Body>
                                        {store.courses ? store.courses.map(i => i.id === item.courseId ? 
                                            [<Card.Title>{i.title}</Card.Title>,
                                            <Card.Text>{i.descriptionShort}</Card.Text>] : <Card.Title></Card.Title>) : <Card.Title></Card.Title>}             
                                        <Button variant="primary">Go somewhere</Button>
                                    </Card.Body>
                                </Card>
                            ) : ""}
                        </Card.Body>
                        <Card.Footer>
                            <Button className="float-right py-2" variant="primary" onClick={addCourse} size="lg" >Add</Button>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h3"><center>My Favourite Courses</center></Card.Title>
                        </Card.Header>
                        
                        <Card.Body style={{height: 300, overflowX: 'auto'}}>
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
                            <Button className="float-right py-2 mx-2" variant="primary" size="lg" onClick={addWhiteList}>Add</Button>
                            <Button className="float-right py-2 mx-2" variant="danger" size="lg" onClick={delWhiteList}>Del</Button>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
        </>
    )
}
