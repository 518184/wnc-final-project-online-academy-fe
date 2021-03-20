import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useHistory, useLocation } from 'react-router-dom';
import { axiosInstance } from '../utils';
import swal from 'sweetalert';
import {
    Row,
    Col,
    Card,
    Form,
    Button,
    Container
} from 'react-bootstrap';
import academyApppContext from '../onlineAcademyAppContext';
import Course from '../components/homeContent/Course';

export default function Profile(props) {
    const { register, handleSubmit, watch, errors } = useForm();
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: '/' } };
    const [isActive, setIsActive] = useState();
    const [disablePassword, setDisablePassword] = useState(true);
    const [changeForm, setChangeForm] = useState(false);
    const watchListCourse = [];
    const { store, dispatch } = useContext(academyApppContext);

    useEffect(function () {
        async function loadDataUser() {
            try{
                const res = await axiosInstance.get('/users/' + localStorage.account_userID, { headers: { 'x-access-token': localStorage.account_accessToken } });
                if (res.status === 200) {
                    delete res.data.password;
                    res.data.watchlistJS = res.data.watchlist ? JSON.parse(res.data.watchlist).course : [];
                    dispatch({
                        type: 'setAccount',
                        payload: {
                            account: res.data,
                            query: '',
                        }
                    });
                }
            } catch (err) {
                if (err.response.status === 403) {
                    setIsActive(true);
                }
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
    const delWhiteList = async function (id) {
        try {
            const res = await axiosInstance.delete('/users/delete/watchlist/' + id, { headers: { 'x-access-token': localStorage.account_accessToken } });
            if (res.status === 200) {
                swal({
                    title: "Removed Course",
                    icon: "success",
                    button: "OK"
                });
                setChangeForm(true);
            }
        } catch (err) {
            console.log(err.response.data);
            swal({
                title: "Not Remove",
                icon: "warning",
                button: "OK",
            });
        }

    }

    const changePassword = function () {
        disablePassword === true ? setDisablePassword(false) : setDisablePassword(true);
    }

    const logout = function () {
        localStorage.clear();
        history.push('/login');
        window.location.reload();
    }

    const onSubmitOTPConfirm = async function (data) {
        if (data.otp != null) {
            try {
                var acc = { otp: data.otp };
                const res = await axiosInstance.post('/users/otp/validate', acc, { headers: { 'x-access-token': localStorage.account_accessToken } });
                if (res.status === 200) {
                    swal({
                        title: "Account is active",
                        text: "You can purchase course after login",
                        icon: "success",
                        button: "OK",
                    }).then((value) => {
                        if (value) {
                            logout();
                        }
                    });
                    //setChangeForm(true);
                } else {
                    swal({
                        title: "Invalid Code",
                        text: "Please try again",
                        icon: "warning",
                        button: "OK",
                        dangerMode: false,
                        timer: 1000
                    });
                }
            } catch (err) {
                console.log(err.response.data);
                swal({
                    title: "Invalid Code",
                    text: "Please try again",
                    icon: "warning",
                    buttons: false,
                    timer: 1000
                });
            }
        }
    }

    return (
        <>
            <Row>
                <Col>
                    {
                        isActive ?
                            <Card>
                                <Card.Header>
                                    <Card.Title as="h3"><center>Active Account</center></Card.Title>
                                </Card.Header>
                                <Card.Body >
                                    <Form onSubmit={handleSubmit(onSubmitOTPConfirm)}>
                                        <Form.Group controlId="formBasicOTP">
                                            <Form.Label>Please confirm code in mail or contact admin to active account </Form.Label>
                                            <Form.Control type="text" name="otp" placeholder="Enter Confirm Code" ref={register({ required: true })} autoFocus />
                                        </Form.Group>
                                        <Button id="otp" variant="primary" type="submit">Confirm</Button>
                                    </Form>
                                </Card.Body>
                                <Card.Footer>

                                </Card.Footer>
                            </Card> : ""
                    }

                </Col>
            </Row>
            {store.account ?
                <Row>
                    <Col xs={6} className="mt-1">
                        <Form onSubmit={handleSubmit(onSubmit)} >
                            <Card style={{ height: 700 }}>
                                <Card.Header>
                                    <Card.Title as="h3"><center>Profile</center></Card.Title>
                                </Card.Header>
                                <Card.Body style={{ overflowY: 'auto' }}>
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
                                    <Button id="saveProfile" className="float-right py-2" variant="primary" type="submit" size="lg">Save</Button>
                                </Card.Footer>
                            </Card>
                        </Form>
                    </Col>
                    <Col xs={6} className="mt-1" >
                        <Card style={{ height: 700 }}>
                            <Card.Header>
                                <Card.Title as="h3"><center>My Courses</center></Card.Title>
                            </Card.Header>

                            <Card.Body style={{ height: 600, overflowX: 'auto', overflowY: 'hidden' }}>
                                <Container fluid>
                                    <Row className="row flex-row flex-nowrap" >
                                        {store.payment ? store.payment.map(item =>
                                            store.courses ? store.courses.map(i => i.id === item.courseId ?
                                                <Col sm={5} style={{ height: 'auto' }}>
                                                    <Course course={i} />
                                                    <b style={{ position: 'absolute', bottom: 0, fontSize: 20 }}>{i.isCompleted ? <center style={{ color: 'green' }}>completed</center> : <center style={{ color: 'blue' }}>processing...</center>}</b>
                                                </Col>
                                                : "") : "") : ""
                                        }
                                    </Row>
                                </Container>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row> : ""}
            {store.account ?
                <Row>
                    <Col>
                        <Card>
                            <Card.Header>
                                <Card.Title as="h3"><center>My Favourite Courses</center></Card.Title>
                            </Card.Header>
                            <Card.Body style={{ overflowY: 'hidden' }}>
                                <Container fluid>
                                    <Row className="row flex-row flex-nowrap" style={{ height: 640, overflowX: 'auto' }}>
                                        {store.account ? store.courses ? store.courses.filter(it => store.account ? store.account.watchlistJS.includes(it.id) : "").map(item =>
                                            <Col sm={2}>
                                                <Course course={item} />
                                                <Button variant="danger" style={{ width: '100%' }} onClick={() => delWhiteList(item.id)}>Delete</Button>
                                            </Col>
                                        ) : [] : ""}
                                    </Row>
                                </Container>
                            </Card.Body>
                            <Card.Footer>

                            </Card.Footer>
                        </Card>
                    </Col>
                </Row> : ""}
        </>
    )
}
