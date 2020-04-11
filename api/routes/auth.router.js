const router = require ('express').Router();
const AuthController = require ('../controllers/auth.controller');
const validate = require('../services/validate');


router.post('/login',
    [validate({
        'users.email': 'required|email|max:30|unique:users.email',
        'users.password': 'required|min:5',
    }), AuthController.login]);

router.post('/logout', AuthController.logout);

router.post('/SignUp',
    [validate({
        'users.email': 'required|email|max:30|unique:users.email',
        'users.password': 'required|min:5',
        'users.user_name': 'required',
        'users.user_surname': 'required',
        'users.phone': 'required|max:13',
        'address.country': 'required',
        'address.state': 'required',
        'address.city': 'required',
        'address.adres': 'required'
    }), AuthController.register]);


module.exports = router;

