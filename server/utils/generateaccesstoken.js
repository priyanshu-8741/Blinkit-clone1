import jwt from "jsonwebtoken";

const generateaccesstoken = (userid) => {
  const token = jwt.sign(
    { id: userid },
    process.env.SECRET_KEY_ACCESS_TOKEN,
    { expiresIn: "5h" } // Valid durations: '1d', '5h', '10m', etc.
  );

  return token;
};

export default generateaccesstoken;