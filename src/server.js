// server.js
const dotenv = require("dotenv");
const app = require("./app");
const dbConnect = require("./config/db");

dotenv.config();

// Connect to MongoDB
dbConnect();

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} 👍`));
