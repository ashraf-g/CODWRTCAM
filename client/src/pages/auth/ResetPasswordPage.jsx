import React, { useState } from "react";
import { Input, Button, Form, Typography, message } from "antd";
import { Link, useNavigate } from "react-router-dom";

const { Title } = Typography;

const ResetPasswordPage = () => {
  const navigate = useNavigate();

  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (values) => {
    setLoading(true);

    // Simulate API call (replace with actual logic)
    setTimeout(() => {
      setLoading(false);
      message.success("Your password has been reset successfully."); // Show success message

      // Redirect to login page
      navigate("/login"); // Redirect to the login page after successful reset
    }, 2000);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <Title level={2} className="text-center mb-6">
          Reset Password
        </Title>
        <Form
          layout="vertical"
          onFinish={handleSubmit} // Form will call handleSubmit if the validation is passed
        >
          <Form.Item
            label="OTP"
            name="otp"
            rules={[
              { required: true, message: "Please enter the OTP!" },
              {
                len: 6,
                message: "OTP must be exactly 6 digits.",
                type: "string",
              },
            ]}
          >
            <Input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength={6} // OTP is typically a 6-digit code
            />
          </Form.Item>

          <Form.Item
            label="New Password"
            name="newPassword"
            rules={[
              { required: true, message: "Please enter your new password!" },
              {
                min: 6,
                message: "Password must be at least 6 characters long.",
              },
              {
                pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/,
                message:
                  "Password must contain at least one letter and one number.",
              },
            ]}
          >
            <Input.Password
              placeholder="Enter New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </Form.Item>

          <Button
            type="primary"
            block
            htmlType="submit"
            className="w-full"
            loading={loading}
          >
            Submit New Password
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

export default ResetPasswordPage;
