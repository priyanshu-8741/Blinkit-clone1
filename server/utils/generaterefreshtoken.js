import jwt from "jsonwebtoken";
import usermodel from "../models/user.model.js";

const generaterefreshtoken = async (userid) => {
  // Correct option: expiresIn (not expireIn)
  const token = jwt.sign(
    { id: userid },
    process.env.SECRET_KEY_REFRESH_TOKEN,
    { expiresIn: "30d" }  // ✅ correct spelling
  );

  // Save the refresh token in the user document
  await usermodel.updateOne({ _id: userid }, { refresh_token: token });

  return token;
};

export default generaterefreshtoken;