import { notification } from "antd";
import axios from "axios";
import {
  WHATSAPP_MESSAGE_LIST_REQUESTED,
  WHATSAPP_MESSAGE_LIST_SUCCESS,
  WHATSAPP_MESSAGE_LIST_ERROR,
  WHATSAPP_CONTACTS_LIST_REQUESTED,
  WHATSAPP_CONTACTS_LIST_SUCCESS,
  WHATSAPP_CONTACTS_LIST_ERROR,
  WHATSAPP_CURRENT_CONTACT_UPDATE,
  EMPTY_WHATSAPP_MESSAGE_LIST,
} from "./actionTypes";

export const updateLatestUnreadMessage = (data) => (dispatch) => {
  // console.log("messageBodyJson", data);
  dispatch({
    type: WHATSAPP_CURRENT_CONTACT_UPDATE,
    payload: data,
  });
};
export const fetchAllContacts =
  ({ filterType, value, orgToken }) =>
  async (dispatch, getState) => {
    dispatch({
      type: WHATSAPP_CONTACTS_LIST_REQUESTED,
    });
    try {
      const response =
        !!filterType && !!value
          ? await axios.get(
              `${process.env.REACT_APP_CARE_CHAT_URL}/contacts?${filterType}=${value}&orgToken=${orgToken}`
              // `${process.env.REACT_APP_CARE_CHAT_URL}/contacts?${filterType}=${value}&orgToken=pF3NmMonSuaRiJ2M6eDv4A`
            )
          : await axios.get(
              `${process.env.REACT_APP_CARE_CHAT_URL}/contacts?orgToken=${orgToken}`
              // `${process.env.REACT_APP_CARE_CHAT_URL}/contacts?orgToken=pF3NmMonSuaRiJ2M6eDv4A`
            );

      if (response?.status === 200) {
        dispatch({
          type: WHATSAPP_CONTACTS_LIST_SUCCESS,
          payload: response?.data?.content,
        });

        // notification.success({
        //   message: "You have been registered successfully.",
        // });
      } else {
        notification.error({
          message:
            response?.data?.message || "error while fetching all contacts.",
        });
      }
    } catch (err) {
      notification.error({
        message:
          err?.response?.data || "Something went wrong! Please try again.",
      });
    }
  };
export const fetchMessageList =
  ({ userPhone, page, orgToken, setHasMore }) =>
  async (dispatch, getState) => {
    const params = {
      pageNo: page,
      orgToken: orgToken,
      // orgToken: "pF3NmMonSuaRiJ2M6eDv4A",
      userPhone: userPhone,
    };
    try {
      // console.log("page current", page);
      const response = await axios.get(
        `${process.env.REACT_APP_CARE_CHAT_URL}/messages`,
        { params: params }
      );

      if (response?.status === 200) {
        if(response?.data?.numberOfElements < 20){
          setHasMore(false);
        }
        if (!!page) {
          // debugger;
          if (page === 1) {
            dispatch({
              type: EMPTY_WHATSAPP_MESSAGE_LIST,
              payload: response?.data?.content,
            });
          } else {
            dispatch({
              type: WHATSAPP_MESSAGE_LIST_SUCCESS,
              payload: response?.data?.content,
            });
          }
        }

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
        message: "Something went wrong! Please try again.",
      });
    }
  };
