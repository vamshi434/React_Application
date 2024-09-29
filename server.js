//Budget API

const express = require('express');
const cors = require('cors');
const app = express();
const port = 3500;

app.use(cors());


app.get('/budget', (req, res) => {
  const api=require('./budget_data.json');
  res.json(api);
});

app.listen(port, () => {
  console.log(` API served at http://localhost:${port}!`);
});