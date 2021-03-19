import React, { useContext, useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useForm } from 'react-hook-form';
import { Card, Row, Col, Button, Modal, Carousel, Form } from 'react-bootstrap';
import swal from 'sweetalert';
import Course from "../components/homeContent/Course";
import academyApppContext from '../onlineAcademyAppContext';
import { axiosInstance } from '../utils';
//import images from '../../views/images';

export default function HotCourses() {
    const { store } = useContext(academyApppContext);
    Date.prototype.getWeekNumber = function () {
        var d = new Date(Date.UTC(this.getFullYear(), this.getMonth(), this.getDate()));
        var dayNum = d.getUTCDay() || 7;
        d.setUTCDate(d.getUTCDate() + 4 - dayNum);
        var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
        return Math.ceil((((d - yearStart) / 86400000) + 1) / 7)
    };
    var courseRef = [];
    if (store.courses != null) {
        let currWeek = new Date().getWeekNumber();
        const sortList = [].concat(store.courses.filter(it => (currWeek - new Date(it.createdDate).getWeekNumber() === 1) && (it.participants != 0) && (it.reviewPoint >= 7)));
        const sortList2 = sortList ? sortList.sort((a, b) => a.participants < b.participants ? 1 : -1) : [];
        courseRef = sortList2.splice(0, 3);
    }
    return (
        <div>
            <Row>
                <Col></Col>
                <Col xs={5}>
                    <h1>Hot Course</h1>
                    <Carousel>
                        {courseRef.map(i =>
                            <Carousel.Item>
                                <Card>
                                    <Card.Body>
                                        <Card.Img src={require('../img/icon/hot.png').default} style={{width : 70, zIndex: 2, position: 'absolute'}}></Card.Img>
                                        <Course course={i} />
                                    </Card.Body>
                                </Card>
                            </Carousel.Item>
                        )}
                    </Carousel>
                </Col>
                <Col></Col>
            </Row>

        </div>
    )
}
