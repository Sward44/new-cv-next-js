import { NextResponse } from "next/server";
import { connectMongoose } from "@/utiltaire/Mongoose";
import { UserModel } from "@/models/index";

export async function POST(req) {
  if (req.method === "OPTIONS") {
    return new NextResponse(null, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  }

  try {
    await connectMongoose();
    const body = await req.json();

    const existingUser = await UserModel.findOne({ email: body.email }).exec();
    if (existingUser) {
      const userObject = existingUser.toObject();
      const { _id, createdAt, updatedAt, __v, ...existingUserWithout } =
        userObject;

      return new NextResponse(
        JSON.stringify({ message: existingUserWithout }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
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

      return new NextResponse(JSON.stringify({ message: newUserWithout }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
    }
  } catch (error) {
    console.error("Error in user API route:", error);
    return new NextResponse(
      JSON.stringify({ error: error.message || "Erreur de serveur" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
