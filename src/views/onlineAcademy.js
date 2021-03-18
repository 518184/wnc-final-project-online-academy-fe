import React, { useReducer, useEffect, useState } from 'react';
import Header from "../components/Header";
import HomeContent from "../components/HomeContent";
import HomeFooter from "../components/HomeFooter";
import reducer from '../onlineAcademyReducer';
import ApppContext from '../onlineAcademyAppContext';
import { axiosInstance } from '../utils';
import Resultcategories from './resultCategories';

export default function OnlineAcademy() {
    const initialAppState = {
        courses: [],
        query: '',
        categories: [],
        mode: '',
    };

    const [store, dispatch] = useReducer(reducer, initialAppState);

    useEffect(function () {
        async function initCoursesList() {
            const res = await axiosInstance.get("/courses");
            if (res.status === 200) {
                dispatch({
                    type: 'initCoursesList',
                    payload: {
                        courses: res.data,
                        query: '',
                        mode: 'default',
                    }
                });
            }
        }
        async function getCategory() {
            const res = await axiosInstance.get('/categories');
            if (res.status === 200) {
                dispatch({
                    type: 'getCategory',
                    payload: {
                        categories: res.data,
                        query: ''
                    }
                });
            }
        }
        async function getTeacher() {
            const res = await axiosInstance.get('/users/allteacher');
            if (res.status === 200) {
                dispatch({
                    type: 'getTeacher',
                    payload: {
                        teacher: res.data,
                    }
                });
            }
        }
        async function getFeedback() {
            const res = await axiosInstance.get('/feedbacks');
            
            if (res.status === 200) {
                dispatch({
                    type: 'getFeedback',
                    payload: {
                        feedback: res.data,
                    }
                });
            }
        }
        initCoursesList();
        getCategory();
        getTeacher();
        getFeedback();
    }, []);
   

    return (
        <div>
            <ApppContext.Provider value={{ store, dispatch }}>
                <Header />
                {/* <HeaderPopup />
                <HeaderPrimary /> */}
                {(() => {
                    if (store.mode === 'default') {
                        return <HomeContent />
                    } else if (store.mode === 'search') {
                        return <Resultcategories />
                    }
                })()}
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
            </ApppContext.Provider>
        </div>
    );
}

// export default OnlineAcademy;