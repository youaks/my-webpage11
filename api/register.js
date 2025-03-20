const { MongoClient } = require('mongodb');

module.exports = async (req, res) => {
  const { email, phone, password } = req.body;

  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    const db = client.db('userDB');
    const users = db.collection('users');

    // Save user to the database
    await users.insertOne({ email, phone, password });
    res.status(200).json({ message: "User registered successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  } finally {
    await client.close();
  }
};