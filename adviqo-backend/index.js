const express = require('express');
const compression = require('compression');
const cors = require('cors');
const bodyParser = require('body-parser');
const { data, sortedAsc, sortedDesc } = require('./faker');

const { PORT, PROXY_SERVER_PORT } = process.env;

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(compression());

const mainRouter = express.Router();

const LIMIT = 20;

mainRouter.get('/', (req, res) => {
	const { page = 1, sortBy } = req.query;
	const start = (page - 1) * LIMIT;
	const end = page * LIMIT;
	let filtered = data;

	if (req.query.sortBy === 'ASC') {
		filtered = sortedAsc;
	} else if (req.query.sortBy === 'DESC') {
		filtered = sortedDesc;
	}
	if (req.query.status) {
		filtered = filtered.filter((i) => i.status === req.query.status);
	}
	if(req.query.reviews) {
		const reviews = req.query.reviews.split(',').map(i => parseInt(i));
		if (reviews.length) {
			filtered = filtered.filter(i => i.reviews >= reviews[0] && i.reviews <= reviews[1]);
		}
	}

	setTimeout(() => {
		return res.json({
			query: req.query,
			payload: {
				total: filtered.length,
				data: filtered.slice(start, end),
				page,
				hasNext: end < filtered.length,
			},
			success: true,
		});
	}, Math.floor(Math.random() * 2000))
});

app.use(mainRouter);

// Getting port from arguments
const port = PROXY_SERVER_PORT || PORT || 8080;

app.listen(port);

// eslint-disable-next-line
console.log(`Server is listening on port: ${port}`);
