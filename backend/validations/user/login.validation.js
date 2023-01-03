const isFill = require("../../util/isFill.util");

const loginValidation = (email, password) => {
    return isFill(email) && isFill(password) && email.includes("@");
};

module.exports = loginValidation;
