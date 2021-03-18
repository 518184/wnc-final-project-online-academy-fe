import React, { useContext, useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Row, Col, Button, Modal, Carousel, Form } from 'react-bootstrap';
import academyApppContext from '../../onlineAcademyAppContext';
import { axiosInstance } from '../../utils';
import '../homeContent/Course.css';
import "video-react/dist/video-react.css"; // import css
import { Player } from 'video-react';

//import images from '../../views/images';

export default function Course({ course }) {
  const { store } = useContext(academyApppContext);
  const categoryTitle = store.categories ? store.categories.filter(category => category.id === course.categoryId)[0] : [];

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const sortList = store.courses ? store.courses.filter(i => i.categoryId === course.categoryId).sort((a, b) => a.participants < b.participants ? 1 : -1) : [];
  const courseRef = [];
  for (var i = 0; i < sortList.length; i++) {
    if (sortList[i].id != course.id) {
      if (courseRef.length > 5) {
        break;
      }
      courseRef.push(sortList[i]);
    }
  }
  const feedbackList = store.feedback ? store.feedback.filter(i => i.courseId === course.id) : [];
  console.log(feedbackList);
  // console.log('list',sortList);
  // console.log(courseRef);
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
  const getResource = async () => {
    return await axiosInstance.get("/courses/" + course.id + "/resources/" + JSON.parse(course.outline).uploadFilenames[0]);
  }

  return (
    <div>
      <Card>
        {/* {images.map(ima=> )} */}
        {/* <Card.Img variant="top" src={images[]} /> */}
        <img src={require('../../img/java.jpg').default} />

        <Card.Body>
          <Card.Title as="h4" className="my-2"><center>{course.title}</center></Card.Title>
          <hr></hr>
          <Card.Text>Category: {categoryTitle ? categoryTitle.title ? categoryTitle.title : "" : ""}</Card.Text>
          <Card.Text>Teacher: {course.teacherId}</Card.Text>
          <Card.Text>Review Point: {course.reviewPoint}</Card.Text>
          <Card.Text>Reviews: {course.reviews}</Card.Text>

          <Card.Text>Price: {course.price}</Card.Text>
          <Card.Text>{course.descriptionShort}</Card.Text>
          <Button variant="primary" onClick={handleShow}>
            Launch demo modal
      </Button>
        </Card.Body>
      </Card>
      <Modal show={show} onHide={handleClose} dialogClassName="modal-90w" scrollable="true">
        <Modal.Header closeButton>
          <Modal.Title>{course.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <Card>
                <Card.Header>
                  <Player
                    playsInline
                    src={getResource}
                  />

                </Card.Header>
                <Card.Body>
                  <Button size="lg" className="mb-2" style={{ float: 'right' }} variant="success" onClick={handleClose}>
                    Purchase this course
                  </Button>
                  <Card.Text><b>Introduce: </b> {course.descriptionShort}</Card.Text>
                  <Card.Text><b>Detail: </b>{course.descriptionLong}</Card.Text>
                  <Card.Text><b>Point: </b>{course.reviewPoint}</Card.Text>
                  <Card.Text><b>Reviews: </b>{course.reviews}</Card.Text>
                  <Card.Text><b>Subcribe: </b>{course.participants}</Card.Text>
                  <Card.Text><b>Price: </b>{course.price}$</Card.Text>
                  <Card.Text><b>Sale: </b>{course.sale}</Card.Text>
                  <Card.Text><b>Modified Date: </b>{course.modifiedDate}</Card.Text>
                  {store.teacher ? store.teacher.filter(i => i.id === course.teacherId).map(j =>
                    <Card.Text><b>Teacher: </b>{j.fullname}</Card.Text>) : <Card.Text></Card.Text>
                  }
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card.Text><b>Outline: </b>{course.outline}</Card.Text>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card>
                <Card.Body>
                  <Card.Text><b>Feedback:</b></Card.Text>
                  {feedbackList.map(i =>
                    store.teacher ? store.teacher.filter(j => j.id === i.userId).map(k => <Card.Text><b><i>{k.fullname} </i></b> : {i.content}</Card.Text>) : <Card.Text></Card.Text>
                  )}
                  <Form>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                      <Form.Label>Comment:</Form.Label>
                      <Form.Control name="content" as="textarea" rows={3} />
                    </Form.Group>
                    <Button variant="primary">Submit</Button>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col></Col>
            <Col xs={5}>
              <Carousel>
                {courseRef.map(i =>
                  <Carousel.Item>
                    <Card>
                      <Card.Img src={require('../../img/java.jpg').default} />
                      <Card.Body>
                        <Button size="lg" className="mb-2" style={{ float: 'right' }} variant="success" onClick={handleClose}>
                          Purchase this course
                        </Button>
                        <Card.Text><b>Course Name: </b>{i.title}</Card.Text>
                        <Card.Text><b>Subcribe: </b>{i.participants}</Card.Text>
                      </Card.Body>
                    </Card>
                  </Carousel.Item>
                )}
              </Carousel>
            </Col>
            <Col></Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
