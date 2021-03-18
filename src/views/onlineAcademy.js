import React, { useReducer, useEffect, useState } from 'react';
import Header from "../components/Header";
import HomeContent from "../components/HomeContent";
import HomeFooter from "../components/HomeFooter";
import reducer from '../onlineAcademyReducer';
import ApppContext from '../onlineAcademyAppContext';
import { axiosInstance } from '../utils';
<<<<<<< HEAD
import { SortRounded } from '@material-ui/icons';
=======
>>>>>>> 0dad4ba60cd3b284e7f8296fb5c9c37cc416f5d1
import Resultcategories from './resultCategories';

export default function OnlineAcademy() {
    const initialAppState = {
        courses: [],
        query: '',
        categories: [],
<<<<<<< HEAD
        mode: ''
=======
        mode: '',
>>>>>>> 0dad4ba60cd3b284e7f8296fb5c9c37cc416f5d1
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
<<<<<<< HEAD
                        mode: 'default'
=======
                        mode: 'default',
>>>>>>> 0dad4ba60cd3b284e7f8296fb5c9c37cc416f5d1
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
        initCoursesList();
        getCategory();
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