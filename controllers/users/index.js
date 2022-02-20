const signUp = require("./signUp");
const login = require("./login");
const getCurrent = require("./getCurrent");
const logout = require("./logout");
const updateSubscription = require("./updateSubscription");
const updateAvatar = require("./updateAvatar");
const confirmEmail = require("./confirmEmail");
const getEmailConfirmationCodeAgain = require("./getEmailConfirmationCodeAgain");

module.exports = {
  signUp,
  login,
  getCurrent,
  logout,
  updateSubscription,
  updateAvatar,
  confirmEmail,
  getEmailConfirmationCodeAgain,
};
