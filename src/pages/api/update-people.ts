import fs from 'fs';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { people } = req.body;
        const filePath = path.join(process.cwd(), 'public', 'people.json');

        try {
            fs.writeFileSync(filePath, JSON.stringify(people, null, 2));
            res.status(200).json({ message: 'people.json updated successfully' });
        } catch (error) {
            console.error('Error writing to people.json:', error);
            res.status(500).json({ message: 'Failed to update people.json' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}