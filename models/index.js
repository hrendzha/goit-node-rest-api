const { Contact, joiContactSchema, favoriteJoiSchema } = require("./contact");
const { User, joiUserSchema, joiAuthSchema, joiSubscriptionSchema, joiEmailSchema } = require("./user");

module.exports = {
  Contact,
  joiContactSchema,
  favoriteJoiSchema,

  User,
  joiUserSchema,
  joiAuthSchema,
  joiSubscriptionSchema,
  joiEmailSchema,
};
