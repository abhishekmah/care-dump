import { Button, Form, Input } from "antd";
import { signIn } from "../../utils/auth";
import { Link, useNavigate } from "react-router-dom";
import ImgContainer from "./ImgContainer";
import { AuthContainer, WarningContainer } from "./style";
import error from "./Images/error.svg";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useDispatch } from "react-redux";

const Login = () => {
  const dispatch = useDispatch();
  let data;
  const [isError, setIsError] = useState({ status: false, error_message: "" });
  const navigate = useNavigate();

  const onFinish = (values) => {
    data = {
      userName: values.email,
      password: values.password,
    };
    signIn({ data, isError, setIsError, navigate, dispatch });
  };
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
          <h3 className="heading">Login</h3>
          <h4 className="sub-heading">
            Don't have a account?
            <Link
              style={{ color: "#4C02FF", textDecoration: "none" }}
              to="/sign-up"
            >
              {" "}
              Create an account
            </Link>
          </h4>
          {isError?.status && (
            <WarningContainer>
              <img className="ml-10" src={error} alt="" />
              <p className="ml-10">
                {isError?.error_message}
                {/* Invalid email or password. Please try again. */}
              </p>
            </WarningContainer>
          )}
          <Form
            name="login"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            style={{
              maxWidth: 600,
              marginTop: "15px",
            }}
            initialValues={{
              remember: true,
            }}
            requiredMark={false}
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              label={
                <p>
                  Email <span style={{ color: "#FF0000" }}>*</span>
                </p>
              }
              name="email"
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
              {/* <img
                  src="https://media.istockphoto.com/id/1314841909/vector/asterisk-icon-asterisk-sign-flat-icon-of-asterisk-isolated-on-white-background-vector.jpg?s=612x612&w=0&k=20&c=Bki3kVWMOdKHJwX2ITR5-75QBcIthJSu8rgoOcynuYo="
                  alt=""
                  width="5px"
                  height="5px"
                /> */}
              <Input />
            </Form.Item>
            <Form.Item
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              label={
                <p>
                  Password <span style={{ color: "#FF0000" }}>*</span>
                </p>
              }
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please enter your password !",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Link
                to="/forgot-password"
                style={{
                  fontSize: "16px",
                  textAlign: "right",
                  marginTop: "-20px",
                  color: "#909090",
                  textDecoration: "underline",
                }}
              >
                Forgot Password
              </Link>
            </div>
            {/* <Form.Item
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                name="remember"
                valuePropName="checked"
              >
                <Checkbox style={{ fontWeight: 500, fontSize: "18px" }}>
                  Remember me
                </Checkbox>
              </Form.Item> */}
            <Button className="form_button" type="primary" htmlType="submit">
              Login
            </Button>
          </Form>
        </div>
        {!isMobile && <ImgContainer />}
      </div>
    </AuthContainer>
  );
};
export default Login;
