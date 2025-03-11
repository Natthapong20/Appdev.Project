import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    

    return (
        <div className="d-flex justify-content-center align-items-center vh-100" style={{backgroundColor:'#060143'}}>
            
       
  <Link to="/marketplace" className="btn btn-primary w-100 rounded-0">
                      market
                  </Link>
        
        </div>
    );
}

export default Login;
