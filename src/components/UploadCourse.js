import React, { useState, useEffect } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useDropzone } from 'react-dropzone';
import { axiosInstance } from "../utils"
import { Button } from "react-bootstrap"

export default function UploadCourse() {

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
  const [input, setInput] = useState('');

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'video/*',
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

  let tiltle = ""
  const upload = () => {
    const body = new FormData();
    files.forEach(file => body.append("videos", file));

    body.append("metadata", JSON.stringify({
      outline: { content: value },
      categoryId: 1,
      title: input,
      descriptionShort: "ASDSDS",
      descriptionLong: "zxcxzczx",
    }));

    axiosInstance.post("/courses", body, { headers: { 'x-access-token': localStorage.account_accessToken } });
  }

  return (
    <div style={{ width: 800 }}>
      <h1>
        <input id="title" placeholder="Title" value={input} onInput={e => setInput(e.target.value)}></input>
      </h1>
      <section className="container">
        <div {...getRootProps({ className: 'dropzone' })}>
          <input {...getInputProps()} />
          <p>Drag 'n' drop some files here, or click to select files</p>
        </div>
        <aside style={thumbsContainer}>
          {thumbs}
        </aside>
      </section>
      <ReactQuill theme="snow" value={value} onChange={setValue} />
      <Button variant="primary" onClick={upload}>Upload</Button>
    </div>
  );
}
