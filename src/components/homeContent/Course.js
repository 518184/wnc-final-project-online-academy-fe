import React, { useContext, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Row, Col } from 'react-bootstrap';
import academyApppContext from '../../onlineAcademyAppContext';
import { axiosInstance } from '../../utils';

export default function Course({ course }) {
    
    const { store } = useContext(academyApppContext);
    const categoryTitle = store.categories?store.categories.filter(category => category.id === course.categoryId)[0]:[];
  
    // useEffect(function() {
    //   async function getCategory() {
    //     const res = await axiosInstance.get(`/categories/${course.categoryId}`);
    //     if(res.status === 200){
    //       dispatch({
    //         type: 'getCategory',
    //         payload: {
    //           id: course.id,
    //           category: res.data.title
    //         }
    //       });
    //     }
    //   }
    //   getCategory();
    // }, []);

    return (
        <Card>
          <Card.Body>
            <Card.Title as="h4" className="my-2"><center>{course.title}</center></Card.Title>
            <hr></hr>
            <Card.Text>Category: {categoryTitle?categoryTitle.title?categoryTitle.title:"":""}</Card.Text>
            <Card.Text>Teacher: {course.teacherId}</Card.Text>
            <Card.Text>Review Point: {course.reviewPoint}</Card.Text>
            <Card.Text>Reviews: {course.reviews}</Card.Text>
            <Card.Text>{course.thumbnail}</Card.Text>
            <Card.Text>Price: {course.price}</Card.Text>
            <Card.Text>{course.descriptionShort}</Card.Text>
          </Card.Body>
        </Card>
    )
}
