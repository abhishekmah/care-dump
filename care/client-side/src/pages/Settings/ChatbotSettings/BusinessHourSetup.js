import { Button, DatePicker, Select, Switch, TimePicker } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { BusinessHoursContainer } from "./style";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";
import addButton from "../Images/addButton.svg";

const BusinessHourSetup = () => {
  const [awayMessage, setAwayMessage] = useState("");
  const [holidayList, setHolidayList] = useState([]);
  const [holidayValue, setHolidayValue] = useState("");
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const onStartTimeChange = (time, id) => {
    let new_list = businessHourSetupList.map((e) => {
      if (e.id === id) {
        e.start_time = time.format("HH:mm");
      }
      return e;
    });

    setBusinessHourSetupList(new_list);
  };
  const onEndTimeChange = (data) => {};
  const onStatusChange = (id, checked) => {
    let new_list = businessHourSetupList.map((e) => {
      if (e.id === id) {
        e.status = checked;
      }
      return e;
    });

    setBusinessHourSetupList(new_list);
  };

  const onDateChange = (dateString) => {
    setHolidayList([
      ...holidayList,
      {
        id: uuidv4(),
        date: dateString.$d.toLocaleDateString("en-US", {
          day: "numeric",
          year: "numeric",
          month: "short",
        }),
      },
    ]);
    setHolidayValue("");
    setDatePickerOpen(false);
  };
  const DeleteHoliday = (key) => {
    setHolidayList(
      holidayList.filter((e) => {
        return key !== e.id;
      })
    );
  };
  const changeAddOfficeHourData = (data, key) => {
    setAddOfficeHourData({ ...addOfficeHourData, [key]: data });
  };

  const [businessHourSetupList, setBusinessHourSetupList] = useState([
    {
      id: 0,
      day: "Monday",
      start_time: "18.30",
      end_time: "16.30",
      total_hours: "08h 30m",
      status: true,
    },
    {
      id: 1,
      day: "Tuesday",
      start_time: "18.30",
      end_time: "16.30",
      total_hours: "08h 30m",
      status: true,
    },
    {
      id: 2,
      day: "Wednesday",
      start_time: "18.30",
      end_time: "16.30",
      total_hours: "08h 30m",
      status: false,
    },
    {
      id: 3,
      day: "Thursday",
      start_time: "18.30",
      end_time: "16.30",
      total_hours: "08h 30m",
      status: false,
    },
    {
      id: 4,
      day: "Friday",
      start_time: "18.30",
      end_time: "16.30",
      total_hours: "08h 30m",
      status: false,
    },
    {
      id: 5,
      day: "Saturday",
      start_time: "18.30",
      end_time: "16.30",
      total_hours: "08h 30m",
      status: false,
    },
    {
      id: 6,
      day: "Sunday",
      start_time: "18.30",
      end_time: "16.30",
      total_hours: "08h 30m",
      status: false,
    },
  ]);
  const [addOfficeHourData, setAddOfficeHourData] = useState({});
  console.log(
    "addOfficeHourData",
    addOfficeHourData,
    "businessHourSetupList",
    businessHourSetupList
  );

  const resetAddOfficeHourData = () => {
    setAddOfficeHourData({
      id: businessHourSetupList.length + 1,
      day: "",
      start_time: "18.30",
      end_time: "16.30",
      total_hours: "08h 30m",
      status: false,
    });
  };
  useEffect(() => {
    resetAddOfficeHourData();
  }, []);

  const addOfficeHour = () => {
    setBusinessHourSetupList([...businessHourSetupList, addOfficeHourData]);
    resetAddOfficeHourData();
  };

  return (
    <BusinessHoursContainer>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <div style={{ textAlign: "left" }}>
          <h1 style={{ margin: "0px", fontSize: "20px" }}>
            Set Standard Hours
          </h1>
          <p style={{ marginTop: "0px", fontSize: "14px " }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
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
              //   setAddTag(false);
              //   setTag({});
              //   setId("");
            }}
          >
            Discard
          </Button>
          <Button
            type="primary"
            className="add_button"
            onClick={() => {
              //   SaveTag();
              //   setAddTag(false);
              //   setTag({});
            }}
          >
            Save
          </Button>
        </div>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "60% 30%",
          gridGap: "10%",
        }}
      >
        <div>
          {businessHourSetupList.map((data) => (
            <div
              key={data.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                height: "56px",
                borderRadius: "10px",
                background: "#FFFFFF",
                padding: "0px 20px",
                marginBottom: "10px",
              }}
            >
              <div style={{ width: "60px" }}>
                <h1 style={{ fontSize: "16px", textAlign: "left" }}>
                  {data.day}
                </h1>
              </div>
              <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                <TimePicker
                  format="HH:mm"
                  onChange={(e) => onStartTimeChange(e, data.id)}
                  //   value={moment(data.start_time, "HH:mm")}
                  defaultValue={moment("18.30", "HH:mm")}
                />
                <p style={{ fontSize: "16px" }}>To</p>
                <TimePicker
                  defaultValue={moment(data.end_time, "HH:mm")}
                  onChange={(e) => onEndTimeChange(e)}
                  format="HH:mm"
                />
              </div>
              <h1 style={{ fontSize: "16px", fontWeight: 500 }}>
                {data.total_hours}
              </h1>
              <Switch
                defaultChecked={data.status}
                onChange={(e) => onStatusChange(data.id, e)}
              />
            </div>
          ))}

          <div
            style={{
              margin: "35px 0px 15px 0px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <h1 style={{ margin: "0px", fontSize: "20px" }}>
              Add more office hours
            </h1>
            <div
              style={{
                cursor: "pointer",
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
              onClick={addOfficeHour}
            >
              <span
                style={{
                  fontSize: "16px",
                  textAlign: "left",
                  color: "#7062DF",
                }}
              >
                Add
              </span>
              <img style={{ marginLeft: "5px" }} src={addButton} alt="" />
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              height: "56px",
              borderRadius: "10px",
              background: "#FFFFFF",
              padding: "0px 20px",
              marginBottom: "10px",
            }}
          >
            <div style={{ width: "60px" }}>
              <Select
                value={addOfficeHourData.day || "Select Day"}
                placeholder="Select Day"
                onChange={(e) => changeAddOfficeHourData(e, "day")}
              >
                {businessHourSetupList.map((data) => (
                  <Select.Option key={data.day}>{data.day}</Select.Option>
                ))}
              </Select>
            </div>
            <div style={{ display: "flex", justifyContent: "space-evenly" }}>
              <TimePicker
                format="HH:mm"
                onChange={(e) => changeAddOfficeHourData(e, "start_time")}
                value={moment(addOfficeHourData?.start_time, "HH:mm")}
                // defaultValue={moment("18.30", "HH:mm")}
              />
              <p style={{ fontSize: "16px" }}>To</p>
              <TimePicker
                format="HH:mm"
                onChange={(e) => changeAddOfficeHourData(e, "end_time")}
                // defaultValue={moment(addOfficeHourData?.end_time, "HH:mm")}
                value={moment(addOfficeHourData?.end_time, "HH:mm")}
              />
            </div>
            <h1 style={{ fontSize: "16px", fontWeight: 500 }}>
              {addOfficeHourData?.total_hours}
            </h1>
            <Switch
              checked={addOfficeHourData?.status}
              defaultChecked={addOfficeHourData?.status}
              onChange={(e) => changeAddOfficeHourData(e, "status")}
            />
          </div>
        </div>

        <div>
          <h1 style={{ fontSize: "16px", textAlign: "left" }}>Away Message</h1>
          <TextArea
            className="input"
            placeholder="Type your message here"
            value={awayMessage}
            onChange={(e) => setAwayMessage(e.target.value)}
            // onPressEnter={(e) => {
            //   e.preventDefault();
            // }}
          />

          <h1 style={{ fontSize: "16px", textAlign: "left" }}>
            Upcoming Holidays
          </h1>
          {!holidayList.length ? (
            <p>No Holidays Added.</p>
          ) : (
            holidayList.map((data) => (
              <div
                key={data.id}
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <p>{data.date}</p>
                <Button
                  type="primary"
                  className="add_button"
                  onClick={() => {
                    DeleteHoliday(data.id);
                  }}
                >
                  Delete
                </Button>
              </div>
            ))
          )}
          <div
            style={{
              cursor: "pointer",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
            onClick={() => {
              if (!datePickerOpen) {
                setDatePickerOpen(true);
              } else {
                setDatePickerOpen(false);
              }
            }}
          >
            <span
              style={{
                fontSize: "16px",
                textAlign: "left",
                color: "#7062DF",
              }}
            >
              Add Holidays
            </span>
            <img style={{ marginLeft: "5px" }} src={addButton} alt="" />
          </div>
          <DatePicker
            showToday={false}
            value={holidayValue !== "" ? dayjs(holidayValue) : null}
            className="datePicker"
            placement="bottomLeft"
            open={datePickerOpen}
            style={{ display: "hidden" }}
            onChange={(e) => {
              onDateChange(e);
            }}
          />
        </div>
      </div>
    </BusinessHoursContainer>
  );
};

export default BusinessHourSetup;
