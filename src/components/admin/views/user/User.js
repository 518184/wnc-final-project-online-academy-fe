import React, { lazy, useState, useEffect, useReducer, forwardRef } from 'react'
import { axiosInstance, parseJwt } from '../../../../utils';
import { useForm } from 'react-hook-form';
import { Modal, Button, Form, FormCheck, Col, Row } from 'react-bootstrap';
import reducer from '../../userReducer';
import AppContext from '../../userContext';
import swal from 'sweetalert';

import MaterialTable from 'material-table';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import DetailsIcon from '@material-ui/icons/Details';



export default function User(props) {
	const [userTable, setUserTable] = useState([]);
	const { register, handleSubmit, watch, errors } = useForm();
	const [showModalDetail, setShowModalDetail] = useState(false);
	const [showModalEdit, setShowModalEdit] = useState(false);
	const [disableChangePassword, setDisableChangePassword] = useState(true);
	const handleDisableChangePassword = () => { disableChangePassword ? setDisableChangePassword(false) : setDisableChangePassword(true) };
	const handleShowModelDetail = () => setShowModalDetail(true);
	const handleCloseModalDetail = () => setShowModalDetail(false);
	const handleShowModelEdit = () => setShowModalEdit(true);
	const handleCloseModalEdit = () => setShowModalEdit(false);
	const initialUserData = {
		query: '',
		items: []
	}
	const [store, dispatch] = useReducer(reducer, initialUserData);

	useEffect(function () {
		async function loadDataUser() {
			const res = await axiosInstance.get('/users', { headers: { 'x-access-token': localStorage.account_accessToken } });
			if (res.status === 200) {
				dispatch({
					type: 'init',
					payload: {
						items: res.data,
						query: ''
					}
				});
			}
		}
		loadDataUser();
	}, []);
	const columns = [
		{ title: "ID", field: "id" },
		{ title: "Fullname", field: "fullname" },
		{ title: "Email", field: "email" },
		{ title: "Type", field: "type" }
	];

	const tableIcons = {
		Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
		Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
		Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
		Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
		DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
		Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
		Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
		Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
		FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
		LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
		NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
		PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
		ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
		Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
		SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
		ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
		ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
		DetailsIcon: forwardRef((props, ref) => <DetailsIcon {...props} ref={ref} />)
	};
	const reLoadDataUser = async function() {
		const res = await axiosInstance.get('/users', { headers: { 'x-access-token': localStorage.account_accessToken } });
		if (res.status === 200) {
			dispatch({
				type: 'init',
				payload: {
					items: res.data,
					query: ''
				}
			});
		}
	}

	const handleDetail = async function (dataRow) {
		let id = dataRow.id;
		let res = await axiosInstance.get('/users/' + id, { headers: { 'x-access-token': localStorage.account_accessToken } });
		if (res.status === 200) {
			setUserTable(res.data);
		}
		handleShowModelDetail();
	}

	const handleEdit = async function (dataRow) {
		let id = dataRow.id;
		let res = await axiosInstance.get('/users/' + id, { headers: { 'x-access-token': localStorage.account_accessToken } });
		if (res.status === 200) {
			setUserTable(res.data);
		}
		handleShowModelEdit();
	}

	const onSubmitUpdateUser = async function (data) {
		try {
			if (data != null && data.id > 0) {
				let id = data.id;
				data.type = parseInt(data.type);
				data.isActive = parseInt(data.isActive);
				delete data.id;
				console.log(data);
				let res = await axiosInstance.put('/users/' + id, data, {
					headers: { 'x-access-token': localStorage.account_accessToken }
				});
				if (res.status === 200) {
					reLoadDataUser();
					swal({
						title: "Account is updated",
						icon: "success",
						button: "OK"
					});
				} else {
					swal({
						title: "Failed",
						icon: "danger",
						button: "OK"
					});
				}
			}
		} catch (err) {
			console.log(err.response.data);
		}
	}

	return (
		<div>
			<AppContext.Provider value={{ store, dispatch }}>
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
									<div style={{ maxWidth: '100%' }}>
										<MaterialTable columns={columns} data={store.items} icons={tableIcons} title={null}
											actions={[
												{
													icon: tableIcons.DetailsIcon,
													tooltip: 'Detail User',
													onClick: (event, rowData) => handleDetail(rowData)
												},
												{
													icon: tableIcons.Edit,
													tooltip: 'Modify user',
													onClick: (event, rowData) => handleEdit(rowData)
												},
												{
													icon: tableIcons.Delete,
													tooltip: 'Delete User',
													onClick: (event, rowData) => handleEdit(rowData)
												}
											]}
										/>
									</div>
								</div>
								<div className="card-footer text-muted">
									Footer
          </div>
							</div>
						</div>
					</div>
				</div>
				<Modal show={showModalDetail} onHide={handleCloseModalDetail}>
					<Modal.Header closeButton>
						<Modal.Title>Detail User</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form>
							<Row>
								<Col>
									<Form.Group >
										<Form.Label>ID</Form.Label>
										<Form.Control type="text" name="id" value={userTable.id == null ? "" : userTable.id} disabled />
									</Form.Group>
									<Form.Group >
										<Form.Label>Fullname</Form.Label>
										<Form.Control type="text" name="fullname" value={userTable.fullname == null ? "" : userTable.fullname} disabled />
									</Form.Group>
									<Form.Group >
										<Form.Label>Email</Form.Label>
										<Form.Control type="text" name="email" value={userTable.email == null ? "" : userTable.email} disabled />
									</Form.Group>
									<Form.Group >
										<Form.Label>Type</Form.Label>
										<Form.Control type="text" name="type" value={userTable.type == null ? "" : userTable.type === 1 ? "Student" : userTable.type === 2 ? "Teacher" : "Admin"} disabled />
									</Form.Group>
									<Form.Group >
										<Form.Label>Active</Form.Label>
										<Form.Control type="text" name="isActive" value={userTable.isActive == null ? "" : userTable.isActive === 1 ? "Yes" : "No"} disabled />
									</Form.Group>
								</Col>
								<Col>
									<Form.Group >
										<Form.Label>Watch List</Form.Label>
										<Form.Control type="text" name="watchlist" value={userTable.watchlist == null ? "" : userTable.watchlist} disabled />
									</Form.Group>
									<Form.Group >
										<Form.Label>Created Date</Form.Label>
										<Form.Control type="text" name="createdDate" value={userTable.createdDate == null ? "" : userTable.createdDate} disabled />
									</Form.Group>
									<Form.Group >
										<Form.Label>Created By</Form.Label>
										<Form.Control type="text" name="createdBy" value={userTable.createdBy == null ? "" : userTable.createdBy} disabled />
									</Form.Group>
									<Form.Group >
										<Form.Label>Modified Date</Form.Label>
										<Form.Control type="text" name="modifiedDate" value={userTable.modifiedDate == null ? "" : userTable.modifiedDate} disabled />
									</Form.Group>
									<Form.Group >
										<Form.Label>Modified By</Form.Label>
										<Form.Control type="text" name="modifiedBy" value={userTable.modifiedBy == null ? "" : userTable.modifiedBy} disabled />
									</Form.Group>
								</Col>
							</Row>
						</Form>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={handleCloseModalDetail}>Close</Button>
					</Modal.Footer>
				</Modal>
				<Modal show={showModalEdit} onHide={handleCloseModalEdit}>
					<Form onSubmit={handleSubmit(onSubmitUpdateUser)}>
						<Modal.Header closeButton>
							<Modal.Title>Update User</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							<Form.Group >
								<Form.Label>ID</Form.Label>
								<Form.Control type="text" name="id" value={userTable.id == null ? "" : userTable.id} ref={register({ required: true })} readOnly />
							</Form.Group>
							<Form.Group >
								<Form.Label>Fullname</Form.Label>
								<Form.Control type="text" name="fullname" defaultValue={userTable.fullname == null ? "" : userTable.fullname} ref={register({ required: true })} autoFocus />
							</Form.Group>
							{/* <Form.Group >
								<Form.Check type="switch" id="custom-switch" label="Change password" onChange={handleDisableChangePassword}/>
								<Form.Label>Password</Form.Label>
								<Form.Control type="text" name="password" ref={register({ required: !{disableChangePassword} })} disabled={disableChangePassword} />
							</Form.Group> */}
							<Form.Group >
								<Form.Label>Email</Form.Label>
								<Form.Control type="text" name="email" defaultValue={userTable.email == null ? "" : userTable.email} ref={register({ required: true })} readOnly />
							</Form.Group>
							<Form.Group>
								<Form.Label>Type</Form.Label>
								<Form.Control as="select" name="type" defaultValue={userTable.type == null ? "" : userTable.type === 1 ? 1 : userTable.type === 2 ? 2 : 3} name="type" ref={register({ required: true })} >
									<option value="1">Student</option>
									<option value="2">Teacher</option>
									<option value="3">Admin</option>
								</Form.Control>
							</Form.Group>
							<Form.Group>
								<Form.Label>Active</Form.Label>
								<Form.Control as="select" name="isActive" defaultValue={userTable.isActive == null ? "" : userTable.isActive === 1 ? 1 : 0} ref={register({ required: true })} >
									<option value="1">Yes</option>
									<option value="0">No</option>
								</Form.Control>
							</Form.Group>
							{/* <Form.Group >
								<Form.Label>Watch List</Form.Label>
								<Form.Control type="text" name="watchlist" defaultValue={userTable.watchlist == null ? "" : userTable.watchlist} ref={register({ required: false })} />
							</Form.Group> */}
						</Modal.Body>
						<Modal.Footer>
							<Button variant="primary" type="submit">Update</Button>
							<Button variant="secondary" onClick={handleCloseModalEdit}>Close</Button>
						</Modal.Footer>
					</Form>
				</Modal>
			</AppContext.Provider>
		</div>
	);
}
