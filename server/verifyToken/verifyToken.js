import jwt from "jsonwebtoken";

function verify(req, res, next) {
  //getting the Auth Token from the req.header
  const token = req.header("auth-token");
  //if there isn't a token, return this
  if (!token) return res.status(401).send("Access Denied");

  try {
    //if there is a token, we need to verify it with the TOKEN_SECRET that is saved within the .env
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    //put next(), so when this middleware is used, it will continue and go to the next line
    next();
  } catch (err) {
    res.status(400).send({ auth: false, message: "Invalid Token" });
    console.log("Invalid Token");
  }
}

export default verify;
