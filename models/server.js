const express = require('express');
const cors = require('cors');

class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        
        this.usuariosPath = '/api/usuarios';
        //Middlewares
        this.middleware();
    
        //Rutas de la aplicación
        this.routes();
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