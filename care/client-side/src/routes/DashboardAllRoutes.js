import { Route, Routes } from "react-router-dom";
import SignUp from "../pages/Auth/SignUp";
import Inbox from "../pages/Inbox";
import Login from "../pages/Auth/Login";
import ForgotPassword from "../pages/Auth/ForgotPassword";
import ResetPassword from "../pages/Auth/ResetPassword";
import Dashboard from "../pages/Dashboard";
import PrivateRoute from "../routes";
import React from "react";
import ChatThreads from "../pages/Inbox/ChatThreads";
import Settings from "../pages/Settings";
import ChatbotSettings from "../pages/Settings/ChatbotSettings/ChatbotSettings";
import CannedResponses from "../pages/Settings/CannedResponses";
import UsersAndPermissions from "../pages/Settings/UsersAndPermissions";
import Tags from "../pages/Settings/Tags";

const DashboardAllRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/sign-up" Component={SignUp} />
        <Route path="/sign-in" Component={Login} />
        <Route path="/forgot-password" Component={ForgotPassword} />
        <Route path="/reset-password" Component={ResetPassword} />
        <Route path="/" element={<PrivateRoute Component={Dashboard} />}>
          <Route path="inbox" element={<PrivateRoute Component={Inbox} />}>
            <Route
              path=":id"
              element={<PrivateRoute Component={ChatThreads} />}
            />
          </Route>
          <Route
            path="settings"
            element={<PrivateRoute Component={Settings} />}
          >
            <Route
              path="chatbot-settings"
              element={<PrivateRoute Component={ChatbotSettings} />}
            >
              <Route
                path="flow-customization"
                element={<PrivateRoute Component={ChatbotSettings} />}
              />
              <Route
                path="quick-replies"
                element={<PrivateRoute Component={ChatbotSettings} />}
              />
              <Route
                path="business-hour-setup"
                element={<PrivateRoute Component={ChatbotSettings} />}
              />
            </Route>
            <Route
              path="canned-responses"
              element={<PrivateRoute Component={CannedResponses} />}
            />
            <Route
              path="users-and-permissions"
              element={<PrivateRoute Component={UsersAndPermissions} />}
            />
            <Route path="tags" element={<PrivateRoute Component={Tags} />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default DashboardAllRoutes;
