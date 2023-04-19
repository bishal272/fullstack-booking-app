import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const MainPage = () => {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios.get("/places").then(({ data }) => {
      setPlaces(data);
    });
  }, []);
  return (
    <div className="mt-8 mx-16 grid gap-x-9 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {places.length > 0 &&
        places.map((place) => (
          <Link to={"/place/" + place._id}>
            {place.photos?.[0] && (
              <div className="bg-gray-500 mb-2 rounded-2xl flex ">
                <img
                  className="rounded-2xl object-cover aspect-square "
                  src={"http://localhost:8080/uploads/" + place.photos?.[0]}
                  alt=""
                  srcset=""
                />
              </div>
            )}
            <h3 className="font-bold">{place.address}</h3>
            <h2 className="text-sm truncate text-gray-500">{place.title}</h2>
            <div className="mt-1">
              <span className="font-bold">${place.price}</span> per night
            </div>
          </Link>
        ))}
    </div>
  );
};
export default MainPage;
