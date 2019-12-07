const express =  require('express');

const app = express(); //objeto de express

//settings / conf de servidor
app.set('port', process.env.PORT || 3000);       //busca puerto y si no usamos el port 3000

//Middlewares - func ejecutables antes de procesara

app.use(express.json());   //indicamos que queremos los datos en formato json

//Routes - urls para procesar datos

app.use(require('./routes/radiobases'));  //requerimos nuestro archivo de rutas


//inizializamos servidor, y le decimos en que puerto va a escuchar
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});