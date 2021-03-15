import React, { useEffect, useReducer } from 'react'
import Header from "../components/Header";
import HomeContent from "../components/HomeContent";
import HomeFooter from "../components/HomeFooter";
import Accountinfo from './accountInfo';
function onlineAcademy() {
    return (
        <div>
            <Header />
            <Accountinfo />
            {/* <HeaderPopup />
            <HeaderPrimary /> */}
            <HomeContent />
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

export default onlineAcademy;