const express = require('express');
const Joi = require('joi');
const app = express();
app.use(express.json());

const players = 
[
    {title: 'Lacazette', squad_number: 9},
    {title: 'Ozil', squad_number: 10},
    {title: 'Aubameyang', squad_number: 14},
    {title: 'Pepe', squad_number: 19},
    {title: 'Xhaka', squad_number: 34},
    {title: 'Ceballos', squad_number: 8},
    {title: 'Bellerin', squad_number: 2},
    {title: 'Luiz', squad_number: 23},
    {title: 'Mustafi', squad_number: 20},
    {title: 'Saka', squad_number: 77},
    {title: 'Leno', squad_number: 1}
];

app.get('/', (req, res) => 
{
    res.send('This API will show you the list of all the current Arsenal first-team players.');
});

app.get('/api/players', (req, res) => 
{
    res.send(players);
});

app.get('/api/players/:squad_number', (req, res) => 
{
    const player = players.find(c => c.squad_number === parseInt(req.params.squad_number));
    if (!player) res.status(404).send('<h2>He is not an Arsenal first-team player !</h2>');
    res.send(player);
});

app.post('/api/players', (req, res) => 
{
    const { error } = validatePlayer(req.body);
    if (error)
    {
        res.status(400).send(error.details[0].message);
        return;
    }
    const player = 
    {
        squad_number: players.length + 1,
        title: req.body.title
    };
    players.push(player);
    res.send(player);
});

app.put('/api/players/:squad_number', (req, res) => 
{
    const player = players.find(c => c.squad_number === parseInt(req.params.squad_number));
    if (!player) res.status(404).send('<h2 >He is not an Arsenal first-team player !</h2>');

    const { error } = validatePlayer(req.body);
    if (error)
    {
        res.status(400).send(error.details[0].message);
        return;
    }

    player.title = req.body.title;
    res.send(player);
});

app.delete('/api/players/:squad_number', (req, res) => 
{
    const player = players.find(c => c.squad_number === parseInt(req.params.squad_number));
    if (!player) res.status(404).send('<h2>He is not an Arsenal first-team player !</h2>');

    const index = players.indexOf(player);
    player.splice(index, 1);


    res.send(player);
});

function validatePlayer(player)
{
    const schema = 
    {
        title: Joi.string().min(3).required()
    };

    return Joi.validate(player, schema);
}

const port = process.env.PORT || 8080;
app.listen(port, () => console.log('Listening on port $(port) ..'));
