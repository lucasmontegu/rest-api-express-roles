import User from "../models/User";
import jwt from "jsonwebtoken";
import { config } from "../config/index";
import Role from "../models/Role";

export const register = async (req, res) => {
  try {
    //   Get request body
    const { username, email, password, roles } = req.body;
    // Creating a new user object
    const newUser = new User({
      username,
      email,
      password: await User.encryptPassword(password),
    });

    if (req.body.roles) {
      const foundRoles = await Role.find({ name: { $in: roles } });
      newUser.roles = foundRoles.map((role) => role._id);
    } else {
      const role = await Role.findOne({ name: "user" });
      newUser.roles = [role._id];
    }

    // Saving user object in mongoDB
    const savedUser = await newUser.save();

    // console.log(savedUser);
    // Create token
    const token = jwt.sign({ id: savedUser._id }, config.secret, {
      expiresIn: 86400, // 24 horas
    });

    res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const login = async (req, res) => {
  try {
    //   Request body email can be an email or username
    const userFound = await User.findOne({ email: req.body.email }).populate(
      "roles"
    );

    if (!userFound) return res.status(400).json({ message: "User not found" });

    const matchPassword = await User.comparePassword(
      req.body.password,
      userFound.password
    );

    if (!matchPassword)
      return res.status(401).json({ token: null, message: "Invalid password" });

    const token = jwt.sign({ id: userFound._id }, config.secret, {
      expiresIn: 86400, // 24 Horas
    });

    res.json({ token });
  } catch (error) {
    console.log(error);
  }
};
