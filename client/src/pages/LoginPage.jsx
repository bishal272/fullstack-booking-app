import React from "react";
import { Link } from "react-router-dom";

const LoginPage = () => {
    return (
        <div className="mt-4 flex justify-around items-center grow">
        <div className="mb-64">

            <h1 className="text-4xl text-center mb-4">Login</h1>
            <form className="max-w-md mx-auto">
                <input type="email" name="" placeholder="Email address" />
                <input type="password" name="" placeholder="Password" />
                <button className="login-btn">Login</button>
                <div className="text-center py-2 text-gray-500">
                    Don't have an account yet? <Link className="text-black underline" to={'/register'} > Register Now</Link>
                </div>
            </form>
        </div>
        </div>
    );
};

export default LoginPage;
