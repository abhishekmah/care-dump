import { Button } from "antd";
import React, { useState } from "react";
import { QuickRepliesContainer } from "./style";
import TextArea from "antd/es/input/TextArea";
import { v4 as uuidv4 } from "uuid";

const QuickReplies = () => {
  const [quickRepliesList, setQuickRepliesList] = useState([]);
  const [quickReply, setQuickReply] = useState({ question: "", answer: "" });
  const [addQuickReply, setAddQuickReply] = useState(false);
  const [id, setId] = useState("");
  const SaveQuickReply = () => {
    if (id) {
      let new_list = quickRepliesList.filter((e) => {
        return e.id !== id;
      });

      setQuickRepliesList([...new_list, { id: id, ...quickReply }]);
    } else {
      setQuickRepliesList([
        ...quickRepliesList,
        { id: uuidv4(), ...quickReply },
      ]);
    }
  };
  const EditQuickReply = (key) => {
    setId(key);
    setQuickReply(
      ...quickRepliesList.filter((e) => {
        return e.id === key;
      })
    );
  };
  const DeleteQuickReply = (key) => {
    setQuickRepliesList(
      quickRepliesList.filter((e) => {
        return key !== e.id;
      })
    );
  };

  return (
    <QuickRepliesContainer>
      {!!addQuickReply ? (
        <div style={{ textAlign: "left" }}>
          <h1 className="textbox_heading">Question</h1>
          <TextArea
            className="input_question"
            placeholder="Type your message here"
            value={quickReply.question}
            onChange={(e) =>
              setQuickReply({ ...quickReply, question: e.target.value })
            }
          />

          <h1 className="textbox_heading">Answer</h1>
          <TextArea
            className="input_answer"
            placeholder="Type your message here"
            value={quickReply.answer}
            onChange={(e) =>
              setQuickReply({ ...quickReply, answer: e.target.value })
            }
          />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p>
              Select tag to be assigned to conversation post completion of this
              chatbot flow
            </p>
            <div>
              <Button
                style={{ marginRight: "15px" }}
                type="primary"
                className="add_button"
                onClick={() => {
                  setAddQuickReply(false);
                  setQuickReply({});
                  setId("");
                }}
              >
                Discard
              </Button>
              <Button
                type="primary"
                className="add_button"
                onClick={() => {
                  SaveQuickReply();
                  setAddQuickReply(false);
                  setQuickReply({});
                }}
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <>
          {!!quickRepliesList.length ? (
            <>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  margin: "20px 0px 20px 0px",
                }}
              >
                <div style={{ textAlign: "left" }}>
                  <h1 style={{ margin: "0px", fontSize: "20px" }}>
                    Quick Replies
                  </h1>
                  <p style={{ marginTop: "0px", fontSize: "14px " }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Button
                    type="primary"
                    className="add_button"
                    onClick={() => setAddQuickReply(true)}
                  >
                    Add Quick Replies +
                  </Button>
                </div>
              </div>
              <div>
                {quickRepliesList.map((data) => (
                  <div
                    key={data.id}
                    style={{
                      //   height: "80px",
                      background: "#FFFFFF",
                      padding: "20px 25px",
                      borderRadius: "12px",
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "10px",
                    }}
                  >
                    <div style={{ textAlign: "left" }}>
                      <h1 style={{ fontSize: "14px", margin: "0px" }}>
                        {data?.question}
                      </h1>
                      <p style={{ fontSize: "14px", margin: "0px" }}>
                        {data?.answer}
                      </p>
                    </div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Button
                        style={{ marginRight: "15px" }}
                        type="primary"
                        className="add_button"
                        onClick={() => {
                          setAddQuickReply(true);
                          EditQuickReply(data.id);
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        type="primary"
                        className="add_button"
                        onClick={() => {
                          DeleteQuickReply(data.id);
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "20px",
                }}
              >
                <div style={{ textAlign: "left" }}>
                  <h1 style={{ margin: "0px", fontSize: "20px" }}>
                    Quick Replies
                  </h1>
                  <p style={{ marginTop: "0px", fontSize: "14px " }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Button
                    type="primary"
                    className="add_button"
                    onClick={() => setAddQuickReply(true)}
                  >
                    Add Quick Replies +
                  </Button>
                </div>
              </div>
              <div
                style={{
                  height: "calc(100vh - 250px)",
                  display: "flex",
                  alignItems: "center",
                  fontSize: "16px",
                  justifyContent: "center",
                  color: "#C0C0C0",
                }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Praesent quam est, porttitor at orci in,
              </div>
            </>
          )}
        </>
      )}
    </QuickRepliesContainer>
  );
};

export default QuickReplies;
