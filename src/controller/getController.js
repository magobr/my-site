async function get(){
    const testemodel = require('../model/testemodel')
    console.log('Começou!');

    const clientes = await testemodel.selectCustomers();
    return clientes
};

module.exports = {get}