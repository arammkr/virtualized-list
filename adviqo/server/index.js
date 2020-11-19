const express = require('express');
const path = require('path');
const compression = require('compression');
const cors = require('cors');

const { PORT, PROXY_SERVER_PORT } = process.env;

const app = express();

app.use(compression());
app.use(cors());

const mainRouter = express.Router();

// Static application service
mainRouter.use(express.static(path.join(__dirname, '../build')));

mainRouter.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

app.use(mainRouter);

// Getting port from arguments
const port = PROXY_SERVER_PORT || PORT || 3000;

app.listen(port);

// eslint-disable-next-line
console.log(`Server is listening on port: ${port}`);
