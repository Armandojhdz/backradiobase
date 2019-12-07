 const mysql = require('mysql'); //REQUERIMOS

//nos conectamos a la BD - retorna objeto
 const mysqlConnection = mysql.createConnection({
    host:'127.0.0.1',
    user: 'root',
    password: '',
    database: 'system'
});

mysqlConnection.connect(function(err){
    if (err) {
        console.log(err);
        return
    }else{
        console.log('Db is connected');
    }
});

//exportamos este modulo para usarlo en otras partes
module.exports = mysqlConnection;