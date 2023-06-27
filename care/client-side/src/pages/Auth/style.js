import styled from "styled-components";
import backgroundImg from "./Images/backgroundImg.png";

export const WarningContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 37px;
  background: #fff2f2;
  margin-bottom: 10px;
  border-radius: 8px;
  color: #ff2222;

  .ml-10 {
    margin-left: 10px;
  }
`;

export const AuthContainer = styled.div`
  * {
    font-family: "SF Pro Display" !important;
  }

  background-image: url(${backgroundImg});
  background-repeat: no-repeat;
  background-size: cover;
  margin: auto;
  height: 100vh;
  overflow-y: scroll;

  .row1 {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
  .p_img {
    font-weight: 400;
    font-size: 20px;
  }
  .pt-11 {
    padding: 20px;
  }

  .form {
    width: 473px;
    padding: ${(props) => (props.type === "signup" ? "5% 8%" : "8%")};
    color: #000000;
    text-align: left;
    border-radius: 10px;
    background: #ffffff !important;

    .ant-form-item-explain-error {
      color: #ff2222;
    }

    .reset_link_message {
      width: auto;
      padding-left: 0px;
    }

    .ant-checkbox-inner {
      width: 18px;
      height: 18px;
      border: 1px solid #6a6a6a;
      border-radius: 2px;
      margin-top: 2px;
    }
    .ant-form-item-required {
      font-style: normal;
      font-weight: 500;
      font-size: 18px;
    }

    .ant-checkbox-wrapper {
      font-weight: 600;
      color: #565656;
      font-size: 16px;
    }
    .ant-input {
      height: ${(props) => (props.type === "signup" ? "48px" : "54px")};
      border-radius: 0px;
    }
    .ant-input-affix-wrapper {
      padding: 0px 11px;
    }
    .ant-input-affix-wrapper {
      height: ${(props) => (props.type === "signup" ? "50px" : "56px")};
      border-radius: 0px !important;
    }
    .heading {
      font-weight: 500;
      font-size: 26px;
      margin: 0px;
    }
    .sub-heading {
      font-weight: 400;
      margin: 10px 0px 15px 0px;
      font-weight: 400;
      font-size: 18px;
    }
  }

  .form_button {
    background: #4c02ff;
    font-size: 19px;
    width: 100%;
    height: 52px;
    border-radius: 0px;
    margin-bottom: 10px;
    margin-top: 25px;
  }

  .img_div {
    width: 349px;
    color: #ffff;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;
