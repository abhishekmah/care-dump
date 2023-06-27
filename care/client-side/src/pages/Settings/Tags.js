import React, { useState } from "react";
import { TagsContainer } from "./style";
import { v4 as uuidv4 } from "uuid";
import { Button, Input } from "antd";

const Tags = () => {
  const [tagsList, setTagsList] = useState([]);
  const [tag, setTag] = useState({
    tagName: "",
    color: "",
  });
  const [addTag, setAddTag] = useState(false);
  const [id, setId] = useState("");
  const colorData = [
    { bgColor: "#F4F1FF", color: "#898989" },
    { bgColor: "#F0FAFF", color: "#0FA7EB" },
    { bgColor: "#F6F2FF", color: "#3A00E0" },
    { bgColor: "#F4FFF7", color: "#00B532" },
    { bgColor: "#EEFFFC", color: "#00735E" },
    { bgColor: "#FFF1FE", color: "#BA00A7" },
    { bgColor: "#FFFEF4", color: "#DAC400" },
    { bgColor: "#FFF7ED", color: "#FF9417" },
    { bgColor: "#FFF0F0", color: "#F20917" },
    { bgColor: "#FFF0F0", color: "#A60000" },
  ];
  const SaveTag = () => {
    if (id) {
      let new_list = tagsList.filter((e) => {
        return e.id !== id;
      });

      setTagsList([...new_list, { id: id, ...tag }]);
    } else {
      setTagsList([...tagsList, { id: uuidv4(), ...tag }]);
    }
  };

  console.log("tagsList", tagsList);
  const EditTag = (key) => {
    setId(key);
    setTag(
      ...tagsList.filter((e) => {
        return e.id === key;
      })
    );
  };
  const DeleteTag = (key) => {
    setTagsList(
      tagsList.filter((e) => {
        return key !== e.id;
      })
    );
  };

  return (
    <TagsContainer>
      {!!tagsList.length ? (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              margin: "20px 0px 20px 0px",
            }}
          >
            <div style={{ textAlign: "left" }}>
              <h1 style={{ margin: "0px", fontSize: "20px" }}>Tags</h1>
              <p style={{ marginTop: "0px", fontSize: "14px " }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Button
                type="primary"
                className="add_button"
                onClick={() => setAddTag(true)}
              >
                Add Tag +
              </Button>
            </div>
          </div>
          <div style={{ height: "calc(100vh - 330px)" }}>
            {tagsList.map((data) => (
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
                <div
                  style={{
                    // width: "56px",
                    height: "20px",
                    borderRadius: "4px",
                    background: data.bgColor,
                    border: `1px solid ${data.color}`,
                    color: data.color,
                    padding: "1px 3px",
                  }}
                >
                  {data.tagName}
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Button
                    style={{ marginRight: "15px" }}
                    type="primary"
                    className="add_button"
                    onClick={() => {
                      setAddTag(true);
                      EditTag(data.id);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    type="primary"
                    className="add_button"
                    onClick={() => {
                      DeleteTag(data.id);
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
          {!!addTag && (
            <div
              style={{
                background: "#FFFFFF",
                border: "1px solid #745BE7",
                borderRadius: "9px",
                height: "81px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0px 20px",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column" }}>
                <h1
                  style={{
                    textAlign: "left",
                    fontSize: "14px",
                    fontWeight: "500",
                    margin: "0px",
                    marginBottom: "10px",
                  }}
                >
                  Tag Name
                </h1>
                <Input
                  placeholder="Enter Tag Name"
                  style={{ width: "110px" }}
                  value={tag.tagName}
                  onChange={(e) => setTag({ ...tag, tagName: e.target.value })}
                />
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <h1
                  style={{
                    textAlign: "left",
                    fontSize: "14px",
                    fontWeight: "500",
                    margin: "0px",
                    marginBottom: "10px",
                  }}
                >
                  Choose a color
                </h1>
                <div style={{ display: "flex", justifyContent: "flex-start" }}>
                  {colorData.map((data) => (
                    <div
                      className="color_div"
                      colorData
                      onClick={() =>
                        setTag({
                          ...tag,
                          color: data.color,
                          bgColor: data.bgColor,
                        })
                      }
                      style={{ background: data.color }}
                    />
                  ))}
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <Button
                  style={{ marginRight: "15px" }}
                  type="primary"
                  className="add_button"
                  onClick={() => {
                    setAddTag(false);
                    setTag({});
                    setId("");
                  }}
                >
                  Discard
                </Button>
                <Button
                  type="primary"
                  className="add_button"
                  onClick={() => {
                    SaveTag();
                    setAddTag(false);
                    setTag({});
                  }}
                >
                  Save
                </Button>
              </div>
            </div>
          )}
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
              <h1 style={{ margin: "0px", fontSize: "20px" }}>Tags</h1>
              <p style={{ marginTop: "0px", fontSize: "14px " }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Button
                type="primary"
                className="add_button"
                onClick={() => setAddTag(true)}
              >
                Add Tag +
              </Button>
            </div>
          </div>
          <div
            style={{
              height: "calc(100vh - 310px)",
              display: "flex",
              alignItems: "center",
              fontSize: "16px",
              justifyContent: "center",
              color: "#C0C0C0",
            }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
            quam est, porttitor at orci in,
          </div>
          {!!addTag && (
            <div
              style={{
                background: "#FFFFFF",
                border: "1px solid #745BE7",
                borderRadius: "9px",
                height: "81px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0px 20px",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column" }}>
                <h1
                  style={{
                    textAlign: "left",
                    fontSize: "14px",
                    fontWeight: "500",
                    margin: "0px",
                    marginBottom: "10px",
                  }}
                >
                  Tag Name
                </h1>
                <Input
                  style={{ width: "110px" }}
                  placeholder="Enter Tag Name"
                  value={tag.tagName}
                  onChange={(e) => setTag({ ...tag, tagName: e.target.value })}
                />
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <h1
                  style={{
                    textAlign: "left",
                    fontSize: "14px",
                    fontWeight: "500",
                    margin: "0px",
                    marginBottom: "10px",
                  }}
                >
                  Choose a color
                </h1>
                <div style={{ display: "flex", justifyContent: "flex-start" }}>
                  {colorData.map((data) => (
                    <div
                      className="color_div"
                      colorData
                      onClick={() =>
                        setTag({
                          ...tag,
                          color: data.color,
                          bgColor: data.bgColor,
                        })
                      }
                      style={{ background: data.color }}
                    />
                  ))}
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <Button
                  style={{ marginRight: "15px" }}
                  type="primary"
                  className="add_button"
                  onClick={() => {
                    setAddTag(false);
                    setTag({});
                    setId("");
                  }}
                >
                  Discard
                </Button>
                <Button
                  type="primary"
                  className="add_button"
                  onClick={() => {
                    SaveTag();
                    setAddTag(false);
                    setTag({});
                  }}
                >
                  Save
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </TagsContainer>
  );
};

export default Tags;
