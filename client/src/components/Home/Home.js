import React , { Component } from 'react'
import Login from '../Login/Login';
import './Home1'
import './Home.css'
import Navbar from './Navbar';
export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
      }

  render() {
    if (!localStorage.getItem("userGST")) return <Login />;

    return (
<div>
  <link rel="stylesheet" type="text/css" href="p.css" />
  <div className="fixed-nav-bar">
    <div className="logo"><span>Welcome</span> User </div>
    <input type="checkbox" id="menuButton" />
    <label htmlFor="menuButton" className="menu-button-label">
      <div className="white-bar" />
      <div className="white-bar" />
      <div className="white-bar" />
      <div className="white-bar" />

    </label>
  </div>
  <Navbar/>
  <div className="rela-block deer-section" />
</div>

    )
  }
}
