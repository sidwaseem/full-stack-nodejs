const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const luhn = require('luhn');
const ListItemController = require('./controller');

// API endpoints
router.get('/', ListItemController.defaultItem);
router.get('/api/list', ListItemController.getItems);
router.get('/api/list/:id', ListItemController.getItemById);
router.post('/api/add', [
    check('name').isString().withMessage('Please enter valid name'),
    check('number').custom((value, { req } ) => {
        return luhn.validate(value);
    }).withMessage('Please enter valid card'),
    check('limit').matches(/\d/).withMessage('Please enter numbers only')
], ListItemController.addItem);

module.exports = router;