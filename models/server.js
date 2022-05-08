const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const {dbConnection} = require('../database/config');
class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        
        this.paths = {
            auth        :   '/api/auth',
            buscar      :   '/api/buscar',
            categorias  :   '/api/categorias',
            usuarios    :   '/api/usuarios',
            productos   :   '/api/productos',
            uploads     :   '/api/uploads',
        };

        //*Conectar a la base de datos
        this.conectarDb();

        //*Middlewares
        this.middleware();
    
        //*Rutas de la aplicación
        this.routes();
    }

    async conectarDb(){
        await dbConnection();
    }

    middleware(){
        //*CORS
        this.app.use( cors() );

        //*Parseo y lectura del body (POSTS parametros)
        this.app.use( express.json() );

        //*Directorio público
        this.app.use( express.static('public') );

        //*Manejo del file upload o la carga de archivos
        this.app.use(fileUpload({
            createParentPath : true ,
            useTempFiles : true,
            tempFileDir : '/tmp/'
        }));

    }

    routes(){
        this.app.use(this.paths.auth, require('../routes/auth.route'));
        this.app.use(this.paths.buscar, require('../routes/buscar.route'));
        this.app.use(this.paths.categorias, require('../routes/categorias.route'));
        this.app.use(this.paths.productos,require('../routes/productos.route'));
        this.app.use(this.paths.usuarios, require('../routes/usuarios.route'));
        this.app.use(this.paths.uploads, require('../routes/uploads.route'));
    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log("Servidor corriendo en el puerto", this.port);
        });
    }
};

module.exports = Server;