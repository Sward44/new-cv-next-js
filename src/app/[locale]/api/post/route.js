import { NextResponse } from "next/server";
import { connectMongoose } from "@/utils/Mongoose";
import { UserModel, PostModel } from "@/models/index";
import email from "@/utils/email";

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
    if (!existingUser) {
      return NextResponse.json(
        { error: "Utilisateur non trouvé" },
        {
          status: 404,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }
    if (body.email && existingUser.email !== body.email) {
      existingUser.email = body.email;
    }
    if (body.name && body.name.length !== 0) {
      existingUser.name = body.name;
    }
    if (body.surname && body.surname.length !== 0) {
      existingUser.surname = body.surname;
    }
    if (body.phone && body.phone.length !== 0) {
      existingUser.phone = body.phone;
    }
    existingUser.site = body.site;
    await existingUser.save();

    const newPost = new PostModel({
      user: existingUser._id,
      body: body.comments,
    });

    await newPost.save();

    await email.getTemplate("welcome-email-ghost", {
      bienvenue: "Bienvenue sur david-launay.com",
      siteUrl: "https://david-launay.com",
      email: "davidlaunay567@gmail.com",
      ownerEmail: existingUser.email,
      ownerSurname: existingUser.surname,
      ownerName: existingUser.name,
      ownerPhone: existingUser.phone,
      ownerSite: existingUser.site,
      ownerComments: newPost.body,
    });

    return NextResponse.json(existingUser.toObject(), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(error);
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
