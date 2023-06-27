import { client, xml } from "@xmpp/client";
import debug from "@xmpp/debug";
import { updateLatestUnreadMessage } from "../redux/actions/inboxActions";
import { get } from "lodash";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
let userData = JSON.parse(localStorage.getItem("user_details"));
let { xmppUserName, xmppPassword } = userData || {};
// console.log("userData", userData);

// export const xmpp = new client({
//   service: "ws://localhost:5443/ws",
//   username: "abhishek",
//   password: "password",
//   // domain: "firefly",
// });
// export const xmpp = new client({
//   service: "ws://10.10.10.165:5443/ws",
//   // username: xmppUserName,
//   // password: xmppPassword,
//   username: "rahul",
//   password: "password",
//   domain: "firefly",
// });
// // debug(xmpp, true);

window.globalXmpp = window.globalXmpp || null;
export let configureXmpp = (userName, password, dispatch) => {
  let data = {
    // service: "ws://10.10.10.165:5443/ws",
    service: "wss://sentry.wigzopush.com/ws",
    username: userName,
    password: password,
    domain: "firefly",
  };

  window.globalXmpp = new client(data);
  !!window.globalXmpp && connect(dispatch);
};

export const connect = (dispatch) => {
  console.log("XMPP Called");

  let xmpp = window.globalXmpp;

  xmpp.on("error", (err) => {
    console.error(err);
    xmpp.stop().catch(console.error);
  });

  xmpp.on("stanza", (stanza) => {
    // console.log("Get and stanza in ADMIN login :", stanza);
    if (!stanza.is("message")) return;

    let messageBodyStr = get(stanza, "children[2].children[0]");
    if (!messageBodyStr) return;

    let messageBodyJson = JSON.parse(messageBodyStr);

    dispatch(updateLatestUnreadMessage(messageBodyJson));

    // const { to, from } = stanza.attrs;
    // stanza.attrs.from = to;
    // stanza.attrs.to = from;
  });

  xmpp.on("online", async (address) => {
    await xmpp.send(xml("presence"));
    // console.log(`User ${address} is online`);
    // const message = "Hello from admin";
    // const recipients = ["rahul@localhost"];
    const recipients = ["rihan@firefly"];

    // const stanzas = recipients.map((add) =>
    //   xml("message", { to: add, type: "chat" }, xml("body", null, message))
    // );
    // xmpp
    //   .sendMany(stanzas)
    //   .then(() => {
    //     console.log("Chat messages sent successfully!");
    //   })
    //   .catch(console.error);
    // xmpp.stop().catch(console.error);
  });

  xmpp.start().catch(console.error);
};
