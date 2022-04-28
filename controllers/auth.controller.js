const { response } = require('express');
const bcryptjs = require('bcryptjs');


const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generar-jwt');


const login = async(req, res = response) =>{

    const { correo, password } = req.body;
    try{
        //TODO: Verificar si el email existe
        const usuario = await Usuario.findOne({ correo });
        if(!usuario){
            return res.status(400).json({ message: 'Usuario / Pwd no es correcto - correo'});
        }
        //TODO: SI el usuario está activo
        if(!usuario.estado){
            return res.status(400).json({ message: 'Usuario eliminado, no se puede loguear. '});
        }
        //TODO: Verificar la contraseña
        const validarPwd = bcryptjs.compareSync(password,usuario.password);
        if( !validarPwd ){
            return res.status(400).json({ message: 'Contraseña incorrecta. '});
        }
        //TODO: Generar el JWT
        const token = await generarJWT( usuario.id);

        res.json({ 
            msg : 'Login ok',
            usuario,
            token
        });
    }catch(err){
        console.log(err);
        return res.status(500).json({
            msg: 'Ocurrió un error procesando tu solicitud.'
        });
    }
}

module.exports = {
    login
}