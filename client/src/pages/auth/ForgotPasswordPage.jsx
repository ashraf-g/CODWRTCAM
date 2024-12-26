import React, { useState } from "react";
import { Input, Button, Form, Typography, message } from "antd";
import { useMediaQuery } from "react-responsive";
import { Link, useNavigate } from "react-router-dom";

const { Title } = Typography;

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const handleResetPassword = (values) => {
    setLoading(true);
    console.log(values);

    // Simulate API call (replace with actual logic)
    setTimeout(() => {
      setLoading(false);
      message.success("Please check the email we have sent you an OTP.");

      // Redirect to reset password page
      navigate("/reset-password");
    }, 2000);
  };

  return (
    <div
      className={`flex justify-center items-center h-screen ${
        isMobile ? "px-4" : ""
      }`}
    >
      <div
        className={`w-full max-w-md p-6 bg-white rounded-lg shadow-lg ${
          isMobile ? "space-y-4" : ""
        }`}
      >
        <Title level={2} className="text-center mb-6">
          Forgot Password
        </Title>
        <Form
          layout="vertical"
          onFinish={handleResetPassword} // Handles form submission after validation
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter your email address!" },
              { type: "email", message: "Please enter a valid email address!" },
            ]}
          >
            <Input
              type="email"
              placeholder="Enter your email"
              aria-label="Email Address"
            />
          </Form.Item>

          <Button
            type="primary"
            block
            htmlType="submit"
            className="w-full"
            loading={loading}
          >
            Reset Password
          </Button>
        </Form>

        {/* Link to go back to Login */}
        <div className="text-center mt-4">
          <Link to="/login" className="text-blue-500">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
