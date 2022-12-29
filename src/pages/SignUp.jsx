import React from "react";
import {
  Button,
  Checkbox,
  Form,
  Input,
  Select,
  DatePicker,
  message,
} from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = {
    user_name: null,
    password: null,
    full_name: null,
    dob: null,
    email: null,
    address: "HA NOI",
    gender: 1,
    admin: false,
    active: true,
    image:
      "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=",
    role_code: "01",
    created_at: null,
    updated_at: null,
    deleted_at: null,
  };
  const onFinish = (values) => {
    user.user_name = values.username;
    user.password = values.password;
    user.full_name = values.fullname;
    user.email = values.email;
    user.gender = values.gender;
    user.dob = values.dob.format("YYYY-MM-D");
    console.log(user);
    axios
      .post("http://localhost:9000/api/account/register", user)
      .then(function (response) {
        console.log(response);
        if (response.data.StatusCode == 200) {
          message.success("Register successful", 5);
          navigate(`/login`);
        } else {
          message.error("Register failed", 5);
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
        name="basic"
        labelCol={{
          span: 6,
        }}
        wrapperCol={{
          span: 16,
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
          tooltip="What do you want others to call you?"
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
          name="email"
          label="E-mail"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your E-mail!",
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
          name="confirm"
          label="Confirm Password"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The two passwords that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          className="text-white"
          label="Full name"
          name="fullname"
          rules={[
            {
              required: true,
              message: "Please input your Fullname!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          className="text-white"
          label="Birth"
          name="dob"
          rules={[
            {
              required: true,
              message: "Please input your date of birth",
            },
          ]}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          name="gender"
          label="Gender"
          rules={[{ required: true, message: "Please select gender!" }]}
        >
          <Select placeholder="select your gender">
            <Option value="1">Male</Option>
            <Option value="2">Female</Option>
            <Option value="3">Other</Option>
          </Select>
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button
            className="text-green-500 hover:text-green-500"
            htmlType="submit"
            size="large"
          >
            Sign Up
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default SignUp;
