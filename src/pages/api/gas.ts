import type { NextApiRequest, NextApiResponse } from "next";

type GasResponse = {
    url: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed"});
    }

    try {
        // const sendData: sendData = req.body;
        const sendData = req.body;
        // リクエストパラメータ
        const postParam: RequestInit = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(sendData),
        };
        // Gasにデータを送信
        const response = await fetch(process.env.GOOGLE_APP_SCRIPT_URL!, postParam);
        if (!response.ok) {
            throw new Error("Failed to send data to Gas");
        }
        const data: GasResponse = await response.json();
        // クライアントに返却
        return res.status(200).json(data);
    }
    catch(error) {
        console.log("gasにてエラーが発生しました:", error);
        return res.status(500).json({error: "Faield to communicate with GAS"});
    }
}