import http from "./axios";

class AuthService {
  login(email, password) {
    return http.post("/user/auth/login", { email, password });
  }
  register(username, email, password) {
    return http.post("/user/auth/signup", { username, email, password });
  }

  forgotPassword(email) {
    return http.post("/user/auth/forget-password", { email });
  }

  resetPassword(otp, newPassword) {
    return http.post("/user/auth/reset-password", { otp, newPassword });
  }
  verifyEmail(token) {
    return http.get(`/user/auth/verify-email/${token}`);
  }
}

export default new AuthService();
