const bcrypt = require("bcryptjs");
const { Conflict } = require("http-errors");
const gravatar = require("gravatar");
const { v4 } = require("uuid");
const { User } = require("../../models");
const successRes = require("../../utils/successRes");
const sendEmail = require("../../utils/sendEmail");

const { DOMAIN_NAME } = process.env;

async function signUp(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      throw new Conflict(`Email ${email} in use`);
    }

    const hashedPass = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const avatarURL = gravatar.url(
      email,
      {
        s: "250",
        d: "wavatar",
      },
      true
    );
    const verificationToken = v4();

    await User.create({
      email,
      password: hashedPass,
      avatarURL,
      verificationToken,
    });

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

    // res.status(201).json({
    //   status: "success",
    //   code: 201,
    //   data: {
    //     user: {
    //       email: newUser.email,
    //       subscription: newUser.subscription,
    //       avatarURL: newUser.avatarURL,
    //     },
    //   },
    // });
  } catch (error) {
    if (error.message.includes("validation failed")) {
      error.status = 400;
    }

    next(error);
  }
}

module.exports = signUp;
