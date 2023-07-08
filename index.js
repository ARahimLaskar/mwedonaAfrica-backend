const express = require("express");
const { connection } = require("./Config/db.js");
const products_routes = require("./Routes/products.js");
const cart_routes = require("./Routes/cart.js");
const userRoutes = require("./Routes/userRoutes.js");
const { authentication } = require("./Middleware/authentication.js");
const GoogleUserModel = require("./Model/googleUserModel.js");
const passport = require("./Config/google-ouath.js");
const jwt = require("jsonwebtoken");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = 8000;
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("home");
});

app.use("/user", userRoutes);

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    session: false,
  }),
  function (req, res) {
    // Successful authentication, redirect home.
    console.log(req.user);
    const token = jwt.sign({ userId: req.user._id }, process.env.JWT_SECRET);
    res.send({ msg: "login Successful", token });

    // const redirectUrl = "/";

    // // Redirecting the client to a different route using JavaScript
    // res.write(`<script>window.location.href = '${redirectUrl}';</script>`);
    // res.end();
  }
);

app.use("/products", products_routes);

app.use(authentication);
app.use("/cart", cart_routes);

app.listen(PORT, async () => {
  try {
    await connection;
    console.log("db connected");
  } catch (error) {
    console.log("error connecting db");
  }
  console.log(`server listening at port ${PORT}`);
});
