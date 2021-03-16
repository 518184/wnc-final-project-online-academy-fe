import React from "react";
import "../../components/header/headerPrimary.css";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import PublishIcon from '@material-ui/icons/Publish';
import LoggedIn from "../LoggedIn"

function HeaderPrimary() {

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
        <div className="uploadDiv button">
          <PublishIcon className="icon" />
          <p>Upload course</p>
        </div>
        <div className="cartDiv button">
          <ShoppingCartOutlinedIcon className="icon" />
          <p>Cart</p>
        </div>
        <LoggedIn />
      </div>
    </div>
  );
}
export default HeaderPrimary;
