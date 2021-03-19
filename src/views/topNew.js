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

export default function TopNew() {
    const { store } = useContext(academyApppContext);
    var courseRef = [];
    if (store.courses != null) {
        const sortList = [].concat(store.courses);
        const sortList2 = sortList ? sortList.sort((a, b) => a.createdDate < b.createdDate ? 1 : -1) : [];
        courseRef = sortList2.splice(0, 10);
    }
    return (
        <div>
            <center><h1>Top New Course</h1></center>
            <Carousel>
                {courseRef.map(i =>
                    <Carousel.Item>
                        <Course course={i} />
                    </Carousel.Item>
                )}
            </Carousel>
        </div>
    )
}
