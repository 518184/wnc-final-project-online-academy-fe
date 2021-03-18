import React, { useContext, useEffect, useState } from 'react';
import { Row, Col, InputGroup, Button, FormControl } from "react-bootstrap";
import ListCourses from "../components/homeContent/ListCourses";
import SearchCourse from "../components/homeContent/searchCourse";
import CustomPagination from "../components/homeContent/CustomPagination";
import academyApppContext from '../onlineAcademyAppContext';
import Select from 'react-select';

export default function Resultcategories(props) {
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(8);
    const { store, dispatch } = useContext(academyApppContext);
    const [selectedType, setSelectedType] = useState(1); 
    const displayType = [
        {value: 1, label: 'Default'},
        {value: 2, label: 'Point'},
        {value: 3, label: 'Price'}
    ]

    const getValue = function(e) {
        setSelectedType(e.value);
    }

    var sortList = [].concat(store.courses);
    if(selectedType === 1){
        sortList = store.courses;
    } else if (selectedType === 2){
        sortList = sortList.sort((a,b) => a.reviewPoint < b.reviewPoint ? 1 : -1);
    } else if (selectedType === 3){
        sortList = sortList.sort((a,b) => a.price >= b.price ? 1 : -1);
    }
    const indexOfLastPage = currentPage *  postsPerPage;
    const indexOfFirstPage = indexOfLastPage - postsPerPage;
    var currentPosts = sortList.slice(indexOfFirstPage, indexOfLastPage);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const goHome = function() {
		dispatch({
			type: 'changeMode',
			payload: {
				mode: 'default'
			}
		})
	}
    return (
        <>
        <Button onClick={goHome}>Go home</Button>
            <Row className="my-3">
                <Col><center><h1>Course List</h1></center></Col>
            </Row>
            <Row className="my-4">
                <Col xs={1}></Col>
                <Col xs={2}>
                    <h4>Sort By</h4>
                    <Select value={displayType.find(type => type.value === selectedType)} options={displayType} onChange={getValue} />
                </Col>
                <Col xs={5}></Col>
                <Col>
                    <SearchCourse initQuery="" />
                </Col>
                <Col xs={1}></Col>
            </Row>
            <Row>
                <Col>
                    <ListCourses currentPosts={currentPosts}/>
                    <CustomPagination postsPerPage={postsPerPage} totalPage={store.courses.length} paginate={paginate} currentPage={currentPage}/>
                </Col>
            </Row>
        </>
    )
}
