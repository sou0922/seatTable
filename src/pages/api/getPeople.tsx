import fs from "fs";
import path from "path";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const filePath = path.join(process.cwd(), "public/people.json"); // JSON ファイルのパス
    const fileContents = fs.readFileSync(filePath, "utf-8");
    const people = JSON.parse(fileContents);
    res.status(200).json(people); // JSON データを返す
}