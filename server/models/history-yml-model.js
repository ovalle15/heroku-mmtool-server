const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let YmlSchema = new Schema(
    {
        ymlDoc : {
            type: Object,
            required: true
        }
    }, {
	timestamps: true
});

const HistYml = mongoose.model('historyTrials', YmlSchema);
// console.log("THIS IS THE HistYml -------->", HistYml);
module.exports = HistYml;
