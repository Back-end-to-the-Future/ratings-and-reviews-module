const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const axios = require('axios');
const port = 3000;
const url = 'http://52.26.193.201:3000';

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/reviews/:product_id/list', (req, res) => {
  axios.get(`${url}/reviews/${req.params.product_id}/list`)
  .then((response) => {
    res.send(response.data);
  })
  .catch(error => {
    res.send('Error has occurced:', error);
  })
})

app.listen(port, () => {
  console.log(`The server is listening on port ${port}`)
});