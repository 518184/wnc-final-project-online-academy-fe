import React, { useState, useEffect, useContext } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useDropzone } from 'react-dropzone';
import { axiosInstance } from "../utils"
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import "../App.css"
import swal from 'sweetalert';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import academyApppContext from '../onlineAcademyAppContext'

export default function UploadCourse() {

  const history = useHistory();
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

  const thumb = {
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

  const img = {
    display: 'block',
    width: 'auto',
    height: '100%'
  };

  const [files, setFiles] = useState([]);
  const [value, setValue] = useState('');

  const { getRootProps, getInputProps, open } = useDropzone({
    accept: 'video/*',
    noClick: true,
    noKeyboard: true,
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
    }
  });

  const thumbs = files.map(file => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <video
          src={file.preview}
          style={img}
        />
      </div>
    </div>
  ));

  useEffect(() => () => {
    // Make sure to revoke the data uris to avoid memory leaks
    files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);

  const upload = async (form) => {
    const body = new FormData();
    files.forEach(file => body.append("videos", file));

    body.append("metadata", JSON.stringify({
      outline: { content: value },
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

    }
  }

  return (
    <Container >
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
                    {store.categories.map(c => <option value={c.id}> {c.title}</option>)}
                  </Form.Control>
                </Form.Group>
              </Card.Body>
              <Card.Footer>
                <Button className="float-right py-2" variant="primary" type="submit">Upload</Button>
              </Card.Footer>
            </Card>
          </Form>
        </Col>
        <Col xs={6} className="mt-4">
          <div className="container">
            <div {...getRootProps({ className: 'dropzone' })}>
              <input {...getInputProps()} />
              <p>Drag 'n' drop some files here or open the dialog</p>
              <button type="button" onClick={open}>
                Open File Dialog
              </button>
            </div>
            <aside style={thumbsContainer}>
              {thumbs}
            </aside>
            <Form.Label>Outline</Form.Label>
            <ReactQuill theme="snow" value={value} onChange={setValue} />

          </div>
        </Col>

      </Row>

    </Container >
  );
}
