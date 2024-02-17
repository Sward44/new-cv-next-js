import axios from "axios";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config({ path: ".env.production.local" });

export async function exchangeCodeForTokens(code) {
  try {
    const response = await axios.post("https://oauth2.googleapis.com/token", {
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      redirect_uri: "https://gooka.net",
      grant_type: "authorization_code",
      code,
    });

    return response.data;
  } catch (error) {
    console.error("Error exchanging code:", error);
    throw new Error("Error exchanging code");
  }
}

// Fonction pour écrire les tokens dans le fichier .env
export function writeTokensToFile(tokens) {
  const envData = `
EMAIL_USERNAME=${process.env.EMAI_USERNAME}
EMAIL_PASSWORD=${process.env.EMAIL_PASSWORD}
CLIENT_ID=${process.env.CLIENT_ID}
CLIENT_SECRET=${process.env.CLIENT_SECRET}
REFRESH_TOKEN=${tokens.refresh_token}
ACCESS_TOKEN=${tokens.access_token}
`;

  fs.writeFileSync(".env", envData);
}
