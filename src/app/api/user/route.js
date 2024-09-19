import { NextResponse } from "next/server";
import { connectMongoose } from "@/utils/Mongoose";
import { UserModel } from "@/models/index";

export const POST = async (req) => {
  const body = await req.json();
  await connectMongoose();
  try {
    const existingUser = await UserModel.findOne({ email: body.email }).exec();
    if (existingUser) {
      const userObject = existingUser.toObject();
      const { _id, createdAt, updatedAt, __v, ...existingUserWithout } =
        userObject;
      return NextResponse.json(
        { message: existingUserWithout },
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } else {
      const newUser = new UserModel({
        email: body.email,
        done: body.done,
      });
      await newUser.save();

      const newUserObject = newUser.toObject();
      const { _id, createdAt, updatedAt, __v, ...newUserWithout } =
        newUserObject;

      return NextResponse.json(
        { message: newUserWithout },
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur de serveur" },
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
};
