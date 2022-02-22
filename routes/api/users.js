const express = require("express");
const { validation, auth, upload } = require("../../middleware");
const { joiAuthSchema, joiSubscriptionSchema, joiEmailSchema } = require("../../models");
const ctrl = require("../../controllers/users");

const router = express.Router();

router.post("/signup", validation(joiAuthSchema), ctrl.signUp);

router.post("/login", validation(joiAuthSchema), ctrl.login);

router.get("/current", auth, ctrl.getCurrent);

router.get("/logout", auth, ctrl.logout);

router.patch("/", auth, validation(joiSubscriptionSchema), ctrl.updateSubscription);

router.patch("/avatars", auth, upload.single("avatar"), ctrl.updateAvatar);

router.get("/verify/:verificationToken", ctrl.confirmEmail);

router.post("/verify", validation(joiEmailSchema), ctrl.getEmailConfirmationCodeAgain);

module.exports = router;
