import React from "react";

const PlaceImg = ({ place, index = 0, className = null }) => {
  if (!place.photos.length) {
    return "";
  }
  if (!className) {
    className = "object-cover aspect-square";
  }
  return (
    <img
      className={className}
      src={"http://localhost:8080/uploads/" + place.photos[index]}
      alt=""
    />
  );
};

export default PlaceImg;
