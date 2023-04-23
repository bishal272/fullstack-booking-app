import React from "react";

const Image = ({ src, ...rest }) => {
  src = src && src.includes("https://") ? src : "http://localhost:8080/uploads/" + src;
  return <img {...rest} src={src} alt={""} srcSet={src} />;
};

export default Image;
