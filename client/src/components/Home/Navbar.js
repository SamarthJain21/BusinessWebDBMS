import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div className="the-bass">
    <div className="rela-block drop-down-container">
      <div className="drop-down-item">
        <ul>
          <li><a href="#">Edit your Info</a></li>
        </ul>
      </div>   
    </div>
    <div className="rela-block drop-down-container">
      <div className="drop-down-item">
        <ul>
        <li><Link to="/user/items"> Items</Link></li>

          {/* <li><a href="#">Items</a></li> */}
        </ul>
      </div>
    </div>
    <div className="rela-block drop-down-container">
      <div className="drop-down-item">
        <ul><li><a href="#">Traders</a></li></ul>
      </div>
    </div>
    <div className="rela-block drop-down-container">
      <div className="drop-down-item">
        <ul><li><a href="#">Add Oders</a></li></ul>
      </div>
    </div>
    <div className="rela-block drop-down-container">
      <div className="drop-down-item">
        <ul><li><a href="#">Inventory Table</a></li></ul>
      </div>
    </div>
  </div>
  )
}

export default Navbar