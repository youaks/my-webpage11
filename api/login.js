const { MongoClient } = require('mongodb');

module.exports = async (req, res) => {
  const { email, phone, password } = req.body;

  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    const db = client.db('userDB');
    const users = db.collection('users');

    // Admin credentials
    const ADMIN_EMAIL = "admin@gmail.com";
    const ADMIN_PHONE = "123";
    const ADMIN_PASSWORD = "123";

    if (email === ADMIN_EMAIL && phone === ADMIN_PHONE && password === ADMIN_PASSWORD) {
      // Fetch all users from the database
      const allUsers = await users.find({}, { projection: { _id: 0 } }).toArray();
      res.status(200).json({ message: "Admin logged in successfully!", users: allUsers });
    } else {
      // Check if user exists
      const user = await users.findOne({ email, phone });
      if (user && user.password === password) {
        res.status(200).json({ message: "User logged in successfully!" });
      } else {
        res.status(401).json({ message: "Invalid credentials!" });
      }
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  } finally {
    await client.close();
  }
};
