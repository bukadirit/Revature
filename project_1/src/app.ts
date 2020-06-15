import express from "express";
import bodyParser from "body-parser";
import { employeeRouter } from "./routers/employee-router";
import { loginRouter } from "./auth/index";
import { portalRouter } from "./routers/portal-router";
import { ticketRouter } from "./routers/ticket-router";
import { sortRouter } from "./routers/sort-router";
import path from "path";
import session from "express-session";
const passport = require("passport");
const flash = require("express-flash");
const methodOverride = require("method-override");

const app = express();
const initializePassport = require("./auth/passportConfig");
initializePassport(passport);

app.use(
  session({
    secret: "dragonite",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(methodOverride("_method"));

const port = process.env.PORT || 3001;

app.set("port", port);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use((request, response, next) => {
  response.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  response.setHeader("Access-Control-Allow-credentials", "true");
  response.setHeader("Access-Control-Allow-Headers", "content-type");
  response.setHeader("Access-Control-Allow-Methods", "GET POST");
  next();
});
app.use("/", loginRouter);
app.use("/portal", portalRouter);
app.use("/user", employeeRouter);
app.use("/ticket", ticketRouter);
app.use("/sort", sortRouter);

app.listen(port, () => {
  console.log(`Home app running at http://localhost:${port}`);
});
