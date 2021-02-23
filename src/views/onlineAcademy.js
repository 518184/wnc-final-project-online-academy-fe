import React, { useEffect, useReducer } from 'react'
import AppContext from '../onlineAcademyAppContext';
import { axiosInstance } from '../utils';
import Header from "../components/Header";
import HomeContent from "../components/HomeContent";
import HomeFooter from "../components/HomeFooter";

function onlineAcademy() {
    return (
        <div className="container">
            <Header />
            {/* <HeaderPopup />
            <HeaderPrimary /> */}
            <HomeContent />
            {/* <AdImage />
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

export default onlineAcademy;