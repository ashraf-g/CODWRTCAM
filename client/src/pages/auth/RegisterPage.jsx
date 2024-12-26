import React, { useState } from "react";
import { Input, Button, Form, message } from "antd";
import { useMediaQuery } from "react-responsive";
import { useNavigate, Link } from "react-router-dom";
import AuthService from "../../services/auth.service";

const RegisterPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle form submission
  const handleRegister = async (values) => {
    try {
      setLoading(true); // Start loading before making the API call
      const { username, email, password } = values;

      // Call the register API
      const response = await AuthService.register(username, email, password);

      // Check if the registration was successful and show the message
      if (response && response.data) {
        const successMessage =
          response.data.message || "Registration successful!";
        message.success(successMessage);
        navigate("/login");
      }
    } catch (error) {
      console.error("Error during registration:", error);

      if (error.response && error.response.data) {
        const errorMessage =
          error.response.data.message ||
          "An error occurred during registration. Please try again.";
        message.error(errorMessage);
      } else {
        message.error(
          "An error occurred during registration. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  const isTablet = useMediaQuery({
    query: "(min-width: 768px) and (max-width: 1024px)",
  });

  const containerStyle = isMobile
    ? "w-full p-4 bg-white rounded-lg shadow-md"
    : isTablet
    ? "w-3/4 max-w-md p-6 bg-white rounded-lg shadow-md"
    : "w-1/2 max-w-md p-6 bg-white rounded-lg shadow-md";

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className={containerStyle}>
        <h2 className="text-2xl font-semibold text-center mb-6">Register</h2>

        <Form onFinish={handleRegister} layout="vertical">
          <Form.Item
            label="Username"
            name="username"
            rules={[
              { required: true, message: "Please enter your username" },
              { min: 3, message: "Username must be at least 3 characters" },
              {
                pattern: /^[^\d]/,
                message: "Username cannot start with a number",
              },
            ]}
          >
            <Input placeholder="Enter your username" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter your email" },
              {
                type: "email",
                message: "Please enter a valid email address",
              },
            ]}
          >
            <Input type="email" placeholder="Enter your email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Please enter your password" },
              { min: 6, message: "Password must be at least 6 characters" },
              {
                pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/,
                message:
                  "Password must contain at least one letter and one number.",
              },
            ]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>

          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Please confirm your password" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The two passwords do not match")
                  );
                },
              }),
            ]}
          >
            <Input.Password placeholder="Confirm your password" />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            className="w-full"
            style={{ marginTop: 20 }}
            loading={loading} // Show loading spinner on the button while submitting
          >
            Register
          </Button>
        </Form>

        <p className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
