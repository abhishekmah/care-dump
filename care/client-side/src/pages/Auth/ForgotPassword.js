import { Button, Form, Input } from "antd";
import { resetPasswordLink } from "../../utils/auth";
import { Link } from "react-router-dom";
import ImgContainer from "./ImgContainer";
import { AuthContainer, WarningContainer } from "./style";
import { useState } from "react";
import error from "./Images/error.svg";
import { useMediaQuery } from "react-responsive";

const ForgotPassword = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState({
    status: false,
    error_message: "",
  });
  const onFinish = (values) => {
    const data = { email: values.email };
    resetPasswordLink({ data, setIsSuccess, isError, setIsError });
  };
  const [form] = Form.useForm();
  const isMobile = useMediaQuery({
    query: "(max-width: 580px)",
  });

  return (
    <AuthContainer>
      <div
        className="pt-11 row1"
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
        }}
      >
        <div
          className="form"
          style={{ margin: "auto", width: isMobile ? "85%" : "473px" }}
        >
          <h1 className="heading">Reset Your Password</h1>
          {isSuccess ? (
            <>
              <p className="sub-heading" style={{ margin: "2px 0px 30px 0px" }}>
                <Link
                  to={"/sign-in"}
                  style={{
                    color: "#4C02FF",
                    fontSize: "18px",
                    textDecoration: "none",
                  }}
                >
                  Go back to Login
                </Link>
              </p>
              <div className="reset_link_message">
                <p className="sub-heading">
                  A password reset link has been sent to your email if such an
                  account exists.
                </p>
              </div>
            </>
          ) : (
            <>
              <p className="sub-heading" style={{ margin: "2px 0px 30px 0px" }}>
                <Link
                  to={"/sign-in"}
                  style={{
                    color: "#4C02FF",
                    fontSize: "18px",
                    textDecoration: "none",
                  }}
                >
                  Go back to Login
                </Link>
              </p>
              {isError?.status && (
                <WarningContainer>
                  <img className="ml-10" src={error} alt="" />
                  <p className="ml-10">{isError?.error_message}</p>
                </WarningContainer>
              )}
              <Form
                style={{ marginTop: "20px" }}
                form={form}
                requiredMark={false}
                name="forgot_password"
                onFinish={onFinish}
                scrollToFirstError
              >
                <Form.Item
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  name="email"
                  label={
                    <p>
                      Email <span style={{ color: "#FF0000" }}>*</span>
                    </p>
                  }
                  rules={[
                    {
                      type: "email",
                      message: "The input is not valid Email!",
                    },
                    {
                      required: true,
                      message: "Please input your Email!",
                    },
                  ]}
                >
                  <Input placeholder="Enter your email address here" />
                </Form.Item>

                <Button
                  className="form_button"
                  type="primary"
                  htmlType="submit"
                >
                  Send Reset Link
                </Button>
              </Form>
            </>
          )}
        </div>
        {!isMobile && <ImgContainer />}
      </div>
    </AuthContainer>
  );
};
export default ForgotPassword;
