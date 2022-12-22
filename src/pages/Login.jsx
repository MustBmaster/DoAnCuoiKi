import React from "react";
import { NavLink } from "react-router-dom";
import { Button, Checkbox, Form, Input } from "antd";
const Login = () => {
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="pt-8 text-white">
      <h2 className="font-bold text-3xl text-white text-left">
        Welcome to Minh's Spotify
      </h2>
      <br />
      <Form
        theme="dark"
        name="basic"
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          className="text-white"
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          className="text-white"
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 4,
            span: 14,
          }}
        >
          <div className="flex-row justify-between">
            <Checkbox>Remember me</Checkbox>
            <NavLink
              key="ForgetPassword"
              to="/forgetpassword"
              className="items-center text-sm font-medium text-white px-10 hover:underline"
            >
              Forget password
            </NavLink>
          </div>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button
            className="text-green-500 hover:text-green-500 bg-green-500"
            htmlType="submit"
            size="large"
          >
            Login
          </Button>
          <Button className=" mx-3" size="large">
            <NavLink
              key="Signup"
              to="/signup"
              className="flex flex-row justify-start items-center text-sm font-medium text-white"
            >
              Sign Up
            </NavLink>
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default Login;
