import {expressjwt} from "express-jwt";

export const requireSignin = expressjwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
  getToken: (req, res) => req.cookies.token,
});


