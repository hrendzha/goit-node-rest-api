const { NotFound } = require("http-errors");
const { User } = require("../../models");
const successRes = require("../../utils/successRes");

async function confirmEmail(req, res, next) {
  const { verificationToken } = req.params;

  try {
    const user = await User.findOneAndUpdate(
      { verificationToken },
      {
        verificationToken: null,
        verify: true,
      },
      { new: true }
    );

    if (!user) {
      throw NotFound("User not found or verification has already been passed");
    }

    res.json(
      successRes({
        message: "Verification successful",
      })
    );
  } catch (error) {
    next(error);
  }
}

module.exports = confirmEmail;
