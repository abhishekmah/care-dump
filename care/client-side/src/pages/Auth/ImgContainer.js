import React from "react";
import loginImg from "../Auth/Images/loginImg.png";

const ImgContainer = () => {
  return (
    <div className="img_div" style={{ margin: "auto" }}>
      <h1>Welcome to Care</h1>
      <img src={loginImg} alt="" width="349px" height="353px" />
      <p className="p_img">
        All in one customer support tool for your day to day operations
      </p>
    </div>
  );
};

export default ImgContainer;
