import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { configureXmpp, connect, xmpp } from "./xmpp/xmpp";
import { useDispatch } from "react-redux";

export default function PrivateRoute(props) {
  let userData = JSON.parse(localStorage.getItem("user_details"));
  const dispatch = useDispatch();
  const { Component } = props;
  const navigate = useNavigate();
  useEffect(() => {
    let token = localStorage.getItem("jwt_token");
    !window.globalXmpp &&
      configureXmpp(userData.xmppUserName, userData.xmppPassword, dispatch);
    // console.log("xmpp_STATUS", xmpp.status);

    if (!token) {
      return navigate("/sign-in");
    } else if (!!token) {
      // if (xmpp.status === "offline") {
      //   // xmpp.stop().catch(console.error);
      //   // connect(dispatch);
      //   console.log("OFFLINE");
      // }
    }
  }, []);

  return (
    <>
      <Component />
    </>
  );
}
