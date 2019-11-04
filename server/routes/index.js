const express = require('express');
const router = express.Router();
const Apps = require('../models/App');

router.post('/apps', (req, res, next) => {
	const by = req.body.range.by;
	const start = req.body.range.start;
	const max = req.body.range.max;

	let arr = [];

	for (let i = start; i <= max; i++) {
		let digits = i.toString().padStart(3, '0');
		by == 'id' ? arr.push(id) : arr.push(`my-app-${digits}`);
	}

	Apps.find({ [by]: { $in: arr } }).then((result) => {
		res.json(result);
	});
});

module.exports = router;
