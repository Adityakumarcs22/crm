const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
const validateCustomer = require('../middleware/validateCustomer');


router.get('/', customerController.getAllCustomers);
router.post('/', validateCustomer, customerController.createCustomer);
router.get('/:id', customerController.getCustomerById);
router.put('/:id', validateCustomer, customerController.updateCustomer);
router.delete('/:id', customerController.deleteCustomer);

module.exports = router;
