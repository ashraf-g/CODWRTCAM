import React, { useState } from "react";
import { Input, Button, Form, message } from "antd";
import { useMediaQuery } from "react-responsive";
import { useNavigate, Link } from "react-router-dom";
import AuthService from "../../services/auth.service";

const LoginPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (values) => {
    try {
      setLoading(true);
      const { email, password } = values;

      // Call the register API
      const response = await AuthService.login(email, password);
      if (response && response.data) {
        const successMessage =
          response.data.message || "Registration successful!";
        message.success(successMessage);
        console.log(response.data);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("username", response.data.payload.username);
        localStorage.setItem("email", response.data.payload.email);

        navigate("/");
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
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

        <Form onFinish={handleLogin} layout="vertical">
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
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            className="w-full"
            style={{ marginTop: 20 }}
            loading={loading}
          >
            Login
          </Button>
        </Form>

        <p className="mt-4 text-center text-sm">
          Create an account?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
