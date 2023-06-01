import React from "react";
import image from "./enjoy.jpg";

const WelocomePage = () => {
  return (
    <div>
      <h3 className="animated-text">Enjoy Your Youtube Search!!!</h3>
      <img
        src={image}
        alt="Example Pic"
        style={{ width: "500px", height: "300px", margin: "5px" }}
        className="image-container"
      />
    </div>
  );
};

export default WelocomePage;
