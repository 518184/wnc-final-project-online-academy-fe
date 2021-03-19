import React, { useContext, useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useForm } from 'react-hook-form';
import { Card, Row, Col, Button, Modal, Carousel, Form } from 'react-bootstrap';
import swal from 'sweetalert';
import Course from "../components/homeContent/Course";
import academyApppContext from '../onlineAcademyAppContext';
import { axiosInstance } from '../utils';
import { _ } from "core-js";
//import images from '../../views/images';

export default function TopWatchList() {
    const { store } = useContext(academyApppContext);
    var courseRef = [];
    if (store.teacher && store.courses) {
        const sortList = [].concat(store.teacher.filter(item => item.watchlist ? (JSON.parse(item.watchlist).course).length > 0 ? item : "" : "").map(it => JSON.parse(it.watchlist).course));
        const temp = [].concat(...sortList);
        const counts = {};
        temp.forEach((el) => {
            counts[el] = counts[el] ? (counts[el] += 1) : 1;
        });
        const countId = Object.entries(counts).sort(([_, a], [__, b]) => b - a).map(it => parseInt(it[0]));
        const watchList = store.courses?store.courses.filter(it => countId.includes(it.id)):[];
        courseRef = watchList.splice(0, 10);
    }
    return (
        <div>
            <Row>
                <Col></Col>
                <Col xs={5}>
                    <h1>Top Wacth</h1>
                    <Carousel>
                        {courseRef.map(i =>
                            <Carousel.Item>
                                <Card>
                                    <Course course={i} />
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
