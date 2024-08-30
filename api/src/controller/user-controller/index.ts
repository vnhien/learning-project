import { Request, Response } from "express";
import { UserModel } from "../../model";
import { AppError } from "../../overide";
import { hashString } from "../../utils";
import { uuid as v4 } from "uuidv4";
import jwt from "jsonwebtoken";
import { app_secret } from "../../config";

export async function login(req: Request) {
  const { userName, password } = req.body;
  if (!userName) {
    throw new AppError("User Name is empty", 400);
  }
  if (!password) {
    throw new AppError("Password is empty", 400);
  }
  const exsitingUser = await UserModel.findOne({
    userName: userName,
  });
  if (!exsitingUser) {
    throw new AppError("Invalid Username");
  }
  const hashedPassword = await hashString(password);
  if (hashedPassword !== exsitingUser.passwordHashed) {
    throw new AppError("Invalid Password", 400);
  }
  const userJwt = await jwt.sign(
    {
      userId: exsitingUser.id,
    },
    app_secret
  );
  return { jwt: userJwt, userId: exsitingUser.id };
}

export async function register(req: Request) {
  const { userName, password } = req.body;
  if (!userName) {
    throw new AppError("User Name is empty", 400);
  }

  if (!password) {
    throw new AppError("Password is empty", 400);
  }

  const exsitingUser = await UserModel.findOne({ userName: userName });

  if (exsitingUser) {
    throw new AppError("User Name existed", 400);
  }
  const hashedPassword = await hashString(String(password));
  const newUserId = v4();
  const newUser = new UserModel({
    avatar: "",
    id: newUserId,
    passwordHashed: hashedPassword,
    userName: userName,
  });
  const result = await newUser.save();
  return { userId: newUserId };
}
