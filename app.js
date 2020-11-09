const express = require("express");
const session = require("express-session");
const body = require("body-parser");
const app = express();
const static = express.static(__dirname + "/public");

const appRoutes = require("./routes/main");
const exphbs = require("express-handlebars");
const Handlebars = require("handlebars");
const { allowInsecurePrototypeAccess } = require("@handlebars/allow-prototype-access");

const PORT = process.env.PORT || 3000;

app.use("/public", static);
app.use(express.json());
app.use(body.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    name: "AuthCookie",
    secret: "Build your smart home",
    saveUninitialized: true,
    resave: false,
  })
);

app.use(function (req, res, next) {
  res.locals.session = req.session;
  next();
});
app.use(async (req, res, next) => {
  if (req.body._method) {
    req.method = req.body._method;
  }
  next();
});

const handlebarsInst = exphbs.create({
  defaultLayout: "main",
  // Specify helpers which are only registered on this instance.
  helpers: {
    asJSON: (obj, spacing) => {
      if (typeof spacing === "number") return new Handlebars.SafeString(JSON.stringify(obj, null, spacing));
      return new Handlebars.SafeString(JSON.stringify(obj));
    },
    divisibleBy: (num, divideBy) => {
      return num > 0 && num % divideBy == 0;
    },
    equals: (left, right) => {
      return left === right;
    },
  },
  partialsDir: ["views/partials/"],
  handlebars: allowInsecurePrototypeAccess(Handlebars),
});

handlebarsInst.handlebars.registerHelper("dateFormat", require("handlebars-dateformat"));
handlebarsInst.handlebars.registerHelper("checkValue", function (value, inputValue) {
  if (value == inputValue) {
    return "checked";
  } else {
    return "";
  }
});
handlebarsInst.handlebars.registerHelper("select", function (selected, options) {
  if (!selected) {
    selected = "United States";
  }
  return options.fn(this).replace(new RegExp(' value="' + selected + '"'), '$& selected="selected"');
});

handlebarsInst.handlebars.registerHelper("checkInArray", function (value, inputArray) {
  if (inputArray.includes(value)) {
    return "checked";
  } else {
    return "";
  }
});

app.engine("handlebars", handlebarsInst.engine);
app.set("view engine", "handlebars");

app.use("/", appRoutes);

app.listen(PORT, () => {
  console.log(`Smart Home Server running at http://localhost:${PORT}`);
});
