import React , { Component } from 'react'
import Login from '../Login/Login';
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
  <Navbar/>
  <div className="rela-block deer-section" />
</div>

    )
  }
}
