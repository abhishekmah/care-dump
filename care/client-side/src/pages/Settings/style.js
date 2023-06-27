import styled from "styled-components";

export const UsersAndPermissionsContainer = styled.div`
  .add_button {
    background: #745be7;
    &:hover {
      background: #745be7 !important;
    }
  }
`;
export const SettingsContainer = styled.div`
  * {
    font-family: "SF Pro Display" !important;
  }
  width: 100%;
  background: #f4f4f4;

  .ant-menu {
    border-radius: 10px;
  }
  .ant-menu-submenu-title {
    color: #5c566f !important;
    font-size: 16px;
    font-weight: 600;
    padding-left: 41px !important;
  }
  .ant-menu-submenu-active {
    background: #ffffff;
  }
  .ant-menu-title-content {
    text-align: left;
    font-size: 16px;
  }
  .ant-menu-item {
    margin: auto;
    width: 217px !important;
    border-radius: 20px;
  }
  .ant-menu-item-active {
    margin: auto;
    width: 217px !important;
    border-radius: 20px;
  }
  .ant-menu-item-selected {
    margin: auto;
    background: #7f70c5;
    color: #ffffff;
    width: 217px !important;
    border-radius: 20px;
    padding-left: 0px;
  }
`;

export const CannedResponsesContainer = styled.div`
  .add_button {
    background: #745be7;
    &:hover {
      background: #745be7 !important;
    }
  }
  .textbox_heading {
    margin: 0px;
    font-size: 16px;
  }
  .input_keyword {
    margin: 10px 0px 30px 0px;
    height: 36px;
  }
  .input_response {
    margin: 10px 0px 30px 0px;
    height: 120px;
  }
`;

export const TagsContainer = styled.div`
  .add_button {
    background: #745be7;
    &:hover {
      background: #745be7 !important;
    }
  }
  .textbox_heading {
    margin: 0px;
    font-size: 16px;
  }
  .input_keyword {
    margin: 10px 0px 30px 0px;
    height: 36px;
  }
  .input_response {
    margin: 10px 0px 30px 0px;
    height: 120px;
  }
  .color_div {
    height: 27px;
    width: 27px;
    // border: 1px solid black;
    margin-right: 4px;
    cursor: pointer;
    border-radius: 30px;
  }
`;
