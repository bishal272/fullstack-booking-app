import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddressLink from "../AddressLink";
import BookingWidget from "../BookingWidget";
import PlaceGalary from "../PlaceGalary";

const PlacePage = () => {
  const { id } = useParams();
  const [place, setPlace] = useState(null);

  useEffect(() => {
    if (!id) {
      return;
    } else {
      axios.get(`places/${id}`).then(({ data }) => {
        setPlace(data);
      });
    }
  }, [id]);
  if (!place) return "";

  return (
    <div className="mt-8 bg-gray-100 -mx-8 px-8 pt-8">
      <div className="relative w-10/12 flex mx-auto flex-col">
        <h1 className="text-3xl ">{place.title} </h1>
        <AddressLink>{place.address}</AddressLink>
        <PlaceGalary place={place} />
      </div>
      <div className="mt-8 mb-4 px-32 gap-8 grid grid-cols-1 md:grid-cols-[2fr_1fr]">
        <div>
          <div className="my-4">
            <h2 className="font-semibold text-2xl">Description</h2>
            {place.description}
          </div>
          Check in :{place.checkIn}
          <br />
          Check out:{place.checkOut}
          <br />
          Max Guests:{place.maxGuests}
        </div>
        <div>
          <BookingWidget place={place} />
        </div>
      </div>
      <div className="bg-white -mx-9 px-40 py-8 border-t">
        <div className="">
          <h2 className="font-semibold text-2xl">Extra Info</h2>
        </div>
        <div className="text-sm text-gray-700 leading-5 mb-4 mt-2 ">{place.extraInfo}</div>
      </div>
    </div>
  );
};

export default PlacePage;
