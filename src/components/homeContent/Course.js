import React, { useContext, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useForm } from 'react-hook-form';
import { Card, Row, Col, Button, Modal, Carousel, Form, Alert } from 'react-bootstrap';
import academyApppContext from '../../onlineAcademyAppContext';
import { axiosInstance, parseJwt } from '../../utils';
import swal from 'sweetalert';
import '../homeContent/Course.css';
import { FaHeart, FaRegHeart } from "react-icons/fa";

export default function Course({ course }) {
	const { store, dispatch } = useContext(academyApppContext);
	const categoryTitle = store.categories ? store.categories.filter(category => category.id === course.categoryId)[0] : [];
	const { register, handleSubmit } = useForm();
	const [show, setShow] = useState(false);
	const [disableButton, setDisableButton] = useState(false);
	const [like, setLike] = useState(false);
	const [alertActive, setAlertActive] = useState(false);


	const addWhiteList = async function () {
		try {
			const res = await axiosInstance.post('/users/watchlist/' + course.id, {}, { headers: { 'x-access-token': localStorage.account_accessToken } });
		} catch (err) {
			if (err.response.status === 403) {
				swal({
					title: "Your account has not been activated",
					text: "Please activate your account with otp before using this feature!",
					icon: "error",
					button: "OK",
				})
				setLike(false);
			} else {
				console.log(err.response.data);
			}
		}
	}

	const delWhiteList = async function () {
		try {
			const res = await axiosInstance.delete('/users/delete/watchlist/' + course.id, { headers: { 'x-access-token': localStorage.account_accessToken } });
		} catch (err) {
			console.log(err.response.data);
		}
	}
	const handleClose = () => setShow(false);
	const handleShow = async () => {
		setShow(true);
		if (localStorage.account_accessToken) {
			try {
				const res = await axiosInstance.get('/transaction/user/' + localStorage.account_userID, { headers: { 'x-access-token': localStorage.account_accessToken } });
				if (res.status === 200) {
					for (var i of res.data) {
						if (i.courseId === course.id) {
							setDisableButton(true);
							break;
						}
					}
					store.accountInfo ? JSON.parse(store.accountInfo.watchlist).course.includes(course.id) ? setLike(true) : setLike(false) : setLike(false);
				}
			} catch (err) {
				if (err.response.status === 403) {
					setAlertActive(true);
				} else {
					console.log(err);
				}
			}
		}
	}
	const sortList = store.courses ? store.courses.filter(i => i.categoryId === course.categoryId).sort((a, b) => a.participants < b.participants ? 1 : -1) : [];
	const courseRef = [];
	for (var i = 0; i < sortList.length; i++) {
		if (sortList[i].id !== course.id) {
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
			try {
				const res = await axiosInstance.post('/transaction', data, { headers: { 'x-access-token': localStorage.account_accessToken } });
				if (res.status === 201) {
					try {
						const res2 = await axiosInstance.put('/transaction/' + res.data.id + '/payment', data, { headers: { 'x-access-token': localStorage.account_accessToken } });
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
					} catch (err) {
						console.log(err.response.data)
					}
				}
			} catch (err) {
				if (err.response.status === 403) {
					swal({
						title: "Your account has not been activated",
						text: "Please activate your account with otp before using this feature!",
						icon: "error",
						button: "OK",
					})
				} else {
					console.log(err.response.data);
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
			try {
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
			} catch (err) {
				console.log(err);
			}
		} else {
			swal({
				title: "Please login!",
				icon: "warning",
				button: "OK"
			});
		}
	}

	// const watchList = localStorage.account_accessToken ? store.teacher ? store.teacher.filter(i => i.id === +localStorage.account_userID)

	function loadContent() {
		return feedbackList.map(i =>
			store.teacher ? store.teacher.filter(j => j.id === i.userId).map(k => <Card.Text key={k.id}><b><i>{k.fullname} </i></b> : {i.content}</Card.Text>) : <Card.Text></Card.Text>)
	}

	// if(store.accountInfo){
	//   console.log(store.accountInfo.watchlist)
	// }
	function getFavourist() {
		if (store.accountInfo) {
			if (store.accountInfo.watchlist) {
				const watchListTemp = JSON.parse(store.accountInfo.watchlist).course;
				for (var i of watchListTemp) {
					if (i === course.id) {
						setLike(true);
						return;
					}
				}
			}
		}
	}
	//getFavourist();
	Date.prototype.getWeekNumber = function () {
		var d = new Date(Date.UTC(this.getFullYear(), this.getMonth(), this.getDate()));
		var dayNum = d.getUTCDay() || 7;
		d.setUTCDate(d.getUTCDate() + 4 - dayNum);
		var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
		return Math.ceil((((d - yearStart) / 86400000) + 1) / 7)
	};
	var hotCourses = [];

	if (store.courses != null) {
		let currWeek = new Date().getWeekNumber();
		const sortList = [].concat(store.courses.filter(it => (currWeek - new Date(it.createdDate).getWeekNumber() === 1) && (it.participants !== 0) && (it.reviewPoint >= 7)));
		const sortList2 = sortList ? sortList.sort((a, b) => a.participants < b.participants ? 1 : -1) : [];
		hotCourses = sortList2.splice(0, 3);
	}

	const likeClicked = function () {
		if (like) {
			delWhiteList();
			setLike(false);
		} else {
			addWhiteList();
			setLike(true);
		}
	}

	return (
		<div>
			{(() => {
				if (course.sale) {
					return (
						<Card style={{ boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' }}>
							<img src={require('../../img/java.jpg').default} />
							<Card.Body style={{ height: 350 }}>
								<img src={require('../../img/icon/sale.png').default} style={{ width: 150, zIndex: 1, position: 'absolute', right: 2, top: '50%' }} />
								<Card.Title as="h4" className="my-2"><center>{course.title}</center></Card.Title>
								<hr></hr>
								<Card.Text>Category: {categoryTitle ? categoryTitle.title ? categoryTitle.title : "" : ""}</Card.Text>
								{
									store.teacher ? store.teacher.filter(i => i.id === course.teacherId).map(j =>
										<Card.Text key={j.id}>Teacher: {j.fullname}</Card.Text>
									) : <Card.Text></Card.Text>
								}

								<Card.Text>Review Point: {course.reviewPoint}</Card.Text>
								<Card.Text>Reviews: {course.reviews}</Card.Text>
								<Card.Text>Price: {course.price}</Card.Text>
								<Card.Text>Sale: {course.sale}</Card.Text>
								<Card.Text>{course.descriptionShort}</Card.Text>
								<br></br>
							</Card.Body>
							<Card.Footer style={{ borderTop: 'none' }}>
								<center>
									<Button variant="primary" size="lg" onClick={handleShow}>Detail</Button>
								</center>
							</Card.Footer>
						</Card>
					)
				} else {
					if (hotCourses) {
						for (var i of hotCourses) {
							if (i.id === course.id) {
								return (
									<Card style={{ boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' }}>
										<Card.Img src={require('../../img/icon/hot.png').default} style={{ width: 70, zIndex: 1, position: 'absolute', right: 0 }}></Card.Img>
										<img src={require('../../img/java.jpg').default} />
										<Card.Body style={{ height: 350 }}>
											<Card.Title as="h4" className="my-2"><center>{course.title}</center></Card.Title>
											<hr></hr>
											<Card.Text>Category: {categoryTitle ? categoryTitle.title ? categoryTitle.title : "" : ""}</Card.Text>
											{
												store.teacher ? store.teacher.filter(i => i.id === course.teacherId).map(j =>
													<Card.Text key={j.id}>Teacher: {j.fullname}</Card.Text>
												) : <Card.Text></Card.Text>
											}
											<Card.Text>Review Point: {course.reviewPoint}</Card.Text>
											<Card.Text>Reviews: {course.reviews}</Card.Text>

											<Card.Text>Price: {course.price}</Card.Text>
											<Card.Text>{course.descriptionShort}</Card.Text>
											<br></br>
										</Card.Body>
										<Card.Footer style={{ borderTop: 'none' }}>
											<center>
												<Button variant="primary" size="lg" onClick={handleShow}>Detail</Button>
											</center>
										</Card.Footer>
									</Card>
								)
							}
						}
					}
					return (
						<Card style={{ boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' }}>
							<img src={require('../../img/java.jpg').default} />
							<Card.Body style={{ height: 350 }}>
								<Card.Title as="h4" className="my-2"><center>{course.title}</center></Card.Title>
								<hr></hr>
								<Card.Text>Category: {categoryTitle ? categoryTitle.title ? categoryTitle.title : "" : ""}</Card.Text>
								{
									store.teacher ? store.teacher.filter(i => i.id === course.teacherId).map(j =>
										<Card.Text key={j.id}>Teacher: {j.fullname}</Card.Text>
									) : <Card.Text></Card.Text>
								}
								<Card.Text>Review Point: {course.reviewPoint}</Card.Text>
								<Card.Text>Reviews: {course.reviews}</Card.Text>

								<Card.Text>Price: {course.price}</Card.Text>
								<Card.Text>{course.descriptionShort}</Card.Text>
								<br></br>
							</Card.Body>
							<Card.Footer style={{ borderTop: 'none' }}>
								<center>
									<Button variant="primary" size="lg" onClick={handleShow}>Detail</Button>
								</center>
							</Card.Footer>
						</Card>
					)
				}
			})()}

			<Modal show={show} onHide={handleClose} dialogClassName="modal-90w" scrollable="true">
				<Modal.Header closeButton>
					<Modal.Title>{course.title}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Alert variant="danger" show={alertActive} onClose={() => setAlertActive(false)} dismissible>
						<Alert.Heading>Your Account Is Not Active!</Alert.Heading>
						<p>
							Your account is not active by otp code, please get it in your mail
							and confirm in your profile!
                    </p>
					</Alert>
					<Row>
						<Col>
							<Card>
								<Card.Header>
									{/* <Player
                    playsInline
                    src={axiosInstance.get("/courses/" + course.id + "/resources/" + JSON.parse(course.outline).uploadFilenames[0])}
                  /> */}

									<iframe
										title="Mohamad Alaloush's Story"
										allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
										allowFullScreen={false}
										//src={"http://localhost:3001/resources/" + JSON.parse(course.outline).uploadDir + JSON.parse(course.outline).uploadFilenames[0]}
										// src={"http://localhost:3001/resources/" + '\\08f60dae-3572-48ba-8d6f-fa8c23fbf1b7\\Kalinka.mp4'}
										width="100%"
										height="400px"
										frameBorder="0"
									></iframe>
									{/* <Player
      playsInline
      poster={require("../../img/java.jpg").default}
      src={video}
    /> */}

									{/* {
        (() => {
          const outline = JSON.parse(course.outline);
          if(outline){
            return <video controls poster={require('../../img/java.jpg').default} width='100%' height='400px'><source src={require(outline.uploadDir + '\\' + outline.uploadFilenames[0]).default} type="video/mp4"/></video>
          }
          
        })()
      } */}
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
										<Card.Text key={j.id}><b>Teacher: </b>{j.fullname}</Card.Text>) : <Card.Text></Card.Text>
									}
									{/* {
                    store.accountInfo ? JSON.parse(store.accountInfo.watchlist).course.filter(i => i === course.id) ? setLike(true) : setLike(false) : setLike(false)
                  } */}
									{(() => {

										if (!like) {
											return <Card.Text style={{ color: 'red', fontSize: 25 }} onClick={() => likeClicked()}><FaRegHeart /></Card.Text>
										} else {
											return <Card.Text style={{ color: 'red', fontSize: 25 }} onClick={() => likeClicked()}><FaHeart /></Card.Text>
										}
									})()}
								</Card.Body>
							</Card>
						</Col>
						<Col>
							<Card.Text><b>Outline: </b>
								{/* {(()=>{
                if(course.outline) {
                  const outline = JSON.parse(course.outline);
                  return <Card.Text>{outline}</Card.Text>;
                }
              })()} */}
							</Card.Text>
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
									<Carousel.Item key={i.id}>
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
