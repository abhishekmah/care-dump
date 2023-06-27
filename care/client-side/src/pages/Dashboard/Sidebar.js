import React from "react";
import { SidebarContainer, TabsContainer } from "./style";
import { SidebarData } from "./SidebarData";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("jwt_token");
    localStorage.removeItem("user_details");
    window.globalXmpp.stop().catch(console.error);
    window.globalXmpp = null;

    navigate("/sign-in");
  };

  return (
    <SidebarContainer>
      <div className="tabs_container">
        {SidebarData.map((bars, index) => (
          <TabsContainer
            key={index}
            onClick={() => {
              bars.alt === "logout" ? handleLogout() : navigate(bars.link);
            }}
          >
            <div
              id={
                window.location.pathname === "/" && bars.label === "home"
                  ? "active"
                  : window.location.pathname
                      .split("/")
                      .join(" ")
                      .includes(bars.label)
                  ? "active"
                  : "inactive"
              }
            >
              <img
                src={
                  window.location.pathname === "/" && bars.label === "home"
                    ? bars.active_icon
                    : window.location.pathname
                        .split("/")
                        .join(" ")
                        .includes(bars.label)
                    ? bars.active_icon
                    : bars.icon
                }
                alt={bars.alt}
                style={{ opacity: bars.alt === "logout" && 0.6 }}
              />
            </div>
          </TabsContainer>
        ))}
      </div>
    </SidebarContainer>
  );
};

export default Sidebar;
