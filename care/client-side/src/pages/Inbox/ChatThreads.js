import TextArea from "antd/es/input/TextArea";
import attachmentimg from "./Images/attachmentimg.svg";
import recordimg from "./Images/recordimg.svg";
import galleryimg from "./Images/galleryimg.svg";
import profileImg from "./Images/profileImg.png";
import delivered from "./Images/delivered.svg";
import read from "./Images/read.svg";
import sent from "./Images/sent.svg";
import closeIcon from "./Images/closeIcon.svg";
import { Button, Upload } from "antd";
import { CustomModal, Message, MessageContainer, MessageDiv } from "./style";
import { useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchMessageList } from "../../redux/actions/inboxActions";
import { data } from "./mockData";
import { sendMessageApi } from "../../utils/chat";
import { PlusOutlined } from "@ant-design/icons";
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const ChatThreads = () => {
  // const [messagesList, setMessageList] = useState(data);
  const [messageText, setMessageText] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isSelected, setIsSelected] = useState(false);
  const [items, setItems] = useState(Array.from({ length: 20 }, (v, i) => i));
  const { id } = useParams();
  const userPhone = atob(id);
  const dispatch = useDispatch();
  const bottomRef = useRef();
  const { whatsapp_contacts_data } = useSelector((state) => state.inboxReducer);
  const { whatsapp_messages_data } = useSelector((state) => state.inboxReducer);
  const [currentUserData, setCurrentUserData] = useState({});
  const [messagesList, setMessageList] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  let userData = JSON.parse(localStorage.getItem("user_details"));
  let { orgToken } = userData;
  const [fileList, setFileList] = useState([
    // {
    //   uid: "-1",
    //   name: "image.png",
    //   status: "done",
    //   url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    // },
  ]);

  // console.log("messagesList", messagesList);

  const handleCancelPreview = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    console.log("file.preview111", file.preview, file.url);

    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
      console.log("file.preview222", file.preview, file.url);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };
  const handleChange = ({ fileList }) => {
    setFileList(fileList);
    console.log("newFileList", fileList);
  };
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  useEffect(() => {
    if (userPhone) {
      dispatch(
        fetchMessageList({
          userPhone,
          page,
          orgToken,
          setHasMore,
        })
      );
      setFileList([]);
    } else {
      setMessageList([]);
    }
  }, [userPhone]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messagesList]);

  useEffect(() => {
    // if (whatsapp_messages_data?.length > 0) {
    //   console.log("whatsapp_messages_data", whatsapp_messages_data);
    //   whatsapp_messages_data.map((item) => {
    //     let parts = item.lastUpdatedAt.split("-");
    //     let lastString = parts[2].split("T");

    //     // Rearrange the parts to the desired format
    //     let newDateString =
    //       parts[0] + "-" + lastString[0] + "-" + parts[1] + "T" + lastString[1];

    //     return { ...item, lastUpdatedAt: newDateString };
    //   });
    // }

    setMessageList([...whatsapp_messages_data]);
  }, [whatsapp_messages_data]);

  const FetchMessageListApiCall = () => {
    // console.log("func is called");
    // setItems(items.concat(Array.from({ length: 20 }, (v, i) => i)));
    dispatch(
      fetchMessageList({ userPhone, page: page + 1, orgToken, setHasMore })
    );
    setPage(page + 1);
  };

  // console.log("itemLength", items.length);
  // console.log("items", items);

  const SendMessage = () => {
    sendMessageApi({ dispatch, messageText, userPhone, orgToken });
    setMessageText("");
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    // setIsModalOpen(false);
    setIsSelected(true);
  };
  const handleCancel = () => {};

  useEffect(() => {
    if (whatsapp_contacts_data?.length > 0) {
      whatsapp_contacts_data?.map((data) => {
        let parts = data.lastUpdatedAt.split("-");
        let lastString = parts[2].split("T");

        // Rearrange the parts to the desired format
        let newDateString =
          parts[0] + "-" + lastString[0] + "-" + parts[1] + "T" + lastString[1];

        if (data.userPhone === userPhone) {
          setCurrentUserData({
            ...data,
            time: new Date(newDateString).toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "numeric",
              // second: "numeric",
              hour12: true,
            }),
            date: new Date(newDateString).toLocaleDateString("en-US", {
              year: "numeric",
              month: "numeric",
              day: "numeric",
            }),
            lastUpdatedAt: newDateString,
          });
        }
      });
    }
  }, [whatsapp_contacts_data, userPhone]);

  return (
    <>
      <div
        className={`height_full ${isModalOpen ? "modal_active" : ""}`}
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div className="user_details_bar">
          <div className="icon">
            <img src={profileImg} alt="" />
          </div>
          {!!Object.keys(currentUserData).length && (
            <div className="user_details">
              <h4 style={{ marginBottom: "0px" }} className="font-style">
                {currentUserData.userName}
              </h4>
              <span className="font-style" style={{ fontSize: "12px" }}>
                {currentUserData.date} {"| " + currentUserData.time}
              </span>
            </div>
          )}
        </div>

        <MessageContainer
          id="messageScrollableDiv"
          style={{
            overflow: "scroll !important",
            overflowY: "scroll !important",
            overflowX: "auto",
            display: "flex",
            flexDirection: "column-reverse",
          }}
        >
          <InfiniteScroll
            inverse={true}
            dataLength={page * 20}
            hasMore={hasMore}
            next={FetchMessageListApiCall}
            scrollableTarget="messageScrollableDiv"
            loader={<h4>Loading...</h4>}
            style={{ display: "flex", flexDirection: "column-reverse" }}
          >
            <div ref={bottomRef}></div>
            {messagesList?.map((messageData, index) => (
              <MessageDiv
                key={index}
                isYours={messageData.direction === "outBound"}
              >
                <Message isYours={messageData.direction === "outBound"}>
                  <p>
                    {[messageData.message]} {messageData.lastUpdatedAt}
                    {messageData.direction === "outBound" &&
                      (messageData?.status === "sent" ? (
                        <img src={sent} alt="" />
                      ) : messageData?.status === "delivered" ? (
                        <img src={delivered} alt="" />
                      ) : (
                        <img
                          style={{ margin: "3px 0px 0px 6px" }}
                          src={read}
                          alt=""
                        />
                      ))}
                  </p>
                </Message>
              </MessageDiv>
            ))}
            {/* {items?.map((messageData, index) => (
              <MessageDiv
                key={index}
                isYours={messageData.direction === "outBound"}
              >
                <Message isYours={messageData.direction === "outBound"}>
                  {index}
                </Message>
              </MessageDiv>
            ))} */}
          </InfiniteScroll>
        </MessageContainer>
        <div className="outer_box">
          {!!fileList?.length && (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                height: "64px",
                marginBottom: "5px",
                border: "1px solid #CCD3DE",
                borderRadius: "4px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                {fileList.map(
                  (file) =>
                    file?.thumbUrl && (
                      <div style={{ marginLeft: "5px" }}>
                        <img
                          src={file?.thumbUrl}
                          alt=""
                          width="56px"
                          height="56px"
                        />
                      </div>
                    )
                )}
              </div>
              <div
                style={{ cursor: "pointer", padding: "5px 3px 0px 0px" }}
                onClick={() => setFileList([])}
              >
                <img src={closeIcon} alt="" />
              </div>
            </div>
          )}
          <div className="inner_box">
            <TextArea
              className="input"
              placeholder="Type your message here"
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              onPressEnter={(e) => {
                SendMessage();
                e.preventDefault();
              }}
            />

            <div className="footer">
              <div className="text-container">
                <img
                  onClick={showModal}
                  src={attachmentimg}
                  alt=""
                  height={20}
                  width={20}
                />
                <img src={galleryimg} alt="" height={20} width={20} />
              </div>
              <Button type="primary" className="button" onClick={SendMessage}>
                Send
              </Button>
            </div>
          </div>
        </div>
      </div>

      <CustomModal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        mask={false}
        onCancel={handleCancelPreview}
      >
        <img
          alt="example"
          style={{
            width: "100%",
          }}
          src={previewImage}
        />
      </CustomModal>
      <CustomModal
        mask={false}
        centered={true}
        open={isModalOpen}
        footer={null}
        onCancel={() => {
          setIsModalOpen(false);
          setIsSelected(false);
        }}
      >
        <>
          <h4
            style={{
              fontSize: "16px",
              textAlign: "center",
              marginBottom: isSelected && "35px",
            }}
          >
            Select files to upload
          </h4>
          {isSelected && (
            <>
              <Upload
                // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
                beforeUpload={(file) => {
                  console.log("fileee", file);
                }}
              >
                {fileList.length >= 8 ? null : uploadButton}
              </Upload>
            </>
          )}
          <div
            style={{
              marginTop: "50px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <button className="button" onClick={handleOk}>
              {isSelected ? "Upload" : "Select"}
            </button>
          </div>
        </>
      </CustomModal>
    </>
  );
};
export default ChatThreads;
