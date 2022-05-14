import React from 'react'
import Login from '../Login/Login';
import './Home.css'
import Navbar from './Navbar';
import { Card } from '@mui/material';
import ActionAreaCard from './Card';

function Home() {

  if (!localStorage.getItem("userGST")) return <Login />;

  return (
    <div>
  <Navbar/>

 
  <div className="rela-block deer-section" >

  {/* <br/><br/><br/><br/> */}
    {/* <ActionAreaCard/> */}
    
  </div>
  
</div>
  )
}

export default Home