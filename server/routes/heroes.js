var express = require('express');
var nodemailer = require('nodemailer');
var router = express.Router();
var pool = require('../config/database-pool.js'); // Creates database pool, if you need to change database, do it in the config object in this file
// var transporter = nodemailer.createTransport();

// return all heroes
router.get('/', function (req, res) {
  pool.connect()
  .then(function (client) {
    client.query('SELECT heroes.*, super_powers.name, super_powers.description FROM heroes JOIN super_powers ON heroes.power_id = super_powers.id')
    .then(function (result) {
      client.release();
      res.send(result.rows);
    })
    .catch(function (err) {
      console.log('error on SELECT', err);
      res.sendStatus(500);
    });
  });
});

router.post('/reportHero', function(req, res){
  var emailBody = req.body;

  var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'peacefulmountain2@gmail.com',
      pass: 'thisismypassword'
    }
  });

  var mailOptions = {
    from: 'peacefulmountain2@gmail.com',
    to: req.body.recipientEmail,
    subject: req.body.subject,
    text: req.body.text
  }

  transporter.sendMail(mailOptions, function(error, info){
    if(error){
      console.log(error);
      res.sendStatus(500);
    }else{
      console.log('Message sent: ' + info.response);
      res.sendStatus(200);
    };
  });
});



router.post('/', function (req, res) {
  var newHero = req.body;
  console.log('New Hero: ', newHero);
  pool.connect()
  .then(function (client) {
    client.query('INSERT INTO heroes (persona, alias, power_id) VALUES ($1, $2, $3)',
    [newHero.persona, newHero.alias, newHero.power_id])
    .then(function (result) {
      client.release();
      res.sendStatus(201);
    })
    .catch(function (err) {
      console.log('error on INSERT', err);
      res.sendStatus(500);
    });
  });
});

router.delete('/:id', function(req, res) {
  var heroId = req.params.id;
  console.log('Deleting hero ID:, ', heroId);
  pool.connect()
  .then(function (client) {
    client.query('DELETE FROM heroes WHERE id = $1',
    [heroId])
    .then(function (result) {
      client.release();
      res.sendStatus(200);
    })
    .catch(function (err) {
      console.log('error on SELECT', err);
      res.sendStatus(500);
    });
  });
});

router.put('/:id', function(req, res) {
  var heroId = req.params.id;
  var hero = req.body;
  console.log('Updating hero:, ', hero);
  pool.connect()
  .then(function (client) {
    client.query('UPDATE heroes SET persona = $1, alias = $2, power_id = $3 WHERE id = $4',
    [hero.persona, hero.alias, hero.power_id, hero.id])
    .then(function (result) {
      client.release();
      res.sendStatus(200);
    })
    .catch(function (err) {
      console.log('error on UPDATE', err);
      res.sendStatus(500);
    });
  });
});


module.exports = router;
