import { notification } from "antd";
import axios from "axios";
import {
  fetchMessageList,
  updateLatestUnreadMessage,
} from "../redux/actions/inboxActions";

export const sendMessageApi = async ({
  dispatch,
  messageText,
  userPhone,
  orgToken,
}) => {
  // debugger;
  const postData = {
    type: "text",
    channel: "Whatsapp",
    message: messageText,
    orgToken: orgToken,
    toPhone: userPhone,
  };
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_CARE_CHAT_URL}/message`,
      postData
    );

    if (response.status === 200) {
      dispatch(updateLatestUnreadMessage(response?.data));
      // notification.success({
      //   message: "You have been registered successfully.",
      // });
    } else {
      notification.error({
        message:
          response?.data?.message || "error while fetching message list.",
      });
    }
  } catch (err) {
    notification.error({
      message:
        err?.response?.data?.message ||
        "Something went wrong! Please try again.",
    });
  }
};
