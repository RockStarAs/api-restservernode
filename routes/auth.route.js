
const { Router } = require('express');
const { check } = require('express-validator');

const { login, googleSingIn, verificaToken } = require('../controllers/auth.controller');
const { validarJWT } = require('../middlewares');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post('/login',
[
    check('correo','El correo es obligatorio.').isEmail(),
    check('password','La contraseña es obligatorio').not().isEmpty(),
    validarCampos
]
,login);
router.post('/google',
[
    check('id_token','id_token es necesario.').not().isEmpty(),
    validarCampos
]
,googleSingIn);

router.get('/',[validarJWT],verificaToken);
module.exports = router;