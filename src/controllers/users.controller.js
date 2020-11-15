import User from "../models/User";
import jwt from "jsonwebtoken";
import { config } from "../config/index";
import Role from "../models/Role";

export const createUser = async (req, res) => {
  try {
    //   Get request body
    const { username, email, password, roles } = req.body;

    const rolesFound = await Role.find({ name: { $in: roles } });

    // Creating a new user object
    const user = new User({
      username,
      email,
      password,
      roles: rolesFound.map((role) => role._id),
    });

    user.password = await User.encryptPassword(user.password);

    // Saving user object in mongoDB
    const savedUser = await user.save();

    return res.status(200).json({
      _id: savedUser._id,
      username: savedUser.username,
      email: savedUser.email,
      roles: savedUser.roles,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
  }
};

export const getUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    // console.log(req.params);

    const user = await User.findById(userId);
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "No user found" });
  }
};

export const updateUserById = async (req, res) => {
  try {
    const { userId } = req.params;

    let userBody = req.body;

    if (userBody.roles) {
      const foundRoles = await Role.find({ name: { $in: userBody.roles } });
      userBody.roles = foundRoles.map((role) => role._id);
    }

    const updatedUser = await User.findByIdAndUpdate(userId, userBody, {
      new: true,
    });

    res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "No user found" });
  }
};

export const deleteUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    await User.findByIdAndDelete(userId);
    res.status(204).json();
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "No user found" });
  }
};
