
const HistYml = require('../models/history-yml-model')
const fs = require('fs');
const yaml = require('js-yaml');



uploadYml = async (req, res) => {
    console.log("=================file uploaded============")
    console.log(req.file)
    const File = yaml.load(fs.readFileSync(req.file.path))


    const fileToInsert = {
        ymlDoc: File
    }

    console.log("This is the file To Insert ========> ", fileToInsert.ymlDoc)
    const yml = HistYml(fileToInsert)
    console.log('----------------------- createItem: yml-----------------------')
    console.log(yml)

    return yml
        .save()
        .then((saved) => {
            console.log(saved);
            if (saved) {
                console.log(`201 in 'createItem': Item created!`);
                return res
                    .status(201)
                    .json({
                        success: true,
                        id: yml,
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
module.exports = {
    uploadYml
};