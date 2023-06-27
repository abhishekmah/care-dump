import { Button, Form, Input } from "antd";
import { resetPasswordCare } from "../../utils/auth";
import ImgContainer from "./ImgContainer";
import { AuthContainer, WarningContainer } from "./style";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import error from "./Images/error.svg";
import { useMediaQuery } from "react-responsive";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState({ status: false, message: "" });
  const [isPasswordMatchedError, setIsPasswordMatchedError] = useState(false);

  var url = window.location;
  var access_token = new URLSearchParams(url.search).get("token");
  localStorage.setItem("jwt_token", access_token);

  const TokenValidation = async (token) => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_CARE_WIGZO_URL}/validate-token?token=${token}`
      );

      if (response?.status === 200) {
        setIsLoading(false);
        setIsError(false);
      }
    } catch (err) {
      setIsLoading(false);
      setIsError(true);
    }
  };
  useEffect(() => {
    TokenValidation(access_token);
  }, [access_token]);

  const onFinish = (values) => {
    if (values.password === values.re_password) {
      const data = { password: values.password, token: access_token };
      resetPasswordCare(data, navigate);
    } else {
      // notification.error({ message: "both password should match each other." });
      setIsPasswordMatchedError(true);
    }
  };
  const [form] = Form.useForm();
  const isMobile = useMediaQuery({
    query: "(max-width: 580px)",
  });

  return (
    <AuthContainer>
      {isLoading ? (
        <>loading....</>
      ) : (
        <div
          className="pt-11 row1"
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          }}
        >
          {isError ? (
            <div
              className="form"
              style={{ margin: "auto", width: isMobile ? "85%" : "473px" }}
            >
              <h1 className="heading">Link Expired</h1>
              {!isMobile && (
                <p
                  className="sub-heading"
                  style={{ margin: "2px 0px 30px 0px" }}
                >
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
              )}
              <p className="sub-heading" style={{ marginTop: "20px" }}>
                To reset your password, return to the login page and select
                "Forgot Your Password" to send a new email.
              </p>
            </div>
          ) : (
            <div
              className="form"
              style={{ margin: "auto", width: isMobile ? "85%" : "473px" }}
            >
              <h1 className="heading">Reset Your Password</h1>
              {isPasswordMatchedError && (
                <WarningContainer style={{ marginTop: "8px" }}>
                  <img className="ml-10" src={error} alt="" />
                  <p className="ml-10">Password entered do not match.</p>
                </WarningContainer>
              )}
              <Form
                style={{ marginTop: "20px" }}
                form={form}
                requiredMark={false}
                name="reset_password"
                onFinish={onFinish}
                scrollToFirstError
              >
                <Form.Item
                  label={
                    <p>
                      Enter Your Password Here
                      <span style={{ color: "#FF0000" }}>*</span>
                    </p>
                  }
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  name="password"
                  rules={[
                    {
                      pattern:
                        /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
                      message: (
                        <>
                          Password should contain at least :-
                          <ul style={{ margin: "0px", paddingLeft: "18px" }}>
                            <li>One number</li>
                            <li>One special character</li>
                            <li>
                              Length of password should be at least 8
                              characters.
                            </li>
                          </ul>
                        </>
                      ),
                    },
                    {
                      required: true,
                      message: "Please enter your Password !",
                    },
                  ]}
                >
                  <Input.Password placeholder="Enter your password here" />
                </Form.Item>
                <Form.Item
                  label={
                    <p>
                      Re-enter Password
                      <span style={{ color: "#FF0000" }}>*</span>
                    </p>
                  }
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  name="re_password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Password!",
                    },
                  ]}
                >
                  <Input placeholder="Re-enter password" />
                </Form.Item>

                <Button
                  className="form_button"
                  type="primary"
                  htmlType="submit"
                >
                  Reset Your Password
                </Button>
              </Form>
            </div>
          )}

          {!isMobile && <ImgContainer />}
        </div>
      )}
    </AuthContainer>
  );
};
export default ResetPassword;
