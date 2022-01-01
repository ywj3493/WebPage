import connectDB from "../../../util/mongodb";
import { User } from "../../../models/User";
import bcrypt from "../../../util/bcrypt";

const handler = async (req, res) => {
  const method = req.method;

  switch (method) {
    case "POST":
      try {
        const { name, email, password } = req.body;
        const hashPassword = await bcrypt.hashPassword(password);
        console.log("hashPassword", hashPassword);
        const newUser = new User({ name, email, password: hashPassword });
        const createdUser = await newUser.save();
        console.log(createdUser);
        return res.status(200).json({
          success: true,
          msg: "New User Created",
          data: createdUser,
        });
      } catch (error) {
        return res.status(500).json({
          success: false,
          msg: error,
        });
      }

    default:
      break;
  }
};
export default connectDB(handler);
