const express = require("express");
const cors = require("cors");
require("dotenv").config();
const path = require("path");

const contactsRouter = require("./routes/api/contacts");
const usersRouter = require("./routes/api/users");
const { auth } = require("./middleware");

const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.use(cors());
app.use(express.json());
if (process.env.NODE_ENV !== "production") {
  const logger = require("morgan");
  const formatsLogger = app.get("env") === "development" ? "dev" : "short";
  app.use(logger(formatsLogger));
}
app.use("/api/users", usersRouter);
app.use("/api/contacts", auth, contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: `Not found address ${req.url}` });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Internal server error" } = err;
  res.status(status).json({
    status: "error",
    code: status,
    message,
  });
});

module.exports = app;
