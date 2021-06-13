
const { response } = require('express');
const Table = require('../models/table-model');

getItems =  async(req, res) => {
    await Table.find({}, (err, items) => {
        if (err) {
            console.error(`400 in 'getItems': ${err}`);
            return res
                .status(400)
                .json({
                    success: false,
                    error: err,
                });
        }
        if (!items.length) {
            console.error(`404 in 'getItems': Items not found`);
            return res
                .status(404)
                .json({
                    success: false,
                    error: 'Items not found',
                });
        }
        console.log(`200 in 'getItems': Items fetched!`);

        return res
            .status(200)
            .json({
                success: true,
                item: items,
            });
    }).catch(err => {
        console.error(`caught error in 'getItemsById': ${err}`);
        console.error(err);
        return err;
    });
};
getItemsById = async(req, res) => {
    console.log("THis is req===>", req.params.id)
    await Table.find({ item: req.params.id }, (err, items) => {
        if (err) {
            console.error(`400 in 'getTreeById': ${err}`);
            return res
                .status(400)
                .json({
                    success: false,
                    error: err,
                });
        }
        if (!items.length) {
            console.error(`404 in 'getItemsId': Item not found`);
            return res
                .status(404)
                .json({
                    success: false,
                    error: 'Item not found',
                });
        }
        console.log(`200 in 'getItemsById': Item fetched!`);
        return res
            .status(200)
            .json({
                success: true,
                item: items[0],
            });
    }).catch(err => {
        console.error(`caught error in 'getItemsById': ${err}`);
        console.error(err);
        return err;
    });
};
createItem = (req, res) => {
    const body = req.body;
    console.log('----------------------- createItem: req -----------------------')
    console.log(req);
    console.log('----------------------- createItem: body -----------------------')
    console.log(body);
    if (!body) {
        return res
            .status(400)
            .json({
                success: false,
                error: 'You must provide an item.',
            });
    }

    const item = new Table(body);
    console.log('----------------------- createItem: item-----------------------')
    console.log(item)

    if (!item) {
        console.error(`400 in 'createItem': 'Item' is malformed.`);
        return res
            .status(400)
            .json({
                success: false,
                message: "'item' is malformed"
            });
    }

    return item
        .save()
        .then((saved) => {
            console.log(saved);
            if (saved) {
                console.error(`201 in 'createItem': Item created!`);
                return res
                    .status(201)
                    .json({
                        success: true,
                        id: item,
                        message: 'Item created!',
                    });
            };
        })
        .catch(err => {
            console.error(`caught error in 'createItem': ${err}`);
            Object.keys(err.errors).forEach(errorKey => {
                console.error(`ERROR for: ${errorKey}`);
                console.error(`=> ${((err.errors[errorKey] || {}).properties || {}).message}`);
            })
            return res
                .status(400)
                .json({
                    success: false,
                    error: err,
                    message: err,
                });
        });
};
updateItem = (req, res) => {

    console.log("This is the body ---->", req.body)
    const body = req.body;
    if (!body) {
        console.error(` 400 in 'updateTree': You must provide an Tree to update.`);
        return res
            .status(400)
            .json({
                success: false,
                error: 'You must provide an item to update.',
            });
    }

    const itemForUpdate = {
        item: req.params.id,
        status: req.body.status,
        history: req.body.history
    };

    console.log('----------------------- updateItem: itemForUpdate :', itemForUpdate);

    return Table.updateOne({ item: req.params.id }, itemForUpdate, (err, writeOpRes) => {
        console.log("This is the item to be updated ->", req.params.id);
        if (err) {
            console.error(`'updateItem': Item not found!`);
            console.error(err);
            return res
                .status(404)
                .json({
                    success: false,
                    error: err,
                    message: 'Item not found!',
                });
        };
        console.log(writeOpRes);
        return writeOpRes;
    })
    .then(result => {
        console.log('----------------------- updateItem - result :', result);
        console.log(result);
        return res
            .status(200)
            .json({
                success: true,
                item: itemForUpdate,
                message: 'Item updated!',
                writeOpResult: result
            });
    }).catch(err => {
        console.error(`caught error in 'updateItem': ${err}`);
        console.error(err);
        return err;
    });
};
deleteItem = async (req, res) => {
    await Table.findOneAndDelete({ _id: req.params.id }, (err, item) => {
        if (err) {
            console.error(`400 in 'deleteTree': ${err}`);
            return res
                .status(400)
                .json({
                    succes: false,
                    error: err,
                });
        }

        if (!item) {
            console.error(` 400 in 'deleteTree': Item not found!`);
            return res
                .status(400)
                .json({
                    success: false,
                    error: 'Tree not found!',
                });
        }

        return res
            .status(200)
            .json({
                success: true,
                item: item,
            });
    }).catch(err => {
        console.error(`caught error in 'deleteItem': ${err}`);
        console.error(err);
        return err;
    });
};
module.exports = {
    getItems,
    getItemsById,
    createItem,
    updateItem,
    deleteItem
};