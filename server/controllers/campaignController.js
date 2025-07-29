const Campaign = require('../models/Campaign');

exports.getAllCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find().sort({ createdAt: -1 });
    res.json({ campaigns });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createCampaign = async (req, res) => {
  try {
    const { title, status, description, image } = req.body;
    if (!title) return res.status(400).json({ error: 'Title is required' });
    const campaign = new Campaign({ title, status, description, image });
    await campaign.save();
    res.status(201).json({ message: 'Campaign created', campaign });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateCampaign = async (req, res) => {
  try {
    const { title, status, description, image } = req.body;
    const campaign = await Campaign.findByIdAndUpdate(
      req.params.id,
      { title, status, description, image },
      { new: true, runValidators: true }
    );
    if (!campaign) return res.status(404).json({ error: 'Campaign not found' });
    res.json({ message: 'Campaign updated', campaign });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findByIdAndDelete(req.params.id);
    if (!campaign) return res.status(404).json({ error: 'Campaign not found' });
    res.json({ message: 'Campaign deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
