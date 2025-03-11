import { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = async (e) => { 
        e.preventDefault();

        if(name == ""||email==""||password==""){
                alert("กรุณาใส่ข้อมูลให้ครบ")
                return;
            }
        
        try {
            const response = await axios.post('http://localhost:3001/register',{
                name,
                email,
                password
            });
        if (response.data === "U have accouct") {
                alert("mailเคยสมัครไปแล้ว")
                return;
            }
            console.log(response.data);
            alert("สมัครสมาชิกสำเร็จ")
        } catch (error) {
            console.error("Registration error:", error);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100" style={{backgroundColor:'#060143'}} >
            <div className="bg-white p-3 rounded w-25">
                <h2 style={{textAlign : "center"}}>Register </h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name"><strong>Name</strong></label>
                        <input type="text" placeholder="Enter Name" autoComplete="off" name="name"
                            className="form-control rounded-0" onChange={(e) => setName(e.target.value)} />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="email"><strong>Email</strong></label>
                        <input type="email" placeholder="Enter email" autoComplete="off" name="email"
                            className="form-control rounded-0" onChange={(e) => setEmail(e.target.value)} />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password"><strong>Password</strong></label>
                        <input type="password" placeholder="Enter password" autoComplete="off" name="password"
                            className="form-control rounded-0" onChange={(e) => setPassword(e.target.value)} />
                    </div>

                    <button type="submit" className="btn btn-success w-100 rounded-0">Register</button>
                </form>
                <p className="mt-3">Already Have an Account?</p>
                <Link to="/login" className="btn btn-primary w-100 rounded-0">Login</Link>
            </div>
        </div>
    );
}

export default Signup;
