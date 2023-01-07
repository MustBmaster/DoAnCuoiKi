import React from "react";
import { Button, Form, Input, notification, message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
notification.config({
  maxCount: 1,
  // placement,
});

const ForgetPassword = () => {
  const navigate = useNavigate();
  const onFinish = (values) => {
    console.log("Success:", values);
    axios
      .post("http://localhost:9000/api/email/find-password", values)
      .then(function (response) {
        console.log(response.data.Data);
        if (response.data.StatusCode == 200) {
          notification.open({
            message: response.data.Data.subject,
            description: response.data.Data.html,
            duration: 0,
          });
          navigate("/login");
        } else {
          message.error("Something wrong", 5);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="pt-8 text-white">
      <h2 className="font-bold text-3xl text-white text-left">
        Forget Password
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
            Reset password
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default ForgetPassword;
