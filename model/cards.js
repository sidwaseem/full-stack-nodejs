const mongoose = require('mongoose');

const cardSchema = mongoose.Schema({
    "id":  {
        type: Number
    },
    "name": {
        type: String,
        required: true
    },
    "number": {
        type: String,
        required: true
    },
    "limit":  {
        type: String,
        required: true
    },
    "balance":  {
        type: String,
    }
});

module.exports = mongoose.model('Cards', cardSchema);
