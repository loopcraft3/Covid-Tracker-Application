// covidController.js content placeholder
const CovidData = require('../models/CovidData');

// Add Data
exports.addData = async (req, res) => {
  const { State, Cases, Deaths, Date } = req.body;
  try {
    const newEntry = new CovidData({ State, Cases, Deaths, Date });
    await newEntry.save();
    res.status(201).json({ message: 'Data added' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//  Update Data
exports.updateData = async (req, res) => {
  const { State, Cases, Deaths, Date } = req.body;
  try {
    const result = await CovidData.findOneAndUpdate(
      { State },
      { $set: { Cases, Deaths, Date } },
      { new: true }
    );
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//  Get Total Cases & Deaths
exports.getTotal = async (req, res) => {
  const { state } = req.params;
  try {
    const records = await CovidData.find({ State: state });
    const totalCases = records.reduce((acc, item) => acc + item.Cases, 0);
    const totalDeaths = records.reduce((acc, item) => acc + item.Deaths, 0);
    res.json({ state, totalCases, totalDeaths });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//  Delete Record
exports.deleteData = async (req, res) => {
  const { State } = req.body;
  try {
    await CovidData.deleteOne({ State });
    res.json({ message: 'Record deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//  Filtered Data
exports.getFiltered = async (req, res) => {
  const { state, deaths } = req.query;
  try {
    const result = await CovidData.find({
      State: state,
      Deaths: { $gt: parseInt(deaths) }
    }).limit(20);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//  States with High Cases & Deaths
exports.getHighStates = async (req, res) => {
  const { cases, deaths } = req.query;
  try {
    const result = await CovidData.find({
      Cases: { $gt: parseInt(cases) },
      Deaths: { $gt: parseInt(deaths) }
    });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
