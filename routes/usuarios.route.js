
const { Router } = require('express');
const { check } = require('express-validator');

const router = Router();

const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete, usuariosPath } = require('../controllers/usuarios.controller');
const { verificaRol, verificarCorreo, existeUsuarioByID } = require('../helpers/db_validators');
const { validarCampos } = require('../middlewares/validar-campos');


router.get('/',usuariosGet);

router.put('/:id',[
    check('id','Su id no es válido.').isMongoId(),
    check('id').custom(existeUsuarioByID),
    check('rol').custom(verificaRol), //Si esto esta acá es porque siempre me lo deben mandar
    validarCampos,
],usuariosPut);

router.post('/',[ 
    check('correo', 'El correo no es válido.').isEmail(),
    check('correo').custom(verificarCorreo),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La contraseña es obligatoria y debe tener más de 6 letras.').isLength({min : 6}),
    // check('rol','Debe elegir un valor válido para el rol').isIn(['ROL_ADMIN','ROL_USUARIO']), //Validación de rol, en memoria
    check('rol').custom(verificaRol),
    validarCampos,
],usuariosPost); //enviando middleware en especifico

router.delete('/:id',[
    check('id','Su id no es válido.').isMongoId(),
    check('id').custom(existeUsuarioByID),
    validarCampos
],usuariosDelete);

router.patch('/',usuariosPath);

module.exports = router;
