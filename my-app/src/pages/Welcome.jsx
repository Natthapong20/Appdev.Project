import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import picture from "./picture/yamal.png"


function  Welcome(){
    

    return(
    <div>
    
    <div style = {{ //กล่องบน
            width: "100%",
            height: "20%",
            backgroundColor: "#060143",
            position: "absolute",
            left:"0px",
            top:"0",
            
            
        }}></div>
    
        <h1 style={{
        
        color:"white",
        position:"relative",
        top:"20%",
        textAlign:"center"
        }}>Welcome</h1>
       
       
       <div style={{ textAlign: "center", marginTop: "200px",}}>
        <img
          src={picture}
          alt="Yamal"
          style={{
            float:"right",
            width: "25%",
            height: "auto",
          }}
        />
      </div>
      <Link to="/register" className="btn btn-danger w-auto rounded-auto">START</Link>
    
        <div style = {{ //กล่องล่าง
            width: "100%",
            height: "20%",
            backgroundColor: "#062342",
            position: "absolute",
            left:"0px",
            bottom:"0",
            
        }}></div>
    
   
    
    </div>

);
}export default Welcome;