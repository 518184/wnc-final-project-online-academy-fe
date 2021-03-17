import React, { useState, useEffect, useContext } from 'react';
import Header from "../components/Header";
import HomeContent from "../components/HomeContent";
import HomeFooter from "../components/HomeFooter";
import reducer from '../onlineAcademyReducer';
import academyApppContext from '../onlineAcademyAppContext';
import { axiosInstance } from '../utils';
import Result from './resultCategories';

export default function Categories() {

    // const initialAppState = {
    //     courses: [],
    //     query: '',
    //     categories: [],
    // };

    // const [store, dispatch] = useReducer(reducer, initialAppState);
    // useEffect(function () {
        
    // }, []);

    const {courses, setCourses} = useState([]);

    useEffect(function () {
        async function initCoursesList() {
            const res = await axiosInstance.get("/courses");
            if (res.status === 200) {
                setCourses(res.data);
            }
        }
        initCoursesList();
    }, []);

    console.log(courses);
    return (
        <div>
            <Header />
            {/* <HeaderPopup />
            <HeaderPrimary /> */}
            <Result />
            {/*    
            <AdImage />
            <Feature1 />
            <Recommendations />
            <Feature2 />
            <FillerDiv />
            <TopCategories />
            <BecomeInstructor />
            <TrustedCompanies />
            <UdemyForBusiness />
            <VideoAdDiv /> */}
            <HomeFooter />
            {/* <Footer /> */}
        </div>
    );
}

// export default OnlineAcademy;