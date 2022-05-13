import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import './Login.css'
import './Login1.js'

const Login=()=>{
    const [gstNo, set_gstNo] = useState("");
    const [password, set_password] = useState("");
    
    const PORT = 4000  
    const url=`http://localhost:${PORT}`


    const handleLogin=async(e)=>{
      e.preventDefault()
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
      <div>
        <link rel="stylesheet" type="text/css" href="log in.css" />
        <div className="login-page">
          {/* Login */}
          <div className="info">
            <form>
              <div>
                <input type="text" name="username" value={gstNo} placeholder="Username" onChange={(text)=>{
                  set_gstNo(text.target.value);
                }} />
              </div>
              <div>
                <input type="password" name="password" value={password} placeholder="Password" onChange={(text)=>{
                  set_password(text.target.value);
                }}  />
              </div>
              <div>
                <input type="submit" defaultValue="Submit" onClick={handleLogin} />
              </div>
            </form>
          </div>
          <div className="arrow right">
            &gt;
          </div>
        </div>

        <div className="register-page">
          {/* Registration */}
          <div className="info">
            <form>
              <div>
                <input type="text" name="Username" placeholder="Username" />
              </div>
              <div>
                <input type="tel" id="phone" name="Contact number" pattern="[+]{1}[0-9]{11,14}" placeholder="Contact Number" />
              </div>
              <div>
                <input type="email" name="E-mail id" placeholder="Email" />
              </div>
              <div>
                <input type="text" name="GST number" placeholder="Enter GST number" />
              </div>
              <div>
                <input type="password" name="Password" placeholder="Password" />
              </div>
              <div>
                <input type="submit" defaultValue="Submit" />
              </div>
            </form>
          </div>
          <div className="arrow left">
            &lt;
          </div>
        </div>

        {/* Home */}
        <div className="home">
          <div className="intro">
            Welcome to Trade Management
          </div>
          <div className="button">
            <div id="login" className="btn">
              Login
            </div>
            <div id="register" className="btn">
              Register
            </div>
          </div>
        </div>
      </div>
    );

}

export default Login;