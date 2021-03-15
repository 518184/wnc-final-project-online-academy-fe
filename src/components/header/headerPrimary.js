import React from "react";
import "../../components/header/headerPrimary.css";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import PublishIcon from '@material-ui/icons/Publish';
import { Link } from "react-router-dom";
import { useHistory } from 'react-router-dom';

function HeaderPrimary() {
  const history = useHistory();
  const logout = function () {
    localStorage.clear();
    history.push('/home');
  }

  function LoggedIn() {
    if (localStorage.account_email) {
      return (
        <React.Fragment>
          <Link to="/profile" style={{ textDecoration: 'none' }}><div className="login button">{localStorage.account_email}</div></Link>
          <Link to="/" style={{ textDecoration: 'none' }}><div className="signup button" onClick={logout}>Sign Out</div></Link>
        </React.Fragment>);
    }
    return (
      <React.Fragment><Link to="/login" style={{ textDecoration: 'none' }}><div className="login button">Log In</div></Link>
        <Link to="/signup" style={{ textDecoration: 'none' }}><div className="signup button">Sign Up</div></Link>
      </React.Fragment>);
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
        <div className="uploadDiv">
        <PublishIcon className="icon" />
        </div>
        <div className="cartDiv">
          <ShoppingCartOutlinedIcon className="icon" />
        </div>
        <LoggedIn />
      </div>
    </div>
  );
}
export default HeaderPrimary;
