import { Modal } from "antd";
import styled from "styled-components";

export const DashboardContainer = styled.div`
  * {
    font-family: "SF Pro Display" !important;
  }
  width: 100%;
  // height: calc(100vh - 18px);
  // height: 100vh;
`;
export const NavbarContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  height: 62px;
`;
export const ChatsContainer = styled.div`
  height: 1000px;
`;
export const MessageContainer = styled.div`
  // left: 373px;
  // top: 202px;
  background: #e9e2d5;
  height: 1000px;
  // ::-webkit-scrollbar {
  //   display: none;
  // }
`;
export const MessageDiv = styled.div`
  justify-content: ${(props) => (props.isYours ? "flex-end" : "flex-start")};
  display: flex;
  margin: 5px 16px;
`;

export const Message = styled.div`
  background: ${(props) => (props.isYours ? "#daf8cb" : "white")};
  max-width: 50%;
  text-align: left;
  overflow-wrap: break-word;
  // overflow: scroll;
  color: #303030;
  padding: 8px 10px;
  font-size: 14px;
  border-radius: 5px;
`;
export const InboxContainer = styled.div`
  .modal_active {
    opacity: 0.5;
  }

  .animated-div {
    width: 0px;
    transition: width 0.5s;
  }

  .animated-div .open {
    width: 353px;
  }

  .height_full {
    // height: 100% !important;
    height: calc(100vh - 74px) !important;
  }

  .user_details_bar {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-bottom: 10px;
    background: #ffffff;
    border-radius: 0px;

    .user_details {
      width: 70px;
      margin: 5px 0px 0px 14px;
      display: flex;
      flex-direction: column;
      align-items: baseline;
      text-align: left;
    }
  }

  .name {
    width: 40.5px;
    height: 40.5px;
    left: 397px;
    top: 142px;
    border-radius: 20px;
    background: #6f6fe1;
  }
  .icon {
    display: flex;
    margin-left: 17px;
    margin-top: 14px;
  }
  .font-style {
    width: 131px;
    height: 19px;
    font-style: normal;
    font-weight: 590;
    font-size: 15.75px;
    line-height: 19px;
    letter-spacing: 0.02em;
    text-transform: capitalize;
    color: #20204f;
    margin-top: 4px;
  }
  .input {
    box-sizing: border-box;
    width: 100%;
    height: 87px !important;
    background: #ffffff;
    border: none;
    border-radius: 4px;
    word-wrap: break-word;
    white-space: pre-line;

    ::-webkit-scrollbar {
      display: none;
    }
  }

  .button {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 11px 24px;
    gap: 10px;
    width: 77.24px;
    height: 34px;
    background: #5757d0;
    border-radius: 6px;
    margin-top: 3px;
  }
  .outer_box {
    position: sticky;
    bottom: 0;
    padding: 12px;
    background: #ffffff;
  }
  .inner_box {
    border: 1px solid #ccd3de;
    border-radius: 4px;
  }
  .footer {
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    border-radius: 0px 0px 4px 4px;
    background: #f2f2f2;
    padding: 7px 10px;
    border-top: 1px solid #ccd3de;
    align-items: center;
  }

  .text-container {
    display: flex;
    gap: 16px;
    box-sizing: border-box;
    height: 36px;
    left: 383px;
    top: 741.55px;
    align-items: center;
    justify-content: start;
  }
`;

export const CustomerDetailsContainer = styled.div`
  border-left: 1px solid #ececec;

  .ant-input-affix-wrapper {
    margin-bottom: 19px;
  }
  .ant-tabs {
    padding: 0px 20px;
    background: #ffff;
    border-radius: 5px 0px 0px 5px;
  }
  .ant-tabs-nav-list {
    width: 100%;
  }

  .ant-tabs-nav .ant-tabs-tab {
    width: 43%;
    height: 60px;
    display: flex;
    justify-content: center;
    color: #6f6fe1;
    font-size: 16px !important;
  }
  .ant-tabs-ink-bar {
    height: 3px !important;
    background: #6f6fe1 !important;
  }
  .ant-tabs-tab-btn {
    color: #6f6fe1 !important;
  }
  .ant-tabs-content-holder {
    color: #002659;
  }
`;
export const AllChatsContainer = styled.div`
  ::-webkit-scrollbar {
    display: none;
  }

  .ant-tabs-nav {
    position: sticky;
    top: 0;
    z-index: 2;
    background: white;
  }

  .ant-input-affix-wrapper {
    margin-bottom: 19px;
  }
  .ant-tabs {
    background: #ffff;
    border-radius: 5px 0px 0px 5px;
  }
  .ant-tabs-ink-bar {
    height: 3px !important;
    background: #6f6fe1 !important;
  }
  .ant-tabs-nav-list {
    width: 100%;
    padding: 0px 10px;
  }
  .ant-tabs-nav .ant-tabs-tab {
    width: 13%;
    height: 60px;
    display: flex;
    justify-content: center;
  }
`;
export const CustomModal = styled(Modal)`
  .ant-modal-content {
    padding-bottom: 40px;
  }
  .button {
    width: 144px;
    height: 32px;
    background: #745be7;
    &:hover {
      background: #745be7 !important;
    }
    border-radius: 4px;
    border: 0px;
    font-weight: 600;
    font-size: 14px;
    color: #ffffff;
  }
`;
