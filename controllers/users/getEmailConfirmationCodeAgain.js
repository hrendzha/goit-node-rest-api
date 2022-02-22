const { v4 } = require("uuid");
const { NotFound, BadRequest } = require("http-errors");
const { User } = require("../../models");
const successRes = require("../../utils/successRes");
const sendEmail = require("../../utils/sendEmail");

const { DOMAIN_NAME } = process.env;

async function getEmailConfirmationCodeAgain(req, res, next) {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      throw new NotFound("User not found");
    }

    if (user.verify) {
      throw new BadRequest("Verification has already been passed");
    }

    const verificationToken = user.verificationToken || v4();

    await User.findByIdAndUpdate(user._id, { verificationToken }, { new: true });

    const msg = {
      to: email,
      subject: "Email confirmation",
      html: `<a href="${DOMAIN_NAME}/api/users/verify/${verificationToken}" target="_blank">Follow this link to confirm your email</a>`,
    };

    await sendEmail(msg);

    res.json(
      successRes({
        message: "Verification email sent",
      })
    );
  } catch (error) {
    next(error);
  }
}

module.exports = getEmailConfirmationCodeAgain;
