import { Tabs } from "antd";
import React from "react";
import { ChatbotSettingsContainer } from "./style";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import QuickReplies from "./QuickReplies";
import BusinessHourSetup from "./BusinessHourSetup";
import FlowCustomization from "./FlowCustomization";

const ChatbotSettings = () => {
  const [key, setKey] = useState("1");

  useEffect(() => {
    if (window.location.pathname.includes("flow-customization")) {
      setKey("1");
    } else if (window.location.pathname.includes("quick-replies")) {
      setKey("2");
    } else if (window.location.pathname.includes("business-hour-setup")) {
      setKey("3");
    } else {
      setKey("1");
    }
  }, [window.location.pathname]);

  const items = [
    {
      key: "1",
      label: (
        <Link
          className="link"
          to="/settings/chatbot-settings/flow-customization"
          onClick={() => setKey("1")}
        >
          Flow Customization
        </Link>
      ),
      children: <FlowCustomization />,
    },
    {
      key: "2",
      label: (
        <Link
          onClick={() => setKey("2")}
          className="link"
          to="/settings/chatbot-settings/quick-replies"
        >
          Quick Replies
        </Link>
      ),
      children: <QuickReplies />,
    },
    {
      key: "3",
      label: (
        <Link
          onClick={() => setKey("3")}
          className="link"
          to="/settings/chatbot-settings/business-hour-setup"
        >
          Business Hours Setup
        </Link>
      ),
      children: <BusinessHourSetup />,
    },
  ];

  return (
    <ChatbotSettingsContainer>
      <Tabs defaultActiveKey={key} activeKey={key} items={items} />
    </ChatbotSettingsContainer>
  );
};

export default ChatbotSettings;
