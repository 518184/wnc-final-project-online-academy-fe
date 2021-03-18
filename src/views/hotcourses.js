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
    var courseRef = [];
    if (store.courses != null) {
        const sortList = [].concat(store.courses);
        const sortList2 = sortList ? sortList.sort((a, b) => a.participants < b.participants ? 1 : -1) : [];
        courseRef = sortList2.splice(0, 5);
    }
    console.log(courseRef);
    return (
        <div>
            <Row>
                <Col></Col>
                <Col xs={5}>
                    <Carousel>
                        {courseRef.map(i =>
                            <Carousel.Item>
                                <Card>
                                    <Course course={i.id} />
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
