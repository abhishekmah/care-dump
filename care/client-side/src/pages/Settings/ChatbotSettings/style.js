import styled from "styled-components";

export const ChatbotSettingsContainer = styled.div`
  .ant-tabs {
    padding: 0px 20px;
    border-radius: 5px 0px 0px 5px;
  }
  .link {
    color: #616161;
  }
  .ant-tabs-nav .ant-tabs-tab {
    width: 45%;
    height: 60px;
    display: flex;
    justify-content: center;
    color: #616161 !important;
    font-size: 16px !important;
    letter-spacing: 0.5px;
    font-weight: 600;
  }
  .ant-tabs-tab-active {
    color: #6f6fe1 !important;
  }
  .ant-tabs-ink-bar {
    height: 3px !important;
    background: #6f6fe1 !important;
  }
  .ant-tabs-tab-active .ant-tabs-tab-btn {
    color: #6f6fe1 !important;
  }
`;

export const FlowCustomizationContainer = styled.div`
  .ant-switch-checked {
    background: #008e27;
    &:hover {
      background: #008e27 !important;
    }
  }

  .violet_button {
    background: #745be7;
    &:hover {
      background: #745be7 !important;
    }
  }
`;
export const BusinessHoursContainer = styled.div`
  .ant-select-selector,
  .ant-select-arrow,
  .ant-select-selection-item,
  .ant-select-selection-placeholder {
    font-size: 16px !important;
    font-weight: 600 !important;
    color: #2e2c37 !important;
  }
  .add_button {
    background: #745be7;
    &:hover {
      background: #745be7 !important;
    }
  }
  .ant-switch-checked {
    background: #008e27;
    &:hover {
      background: #008e27 !important;
    }
  }

  .ant-select {
    width: 120px;
  }

  .ant-picker {
    height: 36px !important;
    margin: auto 10px;
  }

  .input {
    box-sizing: border-box;
    height: 112px !important;
    background: #ffffff;
    border: 1 px solid #d6d6d6;
    border-radius: 4px;
    word-wrap: break-word;
    white-space: pre-line;
    margin-bottom: 20px;

    ::-webkit-scrollbar {
      display: none;
    }
  }

  .datePicker {
    visibility: hidden;
    height: 0;
    padding: 0;
    width: 0;
    // position: absolute;
  }
  .ant-picker-dropdown {
    left: 0px !important;
  }
`;
export const QuickRepliesContainer = styled.div`
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
  .input_question {
    margin: 10px 0px 30px 0px;
    height: 36px;
  }
  .input_answer {
    margin: 10px 0px 30px 0px;
    height: 120px;
  }
`;
