const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Company = require('../../models/Company');
const User = require('../../models/User');
const { check, validationResult } = require('express-validator');

// @route   GET api/companies
// @desc    Get current user companies
// @access  Private
router.get('/my', auth, async (req, res) => {
  try {
    const company = await Company.findOne({
      user: req.user.id
    }).populate('user', ['name', 'role']);

    if (!company) {
      return res
        .status(400)
        .json({ msg: 'There is no companies for this user' });
    }

    res.json(company);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});
// @route   POST api/companies
// @desc    Create or update user companies
// @access  Private
router.post(
  '/',
  [
    auth,
    [
      check('name', 'Company name is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      name,
      address,
      phone,
      email,
      type,
      country,
      description,
      nominated,
      assignTo
    } = req.body;
    // Build company object
    const companyFields = {};
    companyFields.user = req.user.id;
    if (name) companyFields.name = name;
    if (address) companyFields.address = address;
    if (phone) companyFields.phone = phone;
    if (email) companyFields.email = email;
    if (type) companyFields.type = type;
    if (country) companyFields.country = country;
    if (description) companyFields.description = description;
    if (nominated) companyFields.nominated = nominated;
    if (assignTo) companyFields.assignTo = assignTo;

    try {
      let company = await Company.findOne({ user: req.user.id });

      if (company) {
        // Update
        company = await Company.findOneAndUpdate(
          { user: req.user.id },
          { $set: companyFields },
          { new: true }
        );
        return res.json(company);
      }

      // Create
      company = new Company(companyFields);
      await company.save();
      res.json(company);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route   GET api/companies
// @desc    Get all companies
// @access  Public
router.get('/', async (req, res) => {
  try {
    const companies = await Company.find().populate('user', ['name', 'role']);
    res.json(companies);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/user/:user_id
// @desc    Get companies by user ID
// @access  Public
router.get('/user/:user_id', async (req, res) => {
  try {
    const company = await Company.findOne({
      user: req.params.user_id
    }).populate('user', ['name', 'role']);

    if (!company) return res.status(400).json({ msg: 'Company not found' });

    res.json(company);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(400).json({ msg: 'Company not found' });
    }
    res.status(500).send('Server error');
  }
});

module.exports = router;
