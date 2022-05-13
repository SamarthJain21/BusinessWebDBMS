import React from 'react'
import { Link } from 'react-router-dom'
import './Home1'


function Navbar() {
  return (
    <div className="the-bass">
      <div className="rela-block drop-down-container">
        <Link to="/user/items">
          <div className="drop-down-item">
            <ul>
              <li> Inventory</li>
            </ul>
          </div>
        </Link>
      </div>
      <div className="rela-block drop-down-container">
        <Link to="/trader/getTraders">
          <div className="drop-down-item">
            <ul>
              <li> Traders</li>

            </ul>
          </div>
        </Link>
      </div>
      <div className="rela-block drop-down-container">
        <div className="drop-down-item">
          <ul><li><a href="#">Orders</a></li></ul>
        </div>
      </div>
      <div className="rela-block drop-down-container">
        <div className="drop-down-item" onClick={()=>{
            localStorage.clear();
            window.location.reload()
          }}>
          <ul><li><a href="#" >Logout</a> </li></ul>
        </div>
      </div>
      {/* <div className="rela-block drop-down-container">
      <div className="drop-down-item">
        <ul><li><a href="#">Inventory Table</a></li></ul>
      </div>
    </div> */}
    </div>
  )
}


export default Navbar