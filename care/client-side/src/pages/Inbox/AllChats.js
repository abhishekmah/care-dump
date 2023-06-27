import { Tabs } from "antd";
import React, { useEffect, useState } from "react";
import { AllChatsContainer, ChatsContainer } from "../Inbox/style";
import whatsapp from "./Images/whatsapp.svg";
import instagram from "./Images/instagram.svg";
import sms from "./Images/sms.svg";
import profilePic from "./Images/profilePic.svg";
import selectedUser from "./Images/selectedUser.svg";
import messenger from "./Images/messenger.svg";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllContacts } from "../../redux/actions/inboxActions";
import InfiniteScroll from "react-infinite-scroll-component";

const AllChats = ({ filterType, text }) => {
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [userPhone, setUserPhone] = useState("");
  const [updatedWhatsappContactsData, setUpdatedWhatsappContactsData] =
    useState([]);

  useEffect(() => {
    if (!!id) {
      setUserPhone(atob(id));
    }
  }, [id]);

  const onChange = (key) => {
    // console.log(key);
  };
  const { whatsapp_contacts_data } = useSelector((state) => state.inboxReducer);
  let userData = JSON.parse(localStorage.getItem("user_details"));
  let { orgToken } = userData;

  const FetchContactsApiCall = () => {
    dispatch(fetchAllContacts({ filterType, value: text, orgToken }));
  };

  useEffect(() => {
    if (whatsapp_contacts_data?.length > 0) {
      setUpdatedWhatsappContactsData(
        whatsapp_contacts_data.map((item) => {
          let parts = item.lastUpdatedAt.split("-");
          let lastString = parts[2].split("T");

          // Rearrange the parts to the desired format
          let newDateString =
            parts[0] +
            "-" +
            lastString[0] +
            "-" +
            parts[1] +
            "T" +
            lastString[1];

          return { ...item, lastUpdatedAt: newDateString };
        })
      );
    }
  }, [whatsapp_contacts_data]);

  return (
    <>
      <AllChatsContainer
        className="height_full"
        style={{
          overflow: "scroll !important",
          overflowY: "scroll !important",
          overflowX: "hidden",
          borderRight: "1px solid #ECECEC",
        }}
      >
        <Tabs defaultActiveKey="2" onChange={onChange}>
          <Tabs.TabPane
            key={1}
            tab={
              <p
                style={{
                  fontSize: "20px",
                  padding: "0px 5px",
                  color: "#C6C6C7",
                }}
              >
                All
              </p>
            }
          >
            Content of All Chats
          </Tabs.TabPane>
          <Tabs.TabPane
            key={2}
            tab={
              <div>
                <img src={whatsapp} alt="" />
              </div>
            }
          >
            <ChatsContainer
              id="contactScrollableDiv"
              style={{
                overflow: "scroll !important",
                overflowY: "scroll !important",
                overflowX: "auto",
              }}
            >
              {/* <div style={{ padding: "0px 20px" }}>
                <Search></Search>
              </div> */}
              <InfiniteScroll
                // pullDownToRefresh={true}
                dataLength={page * 25}
                hasMore={hasMore}
                next={FetchContactsApiCall}
                scrollableTarget="contactScrollableDiv"
                // loader={<h4>Loading...</h4>}
              >
                {updatedWhatsappContactsData?.map((data, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      cursor: "pointer",
                      padding: "10px 0px",
                      borderTop: "1px solid #D4D6DC",
                      background:
                        userPhone === data.userPhone ? "#E1E2FF" : "#ffffff",
                    }}
                    onClick={() => {
                      const phone = data?.userPhone;
                      navigate(`/inbox/${btoa(phone)}`);
                    }}
                  >
                    <div
                      style={{
                        textAlign: "left",
                        paddingLeft: "10px",
                        marginRight: "10px",
                        height: "50px",
                      }}
                    >
                      <img
                        src={
                          userPhone === data.userPhone
                            ? selectedUser
                            : profilePic
                        }
                        alt=""
                      />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        textAlign: "left",
                        overflow: "hidden",
                      }}
                    >
                      <h1
                        style={{
                          margin: "0px",
                          fontSize: "16px",
                          fontWeight: 400,
                          color: "#002659",
                          paddingBottom: "1px",
                        }}
                      >
                        {data?.userName}
                      </h1>
                      <p
                        style={{
                          margin: "0px",
                          marginTop: "1px",
                          fontSize: "14px",
                          color: "#4D678B",
                        }}
                      >
                        {data?.lastMessage}
                      </p>
                    </div>
                    <div
                      style={{
                        margin: "auto 0px 0px auto",
                        padding: "0px 10px 0px 10px",
                      }}
                    >
                      <h1
                        style={{
                          margin: "0px",
                          marginBottom: "5px",
                          fontSize: "12px",
                          color: "#4D678B",
                          fontWeight: 400,
                        }}
                      >
                        {new Date(data.lastUpdatedAt).toLocaleTimeString(
                          "en-US",
                          {
                            hour: "numeric",
                            minute: "numeric",
                            // second: "numeric",
                            hour12: true,
                          }
                        )}
                      </h1>
                    </div>
                  </div>
                ))}
              </InfiniteScroll>
            </ChatsContainer>
          </Tabs.TabPane>
          <Tabs.TabPane
            key={3}
            tab={
              <div>
                <img src={messenger} alt="" />
              </div>
            }
          >
            Content of messenger
          </Tabs.TabPane>
          <Tabs.TabPane
            key={4}
            tab={
              <div>
                <img src={sms} alt="" />
              </div>
            }
          >
            Content of sms
          </Tabs.TabPane>
          <Tabs.TabPane
            key={5}
            tab={
              <div>
                <img src={instagram} alt="" />
              </div>
            }
          >
            Content of instagram
          </Tabs.TabPane>
        </Tabs>
      </AllChatsContainer>
    </>
  );
};

export default AllChats;
