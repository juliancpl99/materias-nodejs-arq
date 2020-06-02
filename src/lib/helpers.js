const bcrypt = require('bcryptjs');

const helpers = {};

helpers.encryptPassword = async (password) => { //encriptar contraseña con bcrypt
    const salt = await bcrypt.genSalt(10); //genSalt genera una hash (entre mas numeros, más cifrado)
    const hash = await bcrypt.hash(password, salt) //genera cifrado de la password
    return hash;
};

helpers.matchPassword = async (password, savedPassword) => { 
    try {
        return await bcrypt.compare(password, savedPassword); //compara si las pws son iguales
    } catch(e) {
        console.log(e);
    }
};

module.exports = helpers; //module.exports es para utilizar esta clase en toda la app