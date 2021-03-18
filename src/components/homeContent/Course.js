import React, { useContext, useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useForm } from 'react-hook-form';
import { Card, Row, Col, Button, Modal, Carousel, Form } from 'react-bootstrap';
import academyApppContext from '../../onlineAcademyAppContext';
import { axiosInstance, parseJwt } from '../../utils';
import swal from 'sweetalert';
//import images from '../../views/images';
import '../homeContent/Course.css';

export default function Course({ course }) {
  const { store, dispatch } = useContext(academyApppContext);
  const categoryTitle = store.categories ? store.categories.filter(category => category.id === course.categoryId)[0] : [];
  const { register, handleSubmit, watch, errors } = useForm();
  const [show, setShow] = useState(false);
  const [disableButton, setDisableButton] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = async () => {
    setShow(true);
    if (localStorage.account_accessToken) {
      const res = await axiosInstance.get('/transaction/user/' + localStorage.account_userID, { headers: { 'x-access-token': localStorage.account_accessToken } });
      if (res.status === 200) {
        for (var i of res.data) {
          if (i.courseId === course.id) {
            setDisableButton(true);
            break;
          }
        }
      }
    }
  }
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

  const addCourse = async function (courseId) {
    if (localStorage.account_accessToken) {
      let data = {}
      data.courseId = courseId;
      const res = await axiosInstance.post('/transaction', data, { headers: { 'x-access-token': localStorage.account_accessToken } });
      if (res.status === 201) {
        const res2 = await axiosInstance.put('/transaction/' + res.data.id + '/payment', data, { headers: { 'x-access-token': localStorage.account_accessToken } });
        console.log(res);
        console.log(res2);
        if (res2.status === 200) {
          swal({
            title: "Purchase is successful!",
            icon: "success",
            button: "OK"
          });
          setDisableButton(true);
          const res1 = await axiosInstance.get("/courses");
          if (res1.status === 200) {
            dispatch({
              type: 'reloadCourses',
              payload: {
                courses: res1.data,
              }
            });
          }
        }
      }
    } else {
      swal({
        title: "Please login!",
        icon: "warning",
        button: "OK"
      });
    }
  }


  const onSubmit = async function (data) {
    if (data && localStorage.account_accessToken) {
      const dataToPost = {
        "courseId": parseInt(course.id),
        "userId": parseInt(localStorage.account_userID),
        "point": parseInt(data.point),
        "content": data.content
      }
      const addFeedback = await axiosInstance.post('/feedbacks', dataToPost, { headers: { 'x-access-token': localStorage.account_accessToken } });
      if (addFeedback.status === 201) {
        swal({
          title: "Feedback is successful!",
          text: "Your comment will be posted later",
          icon: "success",
          button: "OK"
        });
        const res = await axiosInstance.get('/feedbacks');

        if (res.status === 200) {
          dispatch({
            type: 'getFeedback',
            payload: {
              feedback: res.data,
            }
          });
          console.log(store.feedback);
          loadContent();
        }
        const res1 = await axiosInstance.get("/courses");
        if (res1.status === 200) {
          dispatch({
            type: 'reloadCourses',
            payload: {
              courses: res1.data,
            }
          });
        }

      }
    } else {
      swal({
        title: "Please login!",
        icon: "warning",
        button: "OK"
      });
    }
  }

  function loadContent() {
    return feedbackList.map(i =>
      store.teacher ? store.teacher.filter(j => j.id === i.userId).map(k => <Card.Text><b><i>{k.fullname} </i></b> : {i.content}</Card.Text>) : <Card.Text></Card.Text>)
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
                  {/* <iframe
                    title="Mohamad Alaloush's Story"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen=""
                    src="https://www.youtube.com/embed/QFIhEmOd6No/?autoplay=1"
                    width="100%"
                    height="400px"
                    frameborder="0"
                  ></iframe> */}
                </Card.Header>
                <Card.Body>
                  {
                    // store.payment ? store.account ? store.payment.filter(i => i.courseId === course.id && i.userId === store.account.id).map(
                    //   <Button size="lg" className="mb-2" style={{ float: 'right' }} variant="success" onClick={()=>addCourse(course.id)} disable="true">
                    //     Purchase this course
                    //   </Button>
                    // ) : <Button size="lg" className="mb-2" style={{ float: 'right' }} variant="success" onClick={()=>addCourse(course.id)} disable="true">
                    //       Purchase this course
                    //     </Button> : <Button size="lg" className="mb-2" style={{ float: 'right' }} variant="success" onClick={()=>addCourse(course.id)} disable="true">
                    //     Purchase this course
                    //   </Button>

                    // store.payment ? store.payment.filter(i => i.courseId === course.id && i.userId === parseJwt(localStorage.account_accessToken).userId).map(
                    //   <Button size="lg" className="mb-2" style={{ float: 'right' }} variant="success" disabled>
                    //        Purchase this course
                    //   </Button>
                    //  ) : <Button size="lg" className="mb-2" style={{ float: 'right' }} variant="success" onClick={()=>addCourse(course.id)}>
                    //     Purchase this course
                    //   </Button>

                    // (() => {
                    //   if (store.payment) {
                    //     for (var i of store.payment) {
                    //       if (i.courseId === course.id) {
                    //         if (i.userId === parseJwt(localStorage.account_accessToken).userId) {
                    //           handleClose();
                    //           return ;
                    //         }
                    //       }
                    //     }
                    //   }
                    // })()
                  }
                  <Button size="lg" className="mb-2" style={{ float: 'right' }} variant="success" onClick={() => addCourse(course.id)} disabled={disableButton}>Purchase this course</Button>

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
                  {
                    loadContent()
                  }
                  <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group>
                      <Form.Label>Review of You:</Form.Label>
                      <Form.Text><i>Point</i></Form.Text>
                      <Form.Control name="point" as="select" defaultValue='10' ref={register({ required: true })} >
                        <option value='0'>0</option>
                        <option value='1'>1</option>
                        <option value='2'>2</option>
                        <option value='3'>3</option>
                        <option value='4'>4</option>
                        <option value='5'>5</option>
                        <option value='6'>6</option>
                        <option value='7'>7</option>
                        <option value='8'>8</option>
                        <option value='9'>9</option>
                        <option value='10'>10</option>
                      </Form.Control>
                      <Form.Text><i>Comment</i></Form.Text>
                      <Form.Control name="content" as="textarea" rows={3} ref={register({ required: false })} />
                    </Form.Group>
                    <Button variant="primary" type="submit">Submit</Button>
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
                        <Button size="lg" className="mb-2" style={{ float: 'right' }} variant="success" onClick={() => addCourse(i.id)}>
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
