import { Button, Checkbox, Form, Input } from "antd";
import { register } from "../../utils/auth";
import { Link, useNavigate } from "react-router-dom";
import ImgContainer from "./ImgContainer";
import { AuthContainer, WarningContainer } from "./style";
import { useState } from "react";
import error from "./Images/error.svg";
import { useMediaQuery } from "react-responsive";

const SignUp = () => {
  const [isError, setIsError] = useState({ status: false, error_message: "" });
  const [isErrorTnc, setIsErrorTnc] = useState("");
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [checked, setChecked] = useState(false);
  const onChange = (e) => {
    setChecked(e.target.checked);
    setIsErrorTnc(false);
  };
  const isMobile = useMediaQuery({
    query: "(max-width: 580px)",
  });
  const onFinish = (values) => {
    if (checked) {
      const data = {
        name: values.name,
        email: values.email,
        // phone: values.phone,
        password: values.password,
        orgName: values.orgName,
        orgDomain: values.orgDomain,
      };
      register({ data, isError, setIsError, navigate });
    } else {
      setIsErrorTnc(true);
    }
  };
  return (
    <AuthContainer type={"signup"}>
      <div
        className=" row1"
        style={{
          padding: "0px 7vw",
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
        }}
      >
        <div
          className="form"
          style={{
            margin: "auto",
            width: isMobile ? "85%" : "473px",
          }}
        >
          <h1 style={{ margin: "0px" }} className="heading">
            Sign Up
          </h1>
          <h1 className="sub-heading">Enter your details below</h1>
          {isError?.status && (
            <WarningContainer>
              <img className="ml-10" src={error} alt="" />
              <p className="ml-10">
                {isError?.error_message}
                {/* User already registered. */}
              </p>
            </WarningContainer>
          )}
          <Form
            form={form}
            name="register"
            onFinish={onFinish}
            requiredMark={false}
            scrollToFirstError
            style={{ marginTop: "25px" }}
          >
            <Form.Item
              name="name"
              label={
                <p>
                  Full Name <span style={{ color: "#FF0000" }}>*</span>
                </p>
              }
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "Please input your Name!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="email"
              label={
                <p>
                  Work Email Address
                  <span style={{ color: "#FF0000" }}>*</span>
                </p>
              }
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
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
              <Input />
            </Form.Item>

            {/* <Form.Item
                name="phone"
                label={
                  <p>
                    Phone
                    <span style={{ color: "#FF0000" }}>*</span>
                  </p>
                }
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[
                  {
                    pattern: new RegExp(
                      "^(\\+91[\\-\\s]?)?[0]?(91)?[6789]\\d{9}$",
                      "gm"
                    ),
                    message: "Please enter a valid phone number",
                  },
                  {
                    required: true,
                    message: "Please input your phone!",
                  },
                ]}
              >
                <Input />
              </Form.Item> */}

            <Form.Item
              name="password"
              label={
                <p>
                  Set Your Password
                  <span style={{ color: "#FF0000" }}>*</span>
                </p>
              }
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
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
                          Length of password should be at least 8 characters.
                        </li>
                      </ul>
                    </>
                  ),
                },
                {
                  required: true,
                  message: "Please enter your password !",
                },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="orgName"
              label={
                <p>
                  Organization Name
                  <span style={{ color: "#FF0000" }}>*</span>
                </p>
              }
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "Please input your Organization Name!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="orgDomain"
              label={
                <p style={{ fontSize: "18px" }}>
                  Your Website URL
                  <span style={{ color: "#FF0000" }}>*</span>
                </p>
              }
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "Please input your Website URL!",
                },
                {
                  type: "url",
                  message: "This field must be a valid url.",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Checkbox name="accept_t&c" checked={checked} onChange={onChange}>
              Accept{"  "}
              <span
                style={{
                  color: "#4C02FF",
                  fontWeight: 400,
                  fontSize: "18px",
                }}
              >
                terms and conditions.
              </span>
            </Checkbox>

            {isErrorTnc && (
              <WarningContainer style={{ margin: "10px 0px 0px 0px" }}>
                <img className="ml-10" src={error} alt="" />
                <p className="ml-10">Please accept the terms & conditions.</p>
              </WarningContainer>
            )}

            <Button className="form_button" type="primary" htmlType="submit">
              Register
            </Button>
            <h1
              style={{ margin: "0px", fontSize: "17px", textAlign: "left" }}
              className="sub-heading"
            >
              Already have an account?{"  "}
              <Link
                style={{
                  color: "#4C02FF",
                  fontWeight: 400,
                  fontSize: "18px",
                  textDecoration: "none",
                }}
                to="/sign-in"
              >
                Log in
              </Link>
            </h1>
          </Form>
        </div>
        {!isMobile && <ImgContainer />}
      </div>
    </AuthContainer>
  );
};
export default SignUp;
