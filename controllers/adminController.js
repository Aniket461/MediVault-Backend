const User = require('../models/User');

exports.getPendingUsers = async (req, res) => {
  try {
    const pendingUsers = await User.find({ accountStatus: 'pending' }).select('-password');
    res.status(200).json(pendingUsers);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.updateUserStatus = async (req, res) => {
  const { userId } = req.params;
  const { status, rejectedReason } = req.body;

  if (!['approved', 'rejected'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status' });
  }

  // If rejecting and no reason provided, throw error
  if (status === 'rejected' && !rejectedReason) {
    return res.status(400).json({ message: 'Rejected reason is required' });
  }

  try {
    const updateFields = { status: status };
    if (status === 'rejected') {
      updateFields.rejectedReason = rejectedReason;
    } else {
      updateFields.$unset = { rejectedReason: '' }; // Clear if previously rejected
    }

    const user = await User.findByIdAndUpdate(
      userId,
      updateFields,
      { new: true }
    ).select('-password');

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ message: 'User status updated', user });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
