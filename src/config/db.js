const mongoose = require("mongoose");

// DB Connect
const dbConnect = () =>
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("MongoDB connected ✅"))
    .catch((err) => console.error(err));

// Export the connection
module.exports = dbConnect;
