
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let TableSchema = new Schema(
    {
        item: {
            type: String,
            required: true
        },
        status : {
            type: String,
            require: true
        },
        history: {
            type: Array,
            of: Object,
            required: false
        }
    }, {
	timestamps: true
});

const Table = mongoose.model('items', TableSchema);
// console.log("THIS IS THE Table ---->", Table);
module.exports = Table;























