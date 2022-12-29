import React from "react";
import dayjs from "dayjs";
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
const UserProfile = () => {
  const { userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(userInfo);

  const dateFormat = (value) => {
    const validDate = new Date(value);
    var dd = String(validDate.getDate()).padStart(2, "0");
    var mm = String(validDate.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = validDate.getFullYear();
    return yyyy + "-" + mm + "-" + dd;
  };

  const onFinish = (values) => {
    const payload = {
      full_name: values.fullname,
      gender: values.gender,
      dob: values.dob.format("YYYY-MM-DD"),
    };
    console.log(payload);
    axios
      .post("http://localhost:9000/api/account/" + userInfo._id, payload)
      .then(function (response) {
        console.log(response);
        if (response.data.StatusCode == 200) {
          message.success("Infomation updated", 5);
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
        {userInfo.full_name}'s profile
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
          initialValue={userInfo.user_name}
        >
          <Input
            disabled={true}
            style={{ background: "white", color: "black" }}
          />
        </Form.Item>

        <Form.Item name="email" label="E-mail" initialValue={userInfo.email}>
          <Input
            disabled={true}
            style={{ background: "white", color: "black" }}
          />
        </Form.Item>

        {/* <Form.Item
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
        </Form.Item> */}

        {/* <Form.Item
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
        </Form.Item> */}

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
          initialValue={userInfo.full_name}
        >
          <Input />
        </Form.Item>
        <Form.Item
          className="text-white"
          label="Birth"
          name="dob"
          initialValue={dayjs(dateFormat(new Date(userInfo.dob)))}
          rules={[
            {
              required: true,
              message: "Please input your date of birth",
            },
          ]}
        >
          <DatePicker
            style={{ width: "100%" }}
            defaultValue={dayjs(dateFormat(new Date(userInfo.dob)))}
          />
        </Form.Item>
        <Form.Item
          name="gender"
          label="Gender"
          rules={[{ required: true, message: "Please select gender!" }]}
          initialValue={userInfo.gender}
        >
          <Select
            placeholder="select your gender"
            defaultValue={userInfo.gender}
          >
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
            Save
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default UserProfile;
