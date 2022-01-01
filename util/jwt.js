import jsonwebtoken from "jsonwebtoken";

const createToken = async (email) => {
  const token = await jsonwebtoken.sign({ email }, process.env.SECRET, {
    expiresIn: "10d",
  });
  return token;
};

const jwt = { createToken };

export default jwt;
