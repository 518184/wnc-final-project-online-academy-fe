import React from "react";
import "../../components/header/headerPrimary.css";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import PublishIcon from '@material-ui/icons/Publish';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonIcon from '@material-ui/icons/Person';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
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
          <Link to="/profile" style={{ textDecoration: 'none' }}><div className="login button"><PersonIcon className="icon" /><p>{localStorage.account_email}</p></div></Link>
          <Link to="/" style={{ textDecoration: 'none' }}><div className="signup button" onClick={logout}><ExitToAppIcon className="icon" /><p>Sign Out</p></div></Link>
        </React.Fragment>);
    }
    return (
      <React.Fragment><Link to="/login" style={{ textDecoration: 'none' }}><div className="login button"><PersonIcon className="icon" /><p>Log In</p></div></Link>
        <Link to="/signup" style={{ textDecoration: 'none' }}><div className="signup button"><PersonAddIcon className="icon" /><p>Sign Up</p></div></Link>
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
