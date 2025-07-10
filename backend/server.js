// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/covidTracker', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.once('open', () => {
    console.log('MongoDB Connected');
});

// Mongoose Schema
const covidSchema = new mongoose.Schema({
    state: String,
    cases: Number,
    deaths: Number,
    date: String
});

const CovidData = mongoose.model('CovidData', covidSchema, 'coviddata');


// 1.5 Add New Data
app.post('/api/covid/add', async (req, res) => {
    try {
        const newData = new CovidData(req.body);
        await newData.save();
        res.status(201).send('Data added');
    } catch (err) {
        res.status(400).json({ error: err.message || 'Error adding data' });
    }
});

// 1.6 Update Existing Data
app.post('/api/covid/update', async (req, res) => {
    const { state, cases, deaths, date } = req.body;
    try {
        const updated = await CovidData.updateMany({ state }, { $set: { cases, deaths, date } });
        res.json({ message: `Updated ${updated.modifiedCount} record(s)` });
    } catch (err) {
        res.status(400).json({ error: err.message || 'Error updating data' });
    }
});

// ... existing code ...

// 1.8 Delete a Record
app.post('/api/covid/delete', async (req, res) => {
    const { state } = req.body;
    try {
        const deleted = await CovidData.deleteMany({ state });
        res.json({ message: `Deleted ${deleted.deletedCount} record(s)` });
    } catch (err) {
        res.status(400).json({ error: err.message || 'Error deleting data' });
    }
});



// 1.7 Retrieve Total Cases & Deaths for a state
app.get('/api/covid/total/:state', async (req, res) => {
    const state = req.params.state;
    if (!state) {
        return res.status(400).json({ message: 'State parameter is required' });
    }
    try {
        const result = await CovidData.aggregate([
            { $match: { state: { $regex: new RegExp('^' + state + '$', 'i') } } },
            { $group: {
                _id: "$state",
                totalCases: { $sum: "$cases" },
                totalDeaths: { $sum: "$deaths" }
            }}
        ]);
        if (result.length === 0) {
            return res.json({ state, totalCases: 0, totalDeaths: 0 });
        }
        res.json({ state, totalCases: result[0].totalCases, totalDeaths: result[0].totalDeaths });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



// 1.9 Retrieve Filtered Data
app.get('/api/covid/filter', async (req, res) => {
    const { state, deaths } = req.query;

    try {
        // Validate query parameters
        if (!state || state.trim() === '') {
            return res.status(400).json({ message: 'State parameter is required and cannot be empty' });
        }

        if (deaths && isNaN(deaths)) {
            return res.status(400).json({ message: 'Deaths parameter must be a valid number' });
        }

        // Build query object
        const query = { state: { $regex: new RegExp(state, 'i') } };  // Case-insensitive search
        if (deaths) {
            query.deaths = { $gt: Number(deaths) };  // Filter based on deaths
        }

        const filtered = await CovidData.find(query)
            .sort({ deaths: -1 })  // Sort by deaths in descending order
            .limit(20);  // Limit to 20 records

        res.json(filtered);  // Return filtered records
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 2.0 Retrieve States with High Cases & Deaths
app.get('/api/covid/high', async (req, res) => {
    const { cases, deaths } = req.query;
    try {
        if (!cases || !deaths || isNaN(cases) || isNaN(deaths)) {
            return res.status(400).json({ message: 'Invalid query parameters. Both cases and deaths must be numbers.' });
        }
        const highData = await CovidData.find({
            cases: { $gt: Number(cases) },
            deaths: { $gt: Number(deaths) }
        })
        .sort({ cases: -1, deaths: -1 })
        .limit(20);
        res.json(highData);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
