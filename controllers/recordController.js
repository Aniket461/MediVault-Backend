const Record = require('../models/Record');
const path = require('path');

exports.uploadRecord = async (req, res) => {
  try {
    const file = req.file;
    if (!file)
      return res.status(400).json({ message: 'No file uploaded' });

    const newRecord = new Record({
      patientId: req.user.userId,
      fileName: file.originalname,
      filePath: file.path,
      uploadedAt: new Date()
    });

    await newRecord.save();

    res.status(201).json({ message: 'Record uploaded successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Upload failed', error: err.message });
  }
};

exports.getPatientRecords = async (req, res) => {
  try {
    const records = await Record.find({ patientId: req.params.patientId });
    res.json(records);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving records', error: err.message });
  }
};
