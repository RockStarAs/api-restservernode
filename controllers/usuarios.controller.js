const { response,request } = require('express');


const usuariosGet = (req, res) => {
    //Porbar en postman http://localhost:8080/api/usuarios?nombre=Abel&access=true
    const {nombre = 'Sin nombre', page = 1, access = 'false'} = req.query;
    res.json({
        "ok" : true,
        "msje" : "Hola Abel separado",
        nombre,
        page,
        access
    });
}

const usuariosPut = (req, res) => {
    const id = req.params.id;
    res.json({
        "ok" : true,
        "msje" : "put Abel controlador",
        id
    });
}

const usuariosPost = (req, res) => {

    const { nombre ,edad } = req.body;



    res.json({
        "ok" : true,
        "msje" : "post Abel controlador ",
        nombre,
        edad
    });
}

const usuariosDelete = (req, res) => {
    res.json({
        "ok" : true,
        "msje" : "delete Abel - controlador "
    });
}

const usuariosPath = (req, res) => {
    res.json({
        "ok" : true,
        "msje" : "patch Abel - controlador "
    });
}

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPath
}