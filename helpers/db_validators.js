const Rol = require('../models/rol');
const Usuario = require('../models/usuario');

const verificaRol = async(rol = '') =>{
    const existeRol = await Rol.findOne({rol});
    //console.log(rol);
    if(!existeRol) throw new Error(`El rol ${ rol } no está registrado en la BD`); //Así funciona el express validator para lanzar un error personalizado
}

//verificar si el correo existe
const verificarCorreo = async(correo = '') => {
    const existeCorreo = await Usuario.findOne({ correo });
    if(existeCorreo){
        //Si existe retornar error
        /*return res.status(400).json({
            msg: "Ese correo ya está registrado"
        });*/
        throw new Error(`El correo ${correo} ya se encuentra registrado en la base de datos`);
    }
}

const existeUsuarioByID = async(id = '') => {
    const existeUsuario = await Usuario.findById(id);
    if(!existeUsuario){
        throw new Error(`El usuario con id : ${id} no existe.`);
    }
}

module.exports = { 
    verificaRol,
    verificarCorreo,
    existeUsuarioByID,
}
