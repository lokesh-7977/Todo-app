import { AuthModel } from "../models/auth.model";
import { config } from "../config/index";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid"; 
import { registerSchema, loginSchema } from "../types/index";

export const register = async (
  req: Request,
  res: Response
): Promise<any> => {
  
  const validatedData = registerSchema.parse(req.body);
  const { email, name, password } = validatedData;

  if (!email || !name || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  try {
    const existingUser = await AuthModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }
  } catch (error) {
    return res.status(500).json({ msg: "Error: " + (error as Error).message });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new AuthModel({
    id: uuidv4(), 
    email,
    name,
    password: hashedPassword,
  });

  try {
    const user = await newUser.save();
    return res.json({
      user: {
        id: user.id, 
        name: user.name,
        email: user.email,
      },
    });
  } catch (error: any) {
    return res.status(500).json({ msg: "Error: " + (error as Error).message });
  }
};

export const login = async (req: Request, res: Response): Promise<any> => {
  const validatedData = loginSchema.parse(req.body);
  const { email, password } = validatedData;

  if (!email || !password) {
    res.status(400).json({ msg: "Please enter all fields" });
    return;
  }

  try {
    const user = await AuthModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "User Not Found" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }

    const jwtSecret = config.jwt as string;
    const jwtExpiration = config.jwt_expiration as string;
    const token = jwt.sign({ id: user.id }, jwtSecret, { 
      expiresIn: jwtExpiration,
    });

    return res.json({
      token,
      user: {
        id: user.id, 
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    return res.status(500).json({ msg: "Error: " + (error as Error).message });
  }
};

export const logOut = async (req: Request, res: Response): Promise<any> => {
  if (req.cookies.token) {
    res.cookie('token', '', { expires: new Date(0) });
    return res.status(200).json({ msg: "Logged out successfully" });
  } else {
    return res.status(500).json({
      msg: "Logout failed"
    });
  }
};
