const express = require('express');
const router = express.Router();
const Apps = require('../models/App');
var deparam = require('can-deparam');

router.get('/apps', (req, res, next) => {
	let string = req.originalUrl.replace('/apps', '');
	let data = deparam(string);

	// Need seach by parameter

	const by = data.range.by;
	if (!by) {
		res.json('Please include a mode of search. Example => { by: name }. Allowed values: name, id.');
	}
	// Defining the range for search
	const start = Number(data.range.start);
	const end = Number(data.range.end);
	const max = Number(data.range.max);

	let arr = [];

	for (let i = start || 1; i <= (end || max || 50); i++) {
		let digits = i.toString().padStart(3, '0');
		by == 'id' ? arr.push(i) : arr.push(`my-app-${digits}`);
	}

	// Output based on order wanted
	const orderBy = data.range.order;

	if (orderBy) {
		if (orderBy != 'asc' && orderBy != 'desc') {
			res.json("'Please include valid value for order. Example => { order: asc }. Allowed values: asc, desc.'");
		}
	}

	order = (data, ordering) => {
		if (ordering == 'asc') {
			return data.sort((a, b) => {
				return a.id - b.id;
			});
		} else if (ordering == 'desc') {
			return data.sort((a, b) => {
				return b.id - a.id;
			});
		}
	};

	// Searches for the first x amount of apps starting in y index based on either id or name.

	Apps.find({ [by]: { $in: arr } }).then((result) => {
		if (!orderBy) {
			res.json(result);
		} else {
			res.json(order(result, orderBy));
		}
	});
});

// router.get('/builMongoDB', (req, res, next) => {
// 	for (let i = 0; i < 200; i++) {
// 		let digits = i.toString().padStart(3, '0');
// 		let name = `my-app-${digits}`;
// 		Apps.create({
// 			id: i,
// 			name: name
// 		});
// 	}
// 	Apps.find().then((results) => {
// 		res.json(results);
// 	});
// });

module.exports = router;
