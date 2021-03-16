import React, { useReducer, useEffect, useState } from 'react';
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
import Listcategories from "./homeContent/ListCategories";
import CustomPagination from "./homeContent/CustomPagination";

import reducer from '../onlineAcademyReducer';
import ApppContext from '../onlineAcademyAppContext';
import { axiosInstance } from '../utils';
import { Row, Col, InputGroup, Button, FormControl } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

function HomeContent() {

    const initialAppState = {
        courses: [],
        query: ''
    };

    const [store, dispatch] = useReducer(reducer, initialAppState);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(8);

    useEffect(function() {
        async function initCoursesList() {
          const res = await axiosInstance.get("/courses");
          if(res.status === 200) {
            dispatch({
                type: 'initCoursesList',
                payload: {
                    courses: res.data,
                    query: ''
                }
              });
          } 
        }
        initCoursesList();
    }, []);

    const indexOfLastPage = currentPage *  postsPerPage;
    const indexOfFirstPage = indexOfLastPage - postsPerPage;
    var currentPosts = store.courses.slice(indexOfFirstPage, indexOfLastPage);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div>
            <ApppContext.Provider value={{ store, dispatch }}>
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
                    <Col xs={8}></Col>
                    <Col>
                        <SearchCourse initQuery="" />
                    </Col>
                    <Col xs={1}></Col>
                </Row>
                <Row>
                    <Col>
                        <ListCourses currentPosts={currentPosts} />
                        <CustomPagination postsPerPage={postsPerPage} totalPage={store.courses.length} paginate={paginate} currentPage={currentPage}/>
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
            </ApppContext.Provider>
        </div>
    );
}

export default HomeContent;