import { notification } from "antd";
import axios from "axios";
import { configureXmpp, connect, xmpp } from "../xmpp/xmpp";

export const register = async ({ data, isError, setIsError, navigate }) => {
  const postData = { ...data };
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_CARE_WIGZO_URL}/register`,
      postData
    );

    if (response?.status === 201) {
      setIsError({ ...isError, status: false });
      notification.success({ message: response?.data?.message });

      navigate("/sign-in");
    }
    // else {
    //   setIsError(true);
    //   notification.error({
    //     message: response?.data?.message || "error",
    //   });
    // }
  } catch (err) {
    setIsError({
      status: true,
      error_message:
        err?.response?.data || "Something went wrong! Please try again.",
    });
    // notification.error({
    //   message: err?.response?.data || "Something went wrong! Please try again.",
    // });
  }
};
export const signIn = async ({
  data,
  isError,
  setIsError,
  navigate,
  dispatch,
}) => {
  const postData = { ...data };
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_CARE_WIGZO_URL}/user-login`,
      postData
    );

    if (response?.status === 200) {
      setIsError({ ...isError, status: false });
      JSON.stringify(response?.data?.data);

      notification.success({ message: "Login Successful" });

      const data = {
        name: response?.data?.data?.name,
        email: response?.data?.data?.email,
        orgToken: response?.data?.data?.orgTokens[0],
        xmppUserName: response?.data?.data?.xmppUserName,
        xmppPassword: response?.data?.data?.xmppPassword,
      };

      localStorage.setItem("jwt_token", response?.data?.data?.jwt);
      localStorage.setItem("user_details", JSON.stringify(data));

      !window.globalXmpp &&
        configureXmpp(data.xmppUserName, data.xmppPassword, dispatch);

      navigate("/inbox");
    }
    // else {
    //   setIsError(true);
    //   notification.error({
    //     message: response?.data?.message || "error",
    //   });
    // }
  } catch (err) {
    setIsError({
      status: true,
      error_message:
        err?.response?.data || "Something went wrong! Please try again.",
    });
    // notification.error({
    //   message: err?.response?.data || "Something went wrong! Please try again.",
    // });
  }
};
export const resetPasswordLink = async ({
  data,
  setIsSuccess,
  isError,
  setIsError,
}) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_CARE_WIGZO_URL}/forget-password?email=${data?.email}`
    );

    if (response?.status === 200) {
      setIsSuccess(true);
      setIsError({ ...isError, status: false });
      // notification.success({
      //   message: "Link sent successfully.",
      // });
    }
    // else {
    //   setIsSuccess(false);
    //   notification.error({
    //     message: response?.data?.message || "error",
    //   });
    // }
  } catch (err) {
    setIsSuccess(false);
    setIsError({
      status: true,
      error_message:
        err?.response?.data || "Something went wrong! Please try again.",
    });
    // notification.error({
    //   message: err?.response?.data || "Something went wrong! Please try again.",
    // });
  }
};

export const resetPasswordCare = async (data, navigate) => {
  const postData = {
    ...data,
  };
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_CARE_WIGZO_URL}/reset-password`,
      postData
    );

    if (response?.status === 200) {
      // notification.success({
      //   message: "Password updated successfully.",
      // });

      navigate("/sign-in");
    }
    // else {
    //   notification.error({
    //     message: response?.data?.message || "error",
    //   });
    // }
  } catch (err) {
    notification.error({
      message: err?.response?.data || "Something went wrong! Please try again.",
    });
  }
};
