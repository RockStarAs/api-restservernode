const jwt = require('jsonwebtoken');

const generarJWT = (uid = '') => {
    //* EL UID es el identificador único de usuario
    //? La librería de jsonwebtoken trabaja con Callbacks, por eso directamente no podemos usar el AWAIT para esperar su repsuesta, lo que hacemos acá es retornar una promesa, cosa que si puede manejar async o await.    
    return new Promise((resolve, reject) => {

        const payload = { uid }; //Todo el cuerpo que va en el JWT 

        jwt.sign(payload,process.env.SECRET_OR_PUBLIC_KEY,{
            expiresIn: '4h'
        },(err, token)=>{
            if(err){
                console.log(err);
                reject('No se pudo generar el JSON Web Token');
            }else{
                resolve(token);
            }
        });

    });
}


module.exports = {
    generarJWT
}