import React, { useContext, useEffect, useState, Modal } from 'react';
import AdImage from "../components/homeContent/adImage";
import Feature1 from "../components/homeContent/featureDiv/featureDiv1";
import Feature2 from "../components/homeContent/featureDiv/featureDiv2";
import Recommendations from "../components/homeContent/recommendations/recommendations";
import TopCategories from "../components/homeContent/topCategories/topCategories";
import BecomeInstructor from "../components/homeContent/becomeInstructor";
import TrustedCompanies from "../components/homeContent/trustedCompanies";
import UdemyForBusiness from "../components/homeContent/udemyForBusiness";
import VideoAdDiv from "../components/homeContent/videoAdDiv";
import ListCourses from "./homeContent/ListCourses";
import SearchCourse from "./homeContent/searchCourse";
import CustomPagination from "./homeContent/CustomPagination";
import academyApppContext from '../onlineAcademyAppContext';

import { Row, Col, InputGroup, Button, FormControl } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Select from 'react-select';

function HomeContent() {
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(8);
    const { store, dispatch } = useContext(academyApppContext);
    const [selectedType, setSelectedType] = useState(1);
    

    const displayType = [
        { value: 1, label: 'Default' },
        { value: 2, label: 'Point' },
        { value: 3, label: 'Price' }
    ]

    const getValue = function (e) {
        setSelectedType(e.value);
    }



    var sortList = [].concat(store.courses);
    if (selectedType === 1) {
        sortList = store.courses;
    } else if (selectedType === 2) {
        sortList = sortList.sort((a, b) => a.reviewPoint < b.reviewPoint ? 1 : -1);
    } else if (selectedType === 3) {
        sortList = sortList.sort((a, b) => a.price >= b.price ? 1 : -1);
    }
    const indexOfLastPage = currentPage * postsPerPage;
    const indexOfFirstPage = indexOfLastPage - postsPerPage;
    var currentPosts = sortList.slice(indexOfFirstPage, indexOfLastPage);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);


    return (
        <div>
            <Row>
                <Col>
                    <AdImage />
                </Col>
            </Row>
            <Row>
                <Col>
                    <Feature1 />
                </Col>
            </Row>
            <Row>
                <Col>
                    <Recommendations />
                </Col>
            </Row>
            <Row>
                <Col>
                    <Feature2 />
                </Col>
            </Row>
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
                    <ListCourses currentPosts={currentPosts} />
                    <CustomPagination postsPerPage={postsPerPage} totalPage={store.courses.length} paginate={paginate} currentPage={currentPage} />
                </Col>
            </Row>
            <Row>
                <Col>
                    <TopCategories />
                </Col>
            </Row>
            <Row>
                <Col>
                    <BecomeInstructor />
                </Col>
            </Row>
            <Row>
                <Col>
                    <TrustedCompanies />
                </Col>
            </Row>
            <Row>
                <Col>
                    <UdemyForBusiness />
                </Col>
            </Row>
            {/* <VideoAdDiv /> */}
            <Row>
           
 

      

            </Row>
        </div>
    );
}

export default HomeContent;