import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Button, Checkbox, Form, Input, message } from "antd";
import { setUser } from "../redux/features/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [messageApi, contextHolder] = message.useMessage();
  const onFinish = (values) => {
    const user = {};
    user.user_name = values.username;
    user.password = values.password;
    console.log(user);
    axios
      .post("http://localhost:9000/api/account/login", user)
      .then(function (response) {
        console.log(response);
        if (response.data.StatusCode == 200) {
          message.success("Login successful", 5);
          dispatch(setUser(response.data.Data.UserInfo));
          navigate(`/discover`);
        } else {
          message.error("Login failed, check your username or password", 5);
        }
      })
      .catch(function (error) {
        console.log(error);
        message.error("Error", 5);
      });
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
