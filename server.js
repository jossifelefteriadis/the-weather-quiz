const express = require('express');
const app = express();
const port = 3000;
const fetch = require('node-fetch');

const url = 'http://api.openweathermap.org/data/2.5/weather?q=';
const apiId = '&appid=d1380c4e0e849dce680e2ff7c9197e12&units=metric';

app.use(express.static('public'));

app.get('/:id', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
        fetch(url + req.params.id + apiId)
            .then(response => response.json())
            .then(data => {
                res.json({city: data.name, temperature: data.main.temp})
            })
})



app.listen(port, () => console.log('Server listening on port ' + port));