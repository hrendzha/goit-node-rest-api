const sgMail = require("@sendgrid/mail");

const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const FROM = "pashahrendzha@meta.ua";

async function sendEmail(data) {
  try {
    const msg = { ...data, from: FROM };

    await sgMail.send(msg);
    return true;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

module.exports = sendEmail;
