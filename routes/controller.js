const fs = require('fs');
const { validationResult } = require('express-validator');
const Cards = require('../model/cards');

/**
 * Routes controller
 * @class ListController
 */
class ListController {
    constructor() {
        this.cards = [];
        this.jsonContent = [];

        this.getItems = this.getItems.bind(this);
        this.addItem = this.addItem.bind(this);
    }
    /**
     * Server router for root page
     * @function defaultItem
     * @param {Object} req request object
     * @param {Object} res response object
     * @returns {String} response markup
     */
    defaultItem(req, res) {
        res.header('Content-type', 'text/html');
        return res.end('<h1>Welcome, Credit card System</h1>');
    }

    /**
     * Fetch all items from DB
     * @function getItems
     * @param {Object} req request object
     * @param {Object} res response object
     * @returns {Object} JSON object with database items
     */
    async getItems(req, res) {
        try {
            const cards = await Cards.find();
            return res.status(200).send({
                success: 'true',
                list: JSON.parse(cards)
            });
        } catch (err) {
            res.status(500).json({ message: err.message })
        }
        // json data
        // fs.readFile('./db/db.json', (err, data) => {
        //     if (err) {
        //         return res.status(404).send({
        //             success: false,
        //             list: []
        //         });
        //     }

        //     this.cards = JSON.parse(data);
        //     return res.status(200).send({
        //         success: 'true',
        //         list: this.cards
        //     });
        // });
    }

    /**
     * Add Item to DB
     * @function addItem
     * @param {Object} req request object
     * @param {Object} res response object
     * @returns {Object} JSON object with newly added item
     */
    async addItem(req, res) {
        // const result = validationResult(req);
        const result = new Cards({
            id: ++this.cards.length,
            name: req.body.name,
            number: req.body.number,
            limit: req.body.limit,
            balance: 0
        })

        try {
            const newCard = await result.save();
            res.send(201).json(newCard);
        } catch (err) {
            res.status(400).json({
                success: false,
                errors: err.mapped()
            });
        }
        // bail out if errors
        // if (!result.isEmpty()) {
        //     return res.status(400).json({
        //         success: false,
        //         errors: result.mapped()
        //     });
        // }

        // const card = {
        //     id: this.cards.length + 1,
        //     name: req.body.name,
        //     number: req.body.number,
        //     limit: req.body.limit,
        //     balance: 0
        // };

        // // update json
        // this.jsonContent = [...this.cards, card];

        // // write updated cards list to file
        // fs.writeFile('./db/db.json', JSON.stringify(this.jsonContent, null, 2), 'utf8', function (err) {
        //     if (err) {
        //         // send response back
        //     return res.status(201).send({
        //         success: false,
        //         message: 'Failed to add card',
        //         cards: this.cards
        //     });
        //     }
        // });

        // // send response back
        // return res.status(201).send({
        //     success: true,
        //     message: 'car added successfully',
        //     cards: this.jsonContent
        // });
    }

    /**
     * Fetch single item from DB against given ID
     * @function getItemById
     * @param {Object} req request object
     * @param {Object} res response object
     * @returns {Object} JSON object with database item
     */
    getItemById(req, res) {
        const id = parseInt(req.params.id, 10);

        // iterate over db
        this.cards.map((list) => {
            if (list.id === id) {
                return res.status(200).send({
                    success: 'true',
                    message: 'list retrieved successfully',
                    list,
                });
            }
        });
        // fallback
        return res.status(404).send({
            success: 'false',
            message: 'data does not exist',
        });
    }
};

const ListItemController = new ListController();

module.exports = ListItemController;
