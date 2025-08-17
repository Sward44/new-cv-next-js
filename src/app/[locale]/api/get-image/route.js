import fs from "fs";
import path from "path";

export default async function GET(req, res) {
  try {
    const imagePath = path.join(
      process.cwd(),
      "src",
      "components",
      "img",
      "section",
      "david-launay-mini.webp"
    );
    const imageBuffer = fs.readFileSync(imagePath);
    const base64Image = imageBuffer.toString("base64");
    const dataUrl = `data:image/webp;base64,${base64Image}`;

    return new Response(JSON.stringify({ dataUrl }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Erreur lors de la lecture de l'image" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
