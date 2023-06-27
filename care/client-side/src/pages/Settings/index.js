import React from "react";
import { SettingsContainer } from "./style";
import { Menu } from "antd";
import { Link, Navigate, Outlet, useNavigate } from "react-router-dom";
import chatbotSettings from "./Images/chatbotSettings.svg";
import cannedResponses from "./Images/cannedResponses.svg";
import Tags from "./Images/Tags.svg";
import userAndPermission from "./Images/userAndPermission.svg";
import cannedResponsesSelected from "./Images/cannedResponsesSelected.svg";
import TagsSelected from "./Images/TagsSelected.svg";
import userAndPermissionSelected from "./Images/userAndPermissionSelected.svg";
import SubMenu from "antd/es/menu/SubMenu";
import { useEffect } from "react";
import { useState } from "react";

const Settings = () => {
  const navigate = useNavigate();
  const keys = ["/canned-responses", "/users-and-permissions", "/tags"];
  let [defaultKey, setDefaultKey] = useState("");
  // const rootSubmenuKeys = [
  //   "chatbot-settings",
  //   "canned-responses",
  //   "users-and-permissions",
  //   "tags",
  // ];

  const [openKeys, setOpenKeys] = useState(["chatbot-settings"]);
  // const onOpenChange = (keys) => {
  //   const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
  //   if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
  //     setOpenKeys(keys);
  //   } else {
  //     setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
  //   }
  // };

  useEffect(() => {
    setDefaultKey(
      window.location.pathname.includes("flow-customization")
        ? "/flow-customization"
        : window.location.pathname.includes("quick-replies")
        ? "/quick-replies"
        : window.location.pathname.includes("business-hour-setup")
        ? "/business-hour-setup"
        : window.location.pathname.includes("canned-responses")
        ? "/canned-responses"
        : window.location.pathname.includes("users-and-permissions")
        ? "/users-and-permissions"
        : window.location.pathname.includes("tags")
        ? "/tags"
        : "/flow-customization"
    );
  }, [window.location.pathname]);

  return (
    <SettingsContainer>
      <div
        style={{ textAlign: "left", paddingLeft: "20px", marginBottom: "50px" }}
      >
        <h1 style={{ marginBottom: "2px" }}>Settings</h1>
        <p style={{ marginTop: "5px" }}>
          Lorem ipsum dolor sit amet, consectetufirstr adipiscing elit.
        </p>
      </div>

      <div
        style={{
          paddingLeft: "20px",
          display: "grid",
          gridTemplateColumns: "274px auto 40px",
          gridGap: "40px",
        }}
      >
        <div
          style={{
            width: "256px",
            height: "calc(100vh - 160px)",
            borderRadius: "10px",
            background: "#FFFFFF",
          }}
        >
          <Menu
            defaultSelectedKeys={["/flow-customization"]}
            selectedKeys={[defaultKey || "canned-responses"]}
            mode="inline"
            multiple={false}
            openKeys={openKeys}
            onOpenChange={() => {
              if (openKeys.includes("chatbot-settings")) {
                setOpenKeys("");
              } else {
                setOpenKeys(["chatbot-settings"]);
              }
            }}
            onSelect={(e) => {
              if (keys.includes(e.key)) {
                setOpenKeys("");
              }
            }}
          >
            <SubMenu
              key="chatbot-settings"
              onTitleClick={() => navigate("/settings/chatbot-settings")}
              icon={<img src={chatbotSettings} alt="" />}
              title="Chatbot Settings"
            >
              <Menu.Item key="/flow-customization" label="Flow Customization">
                <Link to="/settings/chatbot-settings/flow-customization">
                  Flow Customization
                </Link>
              </Menu.Item>
              <Menu.Item key="/quick-replies" label="Quick Replies">
                <Link to="/settings/chatbot-settings/quick-replies">
                  Quick Replies
                </Link>
              </Menu.Item>
              <Menu.Item
                key="/business-hour-setup"
                label="Business Hours Setup"
              >
                <Link to="/settings/chatbot-settings/business-hour-setup">
                  Business Hours Setup
                </Link>
              </Menu.Item>
            </SubMenu>

            <Menu.Item
              key="/canned-responses"
              icon={
                <img
                  src={
                    window.location.pathname.includes("canned-responses")
                      ? cannedResponsesSelected
                      : cannedResponses
                  }
                  alt=""
                />
              }
              label="Canned Responses"
            >
              <Link to="/settings/canned-responses">Canned Responses</Link>
            </Menu.Item>
            <Menu.Item
              key="/users-and-permissions"
              icon={
                <img
                  src={
                    window.location.pathname.includes("users-and-permissions")
                      ? userAndPermissionSelected
                      : userAndPermission
                  }
                  alt=""
                />
              }
              title="User and permission"
            >
              <Link to="/settings/users-and-permissions">
                User and permission
              </Link>
            </Menu.Item>
            <Menu.Item
              key="/tags"
              title="Tags"
              icon={
                <img
                  src={
                    window.location.pathname.includes("tags")
                      ? TagsSelected
                      : Tags
                  }
                  alt=""
                />
              }
            >
              <Link to="/settings/tags">Tags</Link>
            </Menu.Item>
          </Menu>
        </div>
        <Outlet />
      </div>
    </SettingsContainer>
  );
};

export default Settings;
