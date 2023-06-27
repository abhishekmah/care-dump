import { Button } from "antd";
import React, { useState } from "react";
import TextArea from "antd/es/input/TextArea";
import { v4 as uuidv4 } from "uuid";
import { CannedResponsesContainer } from "./style";

const CannedResponses = () => {
  const [cannedResponsesList, setCannedResponsesList] = useState([]);
  const [cannedResponse, setCannedResponse] = useState({
    keyword: "",
    response: "",
  });
  const [addCannedResponse, setAddCannedResponse] = useState(false);
  const [id, setId] = useState("");
  const SaveCannedResponse = () => {
    if (id) {
      let new_list = cannedResponsesList.filter((e) => {
        return e.id !== id;
      });

      setCannedResponsesList([...new_list, { id: id, ...cannedResponse }]);
    } else {
      setCannedResponsesList([
        ...cannedResponsesList,
        { id: uuidv4(), ...cannedResponse },
      ]);
    }
  };
  const EditCannedResponse = (key) => {
    setId(key);
    setCannedResponse(
      ...cannedResponsesList.filter((e) => {
        return e.id === key;
      })
    );
  };
  const DeleteCannedResponse = (key) => {
    setCannedResponsesList(
      cannedResponsesList.filter((e) => {
        return key !== e.id;
      })
    );
  };

  return (
    <CannedResponsesContainer>
      {!!addCannedResponse ? (
        <div style={{ textAlign: "left" }}>
          <h1 className="textbox_heading">Keyword</h1>
          <TextArea
            className="input_keyword"
            placeholder="Type your message here"
            value={cannedResponse.keyword}
            onChange={(e) =>
              setCannedResponse({ ...cannedResponse, keyword: e.target.value })
            }
          />

          <h1 className="textbox_heading">Response</h1>
          <TextArea
            className="input_response"
            placeholder="Type your message here"
            value={cannedResponse.response}
            onChange={(e) =>
              setCannedResponse({ ...cannedResponse, response: e.target.value })
            }
          />
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              style={{ marginRight: "15px" }}
              type="primary"
              className="add_button"
              onClick={() => {
                setAddCannedResponse(false);
                setCannedResponse({});
                setId("");
              }}
            >
              Discard
            </Button>
            <Button
              type="primary"
              className="add_button"
              onClick={() => {
                SaveCannedResponse();
                setAddCannedResponse(false);
                setCannedResponse({});
              }}
            >
              Save
            </Button>
          </div>
        </div>
      ) : (
        <>
          {!!cannedResponsesList.length ? (
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
                    Canned Responses
                  </h1>
                  <p style={{ marginTop: "0px", fontSize: "14px " }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Button
                    type="primary"
                    className="add_button"
                    onClick={() => setAddCannedResponse(true)}
                  >
                    Add Canned Response +
                  </Button>
                </div>
              </div>
              <div>
                {cannedResponsesList.map((data) => (
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
                        {data?.keyword}
                      </h1>
                      <p style={{ fontSize: "14px", margin: "0px" }}>
                        {data?.response}
                      </p>
                    </div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Button
                        style={{ marginRight: "15px" }}
                        type="primary"
                        className="add_button"
                        onClick={() => {
                          setAddCannedResponse(true);
                          EditCannedResponse(data.id);
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        type="primary"
                        className="add_button"
                        onClick={() => {
                          DeleteCannedResponse(data.id);
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
                    Canned Responses
                  </h1>
                  <p style={{ marginTop: "0px", fontSize: "14px " }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Button
                    type="primary"
                    className="add_button"
                    onClick={() => setAddCannedResponse(true)}
                  >
                    Add Canned Response +
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
    </CannedResponsesContainer>
  );
};

export default CannedResponses;
