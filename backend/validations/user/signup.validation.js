const isFill = require("../../util/isFill.util");

const signupValidation = (name, email, password) => {
  return (
    isFill(name) &&
    isFill(email) &&
    isFill(password) &&
    email.includes("@") &&
    5 <= password.trim().length &&
    password.trim().length <= 8
  );
};

module.exports = signupValidation;
