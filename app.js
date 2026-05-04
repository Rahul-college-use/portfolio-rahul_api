const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dns = require('dns');

const app = express();
const port = process.env.PORT || 3001;

// DNS fix (optional)
dns.setServers(['8.8.8.8', '1.1.1.1']);

// Middleware
app.use(cors(),{
    origin: ["https://portfolio-rahul-mu.vercel.app/","https://post-project-in-portfolio-app.vercel.app/"],
    credentials: true, 
});
app.use(express.json());

// ✅ MongoDB Connection
mongoose.connect('mongodb+srv://portfolio_Api:rahul1234@portfolioapi.hizjbay.mongodb.net/?appName=portfolioApi')
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

/* =========================
   SCHEMA + MODEL (DEFINE ONCE)
========================= */
const DataSchema = new mongoose.Schema({
    id: String,
    title: { type: String, required: true },
    description: String,
    technology: String,
    imageUrl: String,
    details: String,
    link: String
});

const DataModel = mongoose.model('Data', DataSchema);

/* =========================
   ROUTES
========================= */

// Test Route
app.get('/', (req, res) => {
    res.send("Hello");
});

/* ---------- POST (Create) ---------- */
app.post('/data', async (req, res) => {
    try {
        const newData = new DataModel(req.body);
        await newData.save();

        res.status(201).json({
            msg: "Data saved successfully",
            data: newData
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
});

/* ---------- GET (Read) ---------- */
app.get('/data', async (req, res) => {
    try {
        const data = await DataModel.find();

        res.json(data);

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
});

/* =========================
   START SERVER
========================= */
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});