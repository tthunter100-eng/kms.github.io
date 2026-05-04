import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
    const client = new MongoClient(process.env.MONGODB_URI);

    try {
        await client.connect();
        const db = client.db('InventorySystem');
        const tickets = db.collection('tickets');

        if (req.method === 'GET') {
            const allTickets = await tickets.find({}).sort({ createdAt: -1 }).toArray();
            return res.status(200).json(allTickets);
        }

        if (req.method === 'POST') {
            const newTicket = req.body;
            newTicket.status = "Pending"; 
            newTicket.createdAt = new Date();

            const result = await tickets.insertOne(newTicket);
            return res.status(201).json({ 
                success: true, 
                ticketId: result.insertedId 
            });
        }

        return res.status(405).json({ message: 'Method Not Allowed' });

    } catch (error) {
        console.error("Database Error:", error);
        return res.status(500).json({ error: "Database operation failed" });
    } finally {
        await client.close();
    }
}