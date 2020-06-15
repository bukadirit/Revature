const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
import * as employeeService from "../services/employee-service";
import path from "path";
import express from "express";

const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
var user, role, pw;

async function initialize(passport) {
  const authenticateUser = async (email, password, done) => {
    user = await employeeService.getEmployee(email);
    //console.log(user)
    pw = user.map((e) => e.password);
    role = user.map((e) => e.userRole);
    //console.log(role)

    if (user.length == 0) {
      return done(null, false, { email: "User Does Not Exist" });
    }
    try {
      if (await bcrypt.compare(password, pw.toString())) {
        return done(null, user);
      } else {
        return done(null, false, { password: "Incorrect Email or Password" });
      }
    } catch (e) {
      return done(e);
    }
  };

  passport.use(new LocalStrategy({ usernameField: "email" }, authenticateUser));
  passport.serializeUser((role, done) => done(null, role));
  passport.deserializeUser((user, done) => {
    return done(null, user);
  });
}

module.exports = initialize;
