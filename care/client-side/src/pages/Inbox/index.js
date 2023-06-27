import { Col, Row, Select } from "antd";
import React, { useEffect, useState } from "react";
import { DashboardContainer, InboxContainer } from "./style";
import Search from "antd/es/input/Search";
import AllChats from "./AllChats";
import { debounce } from "lodash";
import { Outlet, useParams } from "react-router-dom";
import DefaultScreen from "./DefaultScreen";
import { fetchAllContacts } from "../../redux/actions/inboxActions";
import { useDispatch } from "react-redux";
import CustomerDetails from "./CustomerDetails";
import { SidebarContainer, TabsContainer } from "../Dashboard/style";
import expand from "./Images/expand.svg";
import collapse from "./Images/collapse.svg";
import customer from "./Images/customer.svg";
import order from "./Images/order.svg";
import conversation from "./Images/conversation.svg";

const Inbox = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [filterType, setFilterType] = useState("userName");
  const [text, setText] = useState("");
  const [customerData, setCustomerData] = useState({});
  const { id } = useParams();
  let userData = JSON.parse(localStorage.getItem("user_details"));
  let { orgToken } = userData;

  const onChange = debounce((text) => {
    dispatch(fetchAllContacts({ filterType, value: text, orgToken }));
  }, 1000);

  useEffect(() => {
    dispatch(fetchAllContacts({ filterType, value: text, orgToken }));
  }, [filterType]);

  return (
    <DashboardContainer style={{ backgroundColor: "#f0f0f0" }}>
      <InboxContainer>
        <Row style={{ paddingTop: "20px" }}>
          <Col xl={8} lg={8} xs={8} sm={8}>
            <h1 style={{ margin: "0px 0px 20px 20px", textAlign: "left" }}>
              Inbox
            </h1>
          </Col>
          <Col xl={10} lg={10} xs={10} sm={10}>
            <div style={{ display: "flex", height: "32px" }}>
              <Search
                placeholder="Search by  Customer Name, or Contact Number"
                onChange={(e) => {
                  onChange(e.target.value);
                  setText(e.target.value);
                }}
                onSearch={(e) => {
                  fetchAllContacts({ filterType, value: e, orgToken });
                }}
              />
              <div
                style={{
                  width: "104px",
                  marginLeft: "10px",
                  background: "#FFFFFF",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                <Select
                  placeholder="Select a Filter Type"
                  defaultValue={"userName"}
                  optionFilterProp="children"
                  onChange={(e) => setFilterType(e)}
                >
                  <Select.Option value="userName" key="1">
                    Customer Name
                  </Select.Option>
                  <Select.Option value="userPhone" key="2">
                    Customer Phone
                  </Select.Option>
                </Select>
              </div>
            </div>
          </Col>
        </Row>

        <div
          className="height_full"
          style={{
            margin: "0px 20px",
            background: "#ffff",
            borderRadius: "3px",
            display: "grid",
            gridTemplateColumns: !id
              ? "300px auto"
              : isOpen
              ? "300px auto 353px 50px"
              : "300px auto 50px",
          }}
        >
          <AllChats filterType={filterType} text={text} />
          {!id && <DefaultScreen />}
          {!!id && <Outlet />}
          {/* {!!isOpen && <CustomerDetails />} */}
          {!!isOpen && <CustomerDetails isOpen={isOpen} />}

          {!!id && (
            <SidebarContainer
              className="height_full"
              style={{ borderLeft: "1px solid #ECECEC" }}
            >
              <div className="tabs_container">
                <TabsContainer
                  style={{ marginBottom: "80px" }}
                  onClick={() => {
                    !!isOpen ? setIsOpen(false) : setIsOpen(true);
                  }}
                >
                  <div>
                    <img
                      src={!!isOpen ? collapse : expand}
                      alt="Open Sidebar"
                    />
                  </div>
                </TabsContainer>
                <TabsContainer onClick={() => {}}>
                  <div>
                    <img src={customer} alt="Customer Details" />
                  </div>
                </TabsContainer>
                <TabsContainer onClick={() => {}}>
                  <div>
                    <img src={order} alt="Order Details" />
                  </div>
                </TabsContainer>
                <TabsContainer onClick={() => {}}>
                  <div>
                    <img src={conversation} alt="Conversation Details" />
                  </div>
                </TabsContainer>
              </div>
            </SidebarContainer>
          )}
        </div>
      </InboxContainer>
    </DashboardContainer>
  );
};

export default Inbox;
