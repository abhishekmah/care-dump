import home from "./Images/home.svg";
import docs from "./Images/docs.svg";
import equalizer from "./Images/equalizer.svg";
import flag from "./Images/flag.svg";
import graph from "./Images/graph.svg";
import settings from "./Images/settings.svg";
import users from "./Images/users.svg";
import mail from "./Images/mail.svg";
import logout from "./Images/logout.jpg";
import home_active from "./Images/home_active.svg";
import docs_active from "./Images/docs_active.svg";
import equalizer_active from "./Images/equalizer_active.svg";
import flag_active from "./Images/flag_active.svg";
import graph_active from "./Images/graph_active.svg";
import settings_active from "./Images/settings_active.svg";
import users_active from "./Images/users_active.svg";
import mail_active from "./Images/mail_active.svg";

export const SidebarData = [
  {
    icon: home,
    active_icon: home_active,
    link: "/",
    alt: "home",
    label: "home",
  },
  {
    icon: mail,
    active_icon: mail_active,
    link: `/inbox`,
    alt: "mail",
    label: "inbox",
  },
  {
    icon: docs,
    active_icon: docs_active,
    //  link: "/docs",
    alt: "docs",
    label: "docs",
  },
  {
    icon: equalizer,
    active_icon: equalizer_active,
    //  link: "/equalizer",
    alt: "equalizer",
    label: "equalizer",
  },
  {
    icon: flag,
    active_icon: flag_active,
    //  link: "/flag",
    alt: "flag",
    label: "flag",
  },
  {
    icon: graph,
    active_icon: graph_active,
    //  link: "/graph",
    alt: "graph",
    label: "graph",
  },
  {
    icon: settings,
    active_icon: settings_active,
    link: "/settings/chatbot-settings/flow-customization",
    alt: "settings",
    label: "settings",
  },
  {
    icon: users,
    active_icon: users_active,
    //  link: "/users",
    alt: "users",
    label: "users",
  },
  {
    icon: logout,
    //  link: "/users",
    alt: "logout",
    label: "logout",
  },
];
