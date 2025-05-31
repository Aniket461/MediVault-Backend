
const { getDiagnosisSuggestions } = require('../services/gptService');

exports.getAIDiagnoses = async (req, res) => {
  try {
    const { symptoms } = req.body;

    if (!symptoms) {
      return res.status(400).json({ error: 'Symptoms are required' });
    }

    const result = await getDiagnosisSuggestions(symptoms);
    res.json({ suggestions: result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to get suggestions' });
  }
};