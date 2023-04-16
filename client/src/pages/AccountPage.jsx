import React, { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { Navigate, Link, useParams } from "react-router-dom";
import axios from "axios";

const AccountPage = () => {
    const { user, ready, setUser } = useContext(UserContext);
    const [redirect, setRedirect] = useState(null);
    let { subpage } = useParams();
    if (subpage === undefined) {
        subpage = "profile";
    }
    if (!ready) {
        return "loading...";
    }
    if (ready && !user && !redirect) {
        return <Navigate to={"/login"} />;
    }

    const linkClasses = (type = null) => {
        let classes = "py-2 px-6";
        if (type === subpage) {
            classes += " bg-primary text-white rounded-full";
        }
        return classes;
    };

    const logout = async () => {
        await axios.post("/logout");
        setRedirect("/");
        setUser(null);
    };

    if (redirect) {
        return <Navigate to={redirect} />;
    }
    return (
        <div>
            <nav className="w-full flex justify-center mt-8 gap-2 mb-8">
                <Link to={"/account"} className={linkClasses("profile")}>
                    My Profile
                </Link>
                <Link
                    to={"/account/bookings"}
                    className={linkClasses("bookings")}
                >
                    MyBookings
                </Link>
                <Link to={"/account/places"} className={linkClasses("places")}>
                    MyAccommodations
                </Link>
            </nav>
            {subpage === "profile" && (
                <div className="text-center max-w-md mx-auto">
                    Logged in as {user.name}({user.email})<br />
                    <button onClick={logout} className="btn max-w-sm mt-4">
                        Log Out
                    </button>
                </div>
            )}
        </div>
    );
};

export default AccountPage;
