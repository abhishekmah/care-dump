import React from "react";
import { FlowCustomizationContainer } from "./style";
import instagramImg from "../Images/instagramImg.svg";
import whatsappImg from "../Images/whatsappImg.svg";
import smsImg from "../Images/smsImg.svg";
import { Button, Switch } from "antd";

const FlowCustomization = () => {
  const channelList = [
    {
      "Where is my order?": true,
      "View Products": false,
      "Cancel my Order": true,
      "Talk to an agent": false,
      "Auto Replies": true,
    },
    {
      "Where is my order?": false,
      "View Products": true,
      "Cancel my Order": true,
      "Talk to an agent": false,
      "Auto Replies": true,
    },
    {
      "Where is my order?": false,
      "View Products": true,
      "Cancel my Order": false,
      "Talk to an agent": true,
      "Auto Replies": false,
    },
    // {
    //   "Where is my order?": true,
    //   "View Products": false,
    //   "Cancel my Order": true,
    //   "Talk to an agent": false,
    //   "Auto Replies": true,
    // },
  ];
  const flowList = Object.keys(channelList[0]);
  console.log("flowList", flowList);

  return (
    <FlowCustomizationContainer>
      <div
        style={{
          height: "calc(100vh - 265px)",
          borderRadius: "10px",
          background: "#ffffff",
          marginTop: "30px",
          padding: "20px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridGap: "80px",
            gridTemplateColumns: "1fr 1fr",
            background: "#F4F4F4",
            borderRadius: "10px",
            padding: "5px 0px 5px 50px",
          }}
        >
          <div style={{ textAlign: "left" }}>
            <h1
              style={{ fontSize: "20px", fontWeight: 700, marginBottom: "0px" }}
            >
              Channels
            </h1>
            <p style={{ marginTop: "0px" }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-evenly",
                borderRadius: "10px",
                padding: "5px",
                background: "#FFFFFF",
              }}
            >
              <img height="25px" width="25px" src={whatsappImg} alt="" />
              <Switch
                defaultChecked={true}
                // onChange={(e) => onStatusChange(data.id, e)}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-evenly",
                borderRadius: "10px",
                padding: "5px",
                background: "#FFFFFF",
              }}
            >
              <img height="25px" width="25px" src={instagramImg} alt="" />
              <Switch
                defaultChecked={true}
                // onChange={(e) => onStatusChange(data.id, e)}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-evenly",
                borderRadius: "10px",
                padding: "5px",
                background: "#FFFFFF",
              }}
            >
              <img height="25px" width="25px" src={smsImg} alt="" />
              <Switch
                defaultChecked={true}
                // onChange={(e) => onStatusChange(data.id, e)}
              />
            </div>
          </div>
        </div>

        <div style={{ width: "96%", marginRight: "0px", marginLeft: "auto" }}>
          {flowList.map((flows, e) => (
            <div
              style={{
                marginTop: "20px",
                display: "grid",
                gridGap: "80px",
                gridTemplateColumns: "1fr 1fr",
                borderBottom: "1px solid #E8E8EA",
              }}
            >
              <div style={{ textAlign: "left" }}>
                <h1
                  style={{
                    fontSize: "14px",
                    fontWeight: 700,
                    marginBottom: "0px",
                  }}
                >
                  {flows}
                </h1>
                <p style={{ marginTop: "0px" }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                }}
              >
                {channelList.map((channel) => (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "space-evenly",
                      borderRadius: "10px",
                      padding: "5px",
                      background: "#FFFFFF",
                    }}
                  >
                    <Switch
                      defaultChecked={channel[flows]}
                      // onChange={(e) => onStatusChange(data.id, e)}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              margin: "40px 8% 0px 0px",
            }}
          >
            <Button
              style={{ marginRight: "15px" }}
              type="primary"
              className="violet_button"
              onClick={() => {
                // setAddQuickReply(false);
                // setQuickReply({});
                // setId("");
              }}
            >
              Discard Changes
            </Button>
            <Button
              type="primary"
              className="violet_button"
              onClick={() => {
                // SaveQuickReply();
                // setAddQuickReply(false);
                // setQuickReply({});
              }}
            >
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </FlowCustomizationContainer>
  );
};

export default FlowCustomization;
