import React, { useState } from 'react'
import { Button, TextField } from "@mui/material";
import Axios from 'axios'


const Login=()=>{
    const [gstNo, set_gstNo] = useState("");
    const [password, set_password] = useState("");
    
    const PORT = 4000  
    const url=`http://localhost:${PORT}`


    const handleLogin=async()=>{
      console.log(`${url}/user/login`)
      console.log(gstNo, password)
        await Axios.post(`${url}/user/login`,{
          gstNo:gstNo,
          password:password
        }).then((response)=>{
          console.log(response);
            if(response.data==="Login"){
              localStorage.setItem('userGST',gstNo)
              localStorage.setItem('userPassword',password)
              window.location.reload();
            }else{
              alert("Invalid Credentials")
            }
        })

    }
  return (
    <div className="PersonalInfo">
    <TextField
      className="inputField"
      label="Enter GST Number"
      type="text"
      variant="standard"
      required
      value={gstNo}
      onChange={(e) => {
        set_gstNo(e.target.value);
      }}
    />
    <TextField
      className="inputField"
      label="Enter Password"
      variant="standard"
      type="password"
      required
      value={password}
      onChange={(e) => {
        set_password(e.target.value);
      }}
    />

    
    

    <br />
    <Button variant="outlined" color="success" onClick={handleLogin}>
      Sign In
    </Button>
  </div>
  )
}

export default Login;