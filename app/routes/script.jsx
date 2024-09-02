// routes/script.tsx

import { json } from "@remix-run/node";
import prisma from "../db.server";
import formidable from "formidable";
import path from "path";
import fs from "fs";

const uploadDir = path.join(process.cwd(), "public", "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}


export const loader = async () => {
  return json({ message: "This route handles POST requests." });
};

export const action = async ({ request }) => {
  const form = new formidable.IncomingForm();
  form.uploadDir = uploadDir;
  form.keepExtensions = true;

  return new Promise((resolve) => {
    form.parse(request, async (err, fields, files) => {
      if (err) {
        console.error("Form parsing error:", err);
        return resolve(json({ error: "Form parsing error" }, { status: 400 }));
      }

      const script = fields.script?.[0];
      const file = files.file?.[0];

      if (!script) {
        return resolve(
          json({ error: "Header script is required" }, { status: 400 }),
        );
      }

      const fileName = file ? file.newFilename : null;
      const filePath = file ? path.join("/uploads", fileName) : null;

      try {
        const newScript = await prisma.headerScript.create({
          data: {
            script,
            fileName,
            filePath,
            storeId: "example-store-id"
          },
        });
        resolve(json({ success: true, data: newScript }));
      } catch (error) {
        console.error("Database error:", error);
        resolve(json({ error: "Database error" }, { status: 500 }));
      }
    });
  });
};
