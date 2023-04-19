import axios from "axios";
import React, { useEffect, useState } from "react";
import AccountNav from "../AccountNav";

const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    axios.get("/bookings").then((response) => {
      setBookings(response.data);
    });
  }, []);
  return (
    <div>
      <AccountNav />
      <div className="">
        {bookings?.length > 0 &&
          bookings.map((booking) => (
            <div>
              {booking.checkIn} to {booking.checkOut}
            </div>
          ))}
      </div>
    </div>
  );
};

export default BookingsPage;
