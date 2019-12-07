const express = require('express'); //requerimos express
const router = express.Router(); //nos crea un objeto para definir rutas de servidor

//importamos modulo de conexion
const mysqlConnection = require('../database');

//CORS --control de aceso para acceder a la api
router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


router.get('/radiobases/fecha/:fecha/radiobase/:base', (req, res) => {
  const fecha = req.params.fecha
  const base = req.params.base
  mysqlConnection.query('SELECT IF(trafico > 0, TRUNCATE(trafico, 2), 0) AS trafico FROM datos WHERE fecha = "'+ fecha +'" AND base = "' + base +'"', (err,rows,fields) => {
    if (!err) {
        res.json(rows);
    }else{
        console.log(err);
    }
  });
});

router.get('/radiobases/:start/paginate/:take', (req, res) => {
  const start = req.params.start
  const take = req.params.take
  mysqlConnection.query('SELECT id,base FROM datos LIMIT '+ start +','+ take, (err, rows, fields) => {
    if (!err) {
        res.json(rows);
    }else{
        console.log(err);
    }
  });
});

router.get('/total-radiobases', (req, res) => {
  mysqlConnection.query('SELECT count(*) AS total_rows FROM datos', (err, rows, fields) => {
    if (!err) {
        res.json(rows);
    }else{
        console.log(err);
    }
  });
});

router.get('/regiones', (req, res) => {
  mysqlConnection.query('SELECT region FROM datos GROUP BY region ORDER BY region', (err, rows, fields) => {
    if (!err) {
        res.json(rows);
    }else{
        console.log(err);
    }
  });
});

router.get('/region/:region', (req, res) => {
  const{region} = req.params;
  mysqlConnection.query('SELECT id,base FROM datos WHERE region = ?', [region], (err, rows, fields) => {
    if (!err) {
        res.json(rows);
    }else{
        console.log(err);
    }
  });
});

router.get('/radiobases/search-base/:base',(req, res) => {
  const{base} = req.params;
  mysqlConnection.query('SELECT id,base FROM datos WHERE base LIKE "%'+ base +'%" LIMIT 40', (err,rows,fields) => {
    if (!err) {
        res.json(rows);
    }else{
        console.log(err);
    }
  });
});

//exportamos la cons router
module.exports = router;