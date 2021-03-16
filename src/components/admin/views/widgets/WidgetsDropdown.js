import React, { useState, useEffect } from 'react'
import {
	CWidgetDropdown,
	CRow,
	CCol,
} from '@coreui/react'
import { axiosInstance, parseJwt } from '../../../../utils';

const WidgetsDropdown = () => {

	const [countUser, setCountUser] = useState(0);
	const [countCategory, setCountCategory] = useState(0);
	const [countCourse, setCountCourse] = useState(0);

	useEffect(function () {
		async function loadDataUser() {
			const res = await axiosInstance.get('/users', { headers: { 'x-access-token': localStorage.account_accessToken } });
			if (res.status === 200) {
				setCountUser(parseInt(res.data.length));
			}
		}
		async function loadDataCategory() {
			const res = await axiosInstance.get('/categories', { headers: { 'x-access-token': localStorage.account_accessToken } });
			if (res.status === 200) {
				setCountCategory(parseInt(res.data.length));
			}
		}
		async function loadDataCourse() {
			const res = await axiosInstance.get('/courses', { headers: { 'x-access-token': localStorage.account_accessToken } });
			if (res.status === 200) {
				setCountCourse(parseInt(res.data.length));
			}
		}
		loadDataUser();
		loadDataCategory();
		loadDataCourse();
	}, []);

	// render
	return (
		<CRow>
			<CCol sm="6" lg="3">
				<CWidgetDropdown
					color="gradient-primary"
					header={countUser}
					text="Total users"
				>
				</CWidgetDropdown>
			</CCol>

			<CCol sm="6" lg="3">
				<CWidgetDropdown
					color="gradient-info"
					header={countCategory}
					text="Total categories"
				>
				</CWidgetDropdown>
			</CCol>

			<CCol sm="6" lg="3">
				<CWidgetDropdown
					color="gradient-warning"
					header={countCourse}
					text="Total courses"
				>
				</CWidgetDropdown>
			</CCol>
		</CRow>
	)
}

export default WidgetsDropdown
