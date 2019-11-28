const express = require('express');
const app = express();
const port = 3000;
const fetch = require('node-fetch');
require('dotenv').config();

const url = 'http://api.openweathermap.org/data/2.5/weather?q=';
const apiId = process.env.EXPRESS_API_ID;

app.use(express.static('public'));

app.get('/:id', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
        fetch(url + req.params.id + apiId)
            .then(response => response.json())
            .then(data => {
                if (data.nam) {}
                console.log(data);
                res.json({city: data.name, temperature: data.main.temp})
            })
})



app.listen(port, () => console.log('Server listening on port ' + port));