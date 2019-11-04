const express = require('express');
const router = express.Router();
const Apps = require('../models/App');

router.post('/apps', (req, res, next) => {
	// Need seach by parameter
	const by = req.body.range.by;
	if (!by) {
		res.json('Please include a mode of search. Example => { by: name }. Allowed values: name, id.');
	}
	// Defining the range for search
	const start = Number(req.body.range.start);
	const end = Number(req.body.range.end);
	const max = Number(req.body.range.max);

	let arr = [];

	for (let i = start || 1; i <= (end || max || 50); i++) {
		let digits = i.toString().padStart(3, '0');
		by == 'id' ? arr.push(id) : arr.push(`my-app-${digits}`);
	}

	// Output based on order wanted
	const orderBy = req.body.range.order;

	if (orderBy != 'asc' && orderBy != 'desc') {
		res.json("'Please include valid value for order. Example => { order: asc }. Allowed values: asc, desc.'");
	}

	order = (data, ordering) => {
		if (ordering == 'asc') {
			return data.sort((a, b) => {
				return a.id - b.id;
			});
		} else {
			return data.sort((a, b) => {
				return b.id - a.id;
			});
		}
	};

	// Searches for the first x amount of apps starting in y index based on either id or name.

	Apps.find({ [by]: { $in: arr } }).then((result) => {
		if (!order) {
			res.json(result);
		} else {
			res.json(order(result, orderBy));
		}
	});
});

module.exports = router;
