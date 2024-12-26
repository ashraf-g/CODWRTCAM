/**
 * Helper function to send error responses.
 * @param {Object} res - The response object
 * @param {number} statusCode - The HTTP status code
 * @param {string} message - The error message to send
 * @param {Array} [errors=[]] - Optional validation errors or additional info
 */

const sendErrorResponse = (res, statusCode, message, errors = []) => {
  res.status(statusCode).json({
    success: false,
    message,
    errors,
  });
};

module.exports = { sendErrorResponse };
