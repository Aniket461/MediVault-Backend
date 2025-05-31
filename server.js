const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

// Routes
const authRoutes = require("./routes/authRoutes");
const recordRoutes = require("./routes/recordRoutes");
const cdssRoutes = require('./routes/cdssRoutes');
const adminRoutes = require('./routes/adminRoutes');


app.get("/test", (req, res) => {
  res.send({ message: "MediVault Api works" });
});
app.use("/api/auth", authRoutes);
app.use("/api/records", recordRoutes);
app.use('/api/cdss', cdssRoutes);
app.use('/api/admin', adminRoutes);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
