import { Button, Table } from "antd";
import React from "react";
import { UsersAndPermissionsContainer } from "./style";

const UsersAndPermissions = () => {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
  ];
  const data = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: ["nice", "developer"],
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: ["loser"],
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sydney No. 1 Lake Park",
      tags: ["cool", "teacher"],
    },
  ];

  return (
    <UsersAndPermissionsContainer>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "20px 0px 20px 0px",
        }}
      >
        <div style={{ textAlign: "left" }}>
          <h1 style={{ margin: "0px", fontSize: "20px" }}>
            Users and permissions
          </h1>
          <p style={{ marginTop: "0px", fontSize: "14px " }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Button
            type="primary"
            className="add_button"
            // onClick={() => setAddTag(true)}
          >
            Add Team Member +
          </Button>
        </div>
      </div>
      <Table columns={columns} dataSource={data} pagination={false} />
    </UsersAndPermissionsContainer>
  );
};

export default UsersAndPermissions;
