const { MongoClient } = require('mongodb');

export default async function handler(req, res) {
    const client = new MongoClient(process.env.MONGODB_URI);

    try {
        await client.connect();
        const database = client.db('InventorySystem');
        const items = database.collection('items');

        if (req.method === 'GET') {
            const allItems = await items.find({}).toArray();
            return res.status(200).json(allItems);
        } 

        if (req.method === 'POST') {
            const newItem = req.body; 
            const result = await items.insertOne(newItem);
            return res.status(201).json(result);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        await client.close();
    }
}
