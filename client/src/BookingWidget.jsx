import React from "react";

const BookingWidget = ({ place }) => {
  return (
    <div className="bg-white shadow  p-4 rounded-2xl">
      <div className="text-2xl text-center">Price: ${place.price} / night</div>
      <div className="border rounded-2xl mt-4">
        <div className="flex">
          <div className=" py-4 px-4">
            <label>Check In:</label>
            <input type="date" name="" id="" />
          </div>
          <div className="py-4 px-4 border-l">
            <label>Check out:</label>
            <input type="date" name="" id="" />
          </div>
        </div>
        <div className=" py-4 px-4 border-t">
          <label>Number of Guests:</label>
          <input type="number" name="" id="" />
        </div>
      </div>

      <button className="btn mt-4">Book this place</button>
    </div>
  );
};

export default BookingWidget;
