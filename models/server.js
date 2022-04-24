const express = require('express');
const cors = require('cors');

const {dbConnection} = require('../database/config');
class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        
        this.usuariosPath = '/api/usuarios';
        //Conectar a la base de datos
        this.conectarDb();

        //Middlewares
        this.middleware();
    
        //Rutas de la aplicación
        this.routes();
    }

    async conectarDb(){
        await dbConnection();
    }

    middleware(){
        //CORS
        this.app.use( cors() );

        //Parseo y lectura del body (POSTS parametros)
        this.app.use( express.json() );

        //Directorio público
        this.app.use( express.static('public') );

    }

    routes(){

        this.app.use(this.usuariosPath, require('../routes/usuarios.route'));
    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log("Servidor corriendo en el puerto", this.port);
        });
    }
};

module.exports = Server;