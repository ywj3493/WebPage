import connectDB from "../../../util/mongodb";
import { User } from "../../../models/User";
import bcrypt from "../../../util/bcrypt";

const handler = async (req, res) => {
  if (req.method === "POST") {
    console.log("signinhanler");
    const { email, password } = req.body;
    console.log({ email, password });
    if (email && password) {
      const user = await User.findOne({ email: email });
      console.log("find user", user);
      if (!user) {
        return res.status(400).json({
          success: false,
          msg: "there is no user with same email",
        });
      } else {
        const isMatch = await bcrypt.comparePassword(password, user.password);
        console.log("isMatch", isMatch);
        if (isMatch) {
          return res.status(200).json({
            user,
          });
        } else {
          return res.status(400).json({ success: false, msg: "you put wrong password" });
        }
      }
    } else {
      res.status(400).json({ success: false, msg: "you have to put email and password" });
    }
  } else {
    res.status(400).json({ success: false, msg: "method not supported" });
  }
};
export default connectDB(handler);
