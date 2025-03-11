import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3001/login", 
            {
                email,
                password
            });
            console.log(response.data); //ถ้าข้อมูลตรงกับในดาต้าเบสจะได้ตรงนี้
            if (response.data === "Success") {
                alert("กำลังเข้าสู่ระบบ")
                navigate("/Myclub"); 
            }
            else if(response.data === "the password is incorrect"){
                alert("รหัสผิดพลาดนะจะ")
            }
            else if(response.data === "No record existed"){
                alert("กรุณาสมัคใช้บริการก่อน")
            }
        } catch (error) {
            console.error("Login error:", error);
        } 
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100" style={{backgroundColor:'#060143'}}>
            <div className="bg-white p-3 rounded w-25">
                <h2 style={{textAlign:"center"}}>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email"><strong>Email</strong></label>
                        <input
                            type="email"
                            placeholder="Enter email"
                            autoComplete="off"
                            name="email"
                            className="form-control rounded-0"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password"><strong>Password</strong></label>
                        <input
                            type="password"
                            placeholder="Enter password"
                            autoComplete="off"
                            name="password"
                            className="form-control rounded-0"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button type="submit" className="btn btn-success w-100 rounded-0">
                        Login
                    </button>
                </form>

                <p className="mt-3">Don't Have an Account?</p>
                <Link to="/register" className="btn btn-primary w-100 rounded-0">
                    Register
                </Link>
            </div>
        </div>
    );
}

export default Login;
