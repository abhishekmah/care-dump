import React from "react";
import noChatSelected from "./Images/noChatSelected.svg";

const DefaultScreen = () => {
  return (
    <>
      <div
        className="height_full"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img src={noChatSelected} alt="defaultScreenImage" />
        <p
          style={{
            margin: "20px 0px",
            fontWeight: 500,
            color: "#8D8D8D",
            fontSize: "18px",
          }}
        >
          Select a conversation to get started!
        </p>
      </div>
    </>
  );
};

export default DefaultScreen;
