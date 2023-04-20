import axios from "axios";
import { differenceInCalendarDays } from "date-fns";
import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";

const BookingWidget = ({ place }) => {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [redirect, setRedirect] = useState("");
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  let numberOfNights = 0;
  if (checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
  }
  const bookThisPlace = async () => {
    const data = {
      checkIn,
      checkOut,
      name,
      numberOfGuests,
      phone,
      place: place._id,
      price: numberOfNights * place.price,
    };
    const response = await axios.post("/bookings", data);
    const bookingId = response.data._id;
    setRedirect(`/account/bookings/${bookingId}`);
  };
  if (redirect) {
    return <Navigate to={redirect} />;
  }
  return (
    <div className="bg-white shadow-xl  p-4 rounded-2xl">
      <div className="text-2xl text-center">Price: ${place.price} / night</div>
      <div className="border rounded-2xl mt-4">
        <div className="flex">
          <div className=" py-4 px-4">
            <label>Check In:</label>
            <input
              type="date"
              name=""
              id=""
              value={checkIn}
              onChange={(ev) => setCheckIn(ev.target.value)}
            />
          </div>
          <div className="py-4 px-4 border-l">
            <label>Check out:</label>
            <input
              type="date"
              name=""
              id=""
              value={checkOut}
              onChange={(ev) => setCheckOut(ev.target.value)}
            />
          </div>
        </div>
        <div className=" py-4 px-4 border-t">
          <label>Number of Guests:</label>
          <input
            type="number"
            name=""
            id=""
            value={numberOfGuests}
            onChange={(ev) => setNumberOfGuests(ev.target.value)}
          />
        </div>
        {numberOfNights > 0 && (
          <div className=" py-4 px-4 border-t">
            <label>Your full name: </label>
            <input
              type="text"
              name=""
              id=""
              value={name}
              onChange={(ev) => setName(ev.target.value)}
            />
            <label>Phone number: </label>
            <input
              type="tel"
              name=""
              id=""
              value={phone}
              onChange={(ev) => setPhone(ev.target.value)}
            />
          </div>
        )}
      </div>

      <button onClick={bookThisPlace} className="btn mt-4">
        Book this place
        {numberOfNights > 0 && <span> ${numberOfNights * place.price}</span>}
      </button>
    </div>
  );
};

export default BookingWidget;
