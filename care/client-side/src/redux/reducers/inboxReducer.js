import {
  WHATSAPP_MESSAGE_LIST_REQUESTED,
  WHATSAPP_MESSAGE_LIST_SUCCESS,
  WHATSAPP_MESSAGE_LIST_ERROR,
  WHATSAPP_CONTACTS_LIST_REQUESTED,
  WHATSAPP_CONTACTS_LIST_SUCCESS,
  WHATSAPP_CONTACTS_LIST_ERROR,
  WHATSAPP_CURRENT_CONTACT_UPDATE,
  EMPTY_WHATSAPP_MESSAGE_LIST,
} from "../actions/inboxActions/actionTypes";

import { findIndex, remove, unionBy } from "lodash";

const INITIAL_STATE = {
  whatsapp_contacts_data: [],
  whatsapp_messages_data: [],
};

function inboxPageReducer(state = INITIAL_STATE, action) {
  const { type, payload } = action;
  switch (type) {
    case WHATSAPP_CONTACTS_LIST_SUCCESS:
      return {
        ...state,
        whatsapp_contacts_data: [...payload],
      };
    case EMPTY_WHATSAPP_MESSAGE_LIST:
      return {
        ...state,
        whatsapp_messages_data: [...payload],
      };
    case WHATSAPP_MESSAGE_LIST_SUCCESS:
      return {
        ...state,
        whatsapp_messages_data: [...state.whatsapp_messages_data, ...payload],
      };
    case WHATSAPP_CURRENT_CONTACT_UPDATE:
      const isSameCurrentUser =
        state?.whatsapp_messages_data?.[0]?.userPhone ===
        payload?.message?.userPhone
          ? true
          : false;

      remove(state.whatsapp_contacts_data, (user) => {
        return user?.userPhone === payload?.contact?.userPhone;
      });

      const newData = isSameCurrentUser
        ? {
            whatsapp_contacts_data: [
              payload?.contact,
              ...state?.whatsapp_contacts_data,
            ],

            whatsapp_messages_data: [
              payload?.message,
              ...state?.whatsapp_messages_data,
            ],
          }
        : {
            whatsapp_contacts_data: [
              payload?.contact,
              ...state?.whatsapp_contacts_data,
            ],
          };

      // state.whatsapp_contacts_data = unionBy(
      //   [payload],
      //   state.whatsapp_contacts_data,
      //   payload.userPhone
      // );
      return {
        ...state,
        ...newData,
      };

    default:
      return state;
  }
}

export default inboxPageReducer;
