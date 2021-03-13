import React, { lazy, useState } from 'react'
import { axiosInstance, parseJwt } from '../../../../utils';
import { useForm } from 'react-hook-form';
import {Modal, Button, Form} from 'react-bootstrap';
import 'jquery/dist/jquery.min.js';
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery';



const User = () => {
    const [show, setShow] = useState(false);
    const [userTable, setUserTable] = useState([]);
    const { register, handleSubmit, watch, errors } = useForm();
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    //initialize datatable
    var table;
    $(document).ready(function () {
        axiosInstance.get('/users', {
            headers: {'x-access-token': localStorage.account_accessToken}
        }).then((res) => {
            for (var user of res.data) {
                const tr = `<tr>
                        <th scope="row">${user.id}</th>
                        <td>${user.fullname}</td>
                        <td>${user.email}</td>
                        <td>${user.createdDate}</td>
                        <td>${user.modifiedDate}</td>
                        <td>
                            <button type="button" id="info" class="btn btn-info btn-xs dt-edit" style="margin-right:16px;">
                            <span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>
                            </button>
                            <button type="button" id="edit" class="btn btn-primary btn-xs dt-edit" style="margin-right:16px;">
                            <span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>
                            </button>
                            <button type="button" id="del" class="btn btn-danger btn-xs dt-delete">
                                <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
                            </button>
                        </td>
                    </tr>`;
                $('#user_table').append(tr);
            }
            table = $('#user_table').DataTable({
                destroy: true,
                scrollCollapse: true,
                dom: '<"dt-buttons"Bf><"clear">lirtp',
                columnDefs: [
                    { "orderable": false, "targets": 5 }
                ],
                buttons: [
                    'colvis',
                    'copyHtml5',
                    'csvHtml5',
                    'excelHtml5',
                    'pdfHtml5',
                    'print'
                ]
            });
        }, (error) => {
            console.log(error);
        });
        $('#user_table tbody').on('click', '[id*=info]', function () {
            var data = table.row($(this).parents('tr')).data();
            var customerID = data[0];
        });
        $('#user_table tbody').on('click', '[id*=edit]', function () {
            handleShow();
            var data = table.row($(this).parents('tr')).data();
            var id = data[0];
            axiosInstance.get('/users/'+id, {
                headers: {'x-access-token': localStorage.account_accessToken}
            }).then((res) => {
                console.log(res.data);
                setUserTable(res.data);
            }, (error) => {
                console.log(error);
            });
        });
        $('#user_table tbody').on('click', '[id*=del]', function () {
            var data = table.row($(this).parents('tr')).data();
            var customerID = data[0];
        });
    });
    
  return (
    <>
    <div className="container mt-3">
    <div className="row mt-3">
      <div className="col-sm-12">
        <div className="card shadow">
            <h3 className="card-header d-flex">
                User List from Academy
            </h3>
        <div className="card-body">
            <div className="row">
                <button className="btn btn-warning">Reload</button>
                <button className="btn btn-primary">New</button>
            </div>
            <br></br>
            <table className="table table-hover" id="user_table">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Fullname</th>
                  <th scope="col">Email</th>
                  <th scope="col">Create_date</th>
                  <th scope="col">Last_update</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody id="customer_container">
              </tbody>
            </table>
          </div>
          <div className="card-footer text-muted">
            Footer
          </div>
        </div>
      </div>
    </div>
    </div>
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form.Group >
                <Form.Label>ID</Form.Label>
                <Form.Control type="text" name="id" value={userTable.id || ""} ref={register({ required: true })} disabled/>           
            </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
        </Modal.Footer>
    </Modal>
    </>
  );
}

export default User;
