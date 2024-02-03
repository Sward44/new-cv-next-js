import { NextResponse } from "next/server";
import connect from "../../../../Mongoose";
import User from "../../../../models/User";

export const POST = async (req) => {
  const body = await req.json();
  console.log(body);

  try {
    await connect();
    const existingUser = await User.findOne({ email: body.email }).exec();
    if (existingUser) {
      return NextResponse.json(existingUser.toObject(), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
    } else {
      const newUser = new User(body);
      await newUser.save();

      return NextResponse.json(newUser.toObject(), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
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
