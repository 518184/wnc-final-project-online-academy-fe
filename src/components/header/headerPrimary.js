import React from "react";
import "../../components/header/headerPrimary.css";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import { Link } from "react-router-dom";

function HeaderPrimary() {
  const btnLoginIn_Clicked = function() {

  }

  return (
    <div className="headerPrimary">
      <div className="left part">
        <div className="udemyLogo">
          <img src="..//logo.jpg" className="logo" alt="logo"></img>
        </div>
        <div className="categoriesDiv">
          <span className="categories">Categories</span>
        </div>
      </div>
      <div className="mid part">
        <div className="searchIcon">
          <SearchOutlinedIcon className="icon" />
        </div>
        <input className="searchBar" placeholder="Search for anything"></input>
      </div>
      <div className="right part">
        <div className="businessDiv">
          <span className="business">Udemy for Business</span>
        </div>
        <div className="teachDiv">
          <span className="teach">Teach on Udemy</span>
        </div>
        <div className="cartDiv">
          <ShoppingCartOutlinedIcon className="icon" />
        </div>
        <button className="login button"><Link to="/login">Log In</Link></button>
        <div className="signup button"><Link to="/signup">Sign up</Link></div>
      </div>
    </div>
  );
}

export default HeaderPrimary;
