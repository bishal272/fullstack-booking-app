import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddressLink from "../components/AddressLink";
import BookingDates from "../components/BookingDates";
import PlaceGalary from "../components/PlaceGalary";

const BookingPage = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  useEffect(() => {
    axios.get("/bookings").then((response) => {
      const foundBooking = response.data.find(({ _id }) => _id === id);
      setBooking(foundBooking);
    });
  }, [id]);
  if (!booking) {
    return "";
  }
  return (
    <div className="my-8">
      <h1 className="text-3xl ">{booking.place.title} </h1>
      <AddressLink className="my-2"> {booking.place.address}</AddressLink>
      <div className="bg-gray-200 p-6 my-6 rounded-2xl flex items-center justify-between">
        <div className="">
          {" "}
          <h2 className="text-2xl mb-4">Your booking information</h2>
          <BookingDates booking={booking} />
        </div>
        <div className="bg-primary p-6 text-white rounded-2xl">
          <div>Total Price </div>
          <div className="text-3xl">${booking.price}</div>
        </div>
      </div>
      <div className="relative">
        <PlaceGalary place={booking.place} />
      </div>
    </div>
  );
};

export default BookingPage;
