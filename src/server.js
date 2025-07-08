const express = require('express');
const routes = require('./routes');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors({ origin: ['http://172.30.228.62:5173', 'http://localhost:5173', 'http://127.0.0.1:5173'] }));
app.use(express.json());

app.use('/api', routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`);
});