import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Image from "../components/Image";

const MainPage = () => {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios.get("/places").then(({ data }) => {
      setPlaces(data);
    });
  }, []);
  return (
    <div className="mt-8 mx-16 grid gap-x-9 gap-y-8 grid-cols-2  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {places.length > 0 &&
        places.map((place, index) => (
          <Link key={index} to={"/place/" + place._id} className="">
            {place.photos?.[0] && (
              <div className="mb-2 rounded-2xl flex ">
                <Image
                  className="rounded-2xl object-cover aspect-square "
                  src={place.photos?.[0]}
                  alt=""
                />
              </div>
            )}
            <h3 className="font-bold">{place.address}</h3>
            <h2 className="text-sm truncate text-gray-500 mt-1">{place.title}</h2>
            <div className="mt-1">
              <span className="font-bold">${place.price}</span> per night
            </div>
          </Link>
        ))}
    </div>
  );
};
export default MainPage;
