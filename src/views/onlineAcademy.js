import React, { useReducer, useEffect, useState } from 'react';
import Header from "../components/Header";
import HomeContent from "../components/HomeContent";
import HomeFooter from "../components/HomeFooter";
import UploadCourse from "../components/UploadCourse";
import reducer from '../onlineAcademyReducer';
import ApppContext from '../onlineAcademyAppContext';
import { axiosInstance } from '../utils';
import Resultcategories from './resultCategories';
import Profile from './profile';
import HotCourses from './hotcourses';

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
        // async function loadDataUser() {
        //     const res = await axiosInstance.get('/users/' + localStorage.account_userID, { headers: { 'x-access-token': localStorage.account_accessToken } });
        //     if (res.status === 200) {
        //         res.data.watchlistJS = res.data.watchlist ? JSON.parse(res.data.watchlist).course : [];
        //         dispatch({
        //             type: 'setAccount',
        //             payload: {
        //                 account: res.data,
        //                 query: '',
        //             }
        //         });
        //     }
        // }
        // async function loadDataPayment() {
        //     const res = await axiosInstance.get('/transaction/user/' + localStorage.account_userID, { headers: { 'x-access-token': localStorage.account_accessToken } });
        //     if (res.status === 200) {
        //         dispatch({
        //             type: 'setPayment',
        //             payload: {
        //                 payment: res.data,
        //                 query: '',
        //             }
        //         });
        //     }
        // }
        initCoursesList();
        getCategory();
        getTeacher();
        getFeedback();
        // if(localStorage.account_accessToken){
        //     loadDataPayment();
        // }
    }, []);
<<<<<<< HEAD
   
=======


>>>>>>> dd88218ef461e056ce1317c2d26e9eb59f7b0e2a
    return (
        <div>
            <ApppContext.Provider value={{ store, dispatch }}>
                <Header />
                {/* <HeaderPopup />
                <HeaderPrimary /> */}
                {/* <HotCourses /> */}
                {/* {(() => {
                    if (store.mode === 'default') {
                            return <HotCourses />
                    }
                })()} */}
                {(() => {
<<<<<<< HEAD
                    if (store.mode === 'default') {
                            return [<HotCourses />,
                                <HomeContent />];
                    } else if (store.mode === 'search') {
                        return <Resultcategories />
                    } else if (store.mode === 'profile') {
                        return <Profile />
=======
                    switch (store.mode) {
                        case 'default':
                            return <HomeContent />
                        case 'search':
                            return <Resultcategories />
                        case 'profile':
                            return <Profile />
                        case 'upload':
                            return <UploadCourse />
>>>>>>> dd88218ef461e056ce1317c2d26e9eb59f7b0e2a
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