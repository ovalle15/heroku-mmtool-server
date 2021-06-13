const express = require('express');
const TableController = require('../controllers/table-controller')


const router = express.Router();

router.get('/items',  TableController.getItems);
router.get('/item/:id', TableController.getItemsById);
router.post('/item', TableController.createItem);
router.put('/item/:id', TableController.updateItem);
router.delete('/item/:id', TableController.deleteItem);


module.exports = router;