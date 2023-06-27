import React, { useEffect, useState } from "react";
import { CustomerDetailsContainer } from "./style";
import { Tabs } from "antd";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { find } from "lodash";

const CustomerDetails = ({ isOpen }) => {
  const { whatsapp_contacts_data } = useSelector((state) => state.inboxReducer);
  const [currentUserData, setCurrentUserData] = useState({});
  const { id } = useParams();
  const userPhone = atob(id);
  const onChange = (key) => {
    // console.log(key);
  };
  useEffect(() => {
    if (whatsapp_contacts_data.length > 0) {
      setCurrentUserData(
        find(whatsapp_contacts_data, (data) => {
          return data.userPhone === userPhone;
        })
      );
    }
  }, [whatsapp_contacts_data, userPhone]);

  const items = [
    {
      key: "1",
      label: "Customer Details",
      children: (
        <>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p className="sub-heading">Name</p>
            <p className="sub-heading">{currentUserData?.userName}</p>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p className="sub-heading">Contact No.</p>
            <p className="sub-heading">{currentUserData?.userPhone}</p>
          </div>
        </>
      ),
    },
    {
      key: "2",
      label: "Store",
      children: `Content of Store`,
    },
  ];
  return (
    <>
      <CustomerDetailsContainer
      // className={`height_full animated-div ${!!isOpen ? "open" : ""}`}
      // className="height_full"
      >
        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
      </CustomerDetailsContainer>
    </>
  );
};

export default CustomerDetails;
