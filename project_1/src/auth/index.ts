import express, { response } from "express";
import session from "express-session";
const passport = require("passport");
export const loginRouter = express.Router();

const app = express();
const initializePassport = require("../auth/passportConfig");
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

loginRouter.get("/", checkNotAuthenticated, (request, response) => {
  try {
    response.render("login");
  } catch (err) {
    response.sendStatus(500);
    console.log(err);
    return;
  }
});

loginRouter.post("/", passport.authenticate("local"), (req, res) => {
  console.log(req.user);
  res.status(200).json(req.user);
});

loginRouter.delete("/logout", (req, res) => {
  req.logOut();
  req.flash("notify", "You have logged out successfully.");
  res.redirect("/");
});

export function checkAuthenticated(request, response, next) {
  if (request.isAuthenticated()) {
    return next();
  }
  response.redirect("/");
}

export function checkNotAuthenticated(request, response, next) {
  if (request.isAuthenticated()) {
    return response.redirect("/portal");
  }
  next();
}
