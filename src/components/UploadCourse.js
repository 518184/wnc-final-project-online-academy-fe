import React, { useState, useEffect, useContext } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useDropzone } from 'react-dropzone';
import { axiosInstance } from "../utils"
import { useForm } from 'react-hook-form';
import "../App.css"
import swal from 'sweetalert';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import academyApppContext from '../onlineAcademyAppContext'
import "../components/header/headerPrimary.css"
export default function UploadCourse() {

  const { register, handleSubmit } = useForm();

  const { store, dispatch } = useContext(academyApppContext);

  const changeView = function (mode) {
    dispatch({
      type: 'changeMode',
      payload: {
        mode
      }
    })
  }

  const thumbsContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16
  };

  const thumbStyle = {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: 'border-box'
  };

  const thumbInner = {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden'
  };

  const imgStyle = {
    display: 'block',
    width: 'auto',
    height: '100%'
  };

  const [state, setState] = useState({ files: [] });
  const [value, setValue] = useState([]);

  const { getRootProps, getInputProps, open } = useDropzone({
    accept: 'video/*',
    noClick: true,
    noKeyboard: true,
    multiple: false,
    onDrop: (acceptedFiles) => {
      setState((oldState) => ({
        files: [...oldState.files, acceptedFiles.map(file => Object.assign(file, {
          preview: URL.createObjectURL(file),
          userId: localStorage.account_userID
        })).map(file => dispatch({
          type: 'addLocalFile',
          payload: file
        }))]
      }));
    }
  });

  function thumb(id) {
    if (store.localFiles && store.localFiles.length && store.localFiles.filter(f => f.userId === localStorage.account_userID)[id]) {
      return (
        <div style={thumbStyle} key={store.localFiles.filter(f => f.userId === localStorage.account_userID)[id].name}>
          <div style={thumbInner}>
            <video
              src={store.localFiles.filter(f => f.userId === localStorage.account_userID)[id].preview}
              style={imgStyle}
            />
          </div>
        </div>
      )
    }
    return null;
  }

  useEffect(() => {
    dispatch({
      type: 'initLocalFile',
      payload: []
    })
  }, []);

  const upload = async (form) => {
    const body = new FormData();
    store.localFiles.forEach(file => body.append("videos", file));

    body.append("metadata", JSON.stringify({
      outline: value,
      categoryId: form.category,
      title: form.title,
      descriptionShort: form.description,
      descriptionLong: form.description,
    }));

    const res = await axiosInstance.post("/courses", body, { headers: { 'x-access-token': localStorage.account_accessToken } });
    if (res.status === 201) {
      swal({
        title: "Course uploaded",
        text: "Course uploaded with id: " + JSON.stringify(res.data.id),
        icon: "success",
      })
      changeView("default")
      dispatch({
        type: 'clearLocalFiles'
      })
    }
  }

  return (
    <Container className="course">
      <Row>
        <Col xs={6} className="mt-4">
          <Form onSubmit={handleSubmit(upload)}>
            <Card>
              <Card.Body>
                <Card.Title as="h3"><center>Course upload</center></Card.Title>
                <hr></hr>
                <Form.Group controlId="title">
                  <Form.Label>Title</Form.Label>
                  <Form.Control type="text" name="title" placeholder="Course title" ref={register({ required: true })} />
                </Form.Group>

                <Form.Group controlId="description">
                  <Form.Label>Description</Form.Label>
                  <Form.Control type="text" name="description" placeholder="Course description" ref={register({ required: true })} />
                </Form.Group>

                <Form.Group controlId="category">
                  <Form.Label>Category</Form.Label>
                  <Form.Control as="select" name="category" ref={register({ required: true })} >
                    {store.categories.map(c => <option key={c.id} value={c.id}> {c.title}</option>)}
                  </Form.Control>
                </Form.Group>
              </Card.Body>
              <Card.Footer>
                <Button className="float-right py-2" variant="primary" type="submit">Upload</Button>
              </Card.Footer>
            </Card>
          </Form>
        </Col>
        <Col xs={6} className="mt-4" style={{ border: '5px solid #a8cef3' }}>
          <div {...getRootProps({ className: 'dropzone' })}>
            <input {...getInputProps()} />
            <p>Drag 'n' drop some files here or open the dialog</p>
            <button type="button" onClick={open}>
              Open File Dialog
          </button>
          </div>
          <aside style={thumbsContainer}>
            {thumb(0)}
          </aside>
          <Form.Label>Outline</Form.Label>
          <ReactQuill theme="snow" value={value} onChange={setValue} />
          <hr style={{ border: '2px solid black' }} />
          <div {...getRootProps({ className: 'dropzone' })}>
            <input {...getInputProps()} />
            <p>Drag 'n' drop some files here or open the dialog</p>
            <button type="button" onClick={open}>
              Open File Dialog
          </button>
          </div>
          <aside style={thumbsContainer}>
            {thumb(1)}
          </aside>
          <Form.Label>Outline</Form.Label>
          <ReactQuill theme="snow" value={value} onChange={setValue} />
          <hr style={{ border: '2px solid black' }} />
          <div {...getRootProps({ className: 'dropzone' })}>
            <input {...getInputProps()} />
            <p>Drag 'n' drop some files here or open the dialog</p>
            <button type="button" onClick={open}>
              Open File Dialog
          </button>
          </div>
          <aside style={thumbsContainer}>
            {thumb(2)}
          </aside>
          <Form.Label>Outline</Form.Label>
          <ReactQuill theme="snow" value={value} onChange={setValue} />
        </Col>
        <Col xs={6} className="mt-4">
          <button className="button" style={{ float: "right" }}>Add more outline</button>
        </Col>
      </Row>
    </Container >
  );
}
