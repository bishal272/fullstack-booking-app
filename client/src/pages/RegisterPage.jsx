import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
const RegisterPage = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password,setPassword] = useState("");

    const registerUser = (e)=>{
        e.preventDefault();
        axios.post('/register' , {
            name, email, password
        });
    }

    return (
        <div className="mt-4 flex justify-around items-center grow">
            <div className="mb-64">
                <h1 className="text-4xl text-center mb-4">Register</h1>
                <form className="max-w-md mx-auto" onSubmit={registerUser}>
                    <input type="text" placeholder="John Doe" value={name} onChange={e=>setName(e.target.value)}/>

                    <input type="email" placeholder="Email address" value={email} onChange={e=>setEmail(e.target.value)}/>
                    <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)}/>
                    <button className="login-btn">Register</button>
                    <div className="text-center py-2 text-gray-500">
                        Already a Member?{" "}
                        <Link className="text-black underline" to={"/login"}>
                            {" "}
                            Login Now
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;
