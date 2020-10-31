const ServicePostgres = require('../services/postgres')
const _ServicePg = new ServicePostgres()
const methods = {
    async getUsuarios(request, response) {
        try {
            const sql = 'SELECT * FROM usuarios';
            let responseDB = await _ServicePg.execute(sql);
            let rowCount = responseDB.rowCount
            let rows = responseDB.rows

            let responseJSON = {}
            responseJSON.ok =true
            responseJSON.message = 'Users ok'
            responseJSON.info = rows
            responseJSON.metainfo = {total:rowCount};
            
            response.send(responseJSON);
        } catch (error) {
            console.log(error);
        }      
    },
    saveUsuario(request, response) {
        response.send("Endpoint POST Usuarios");
    },
    updateUsuario(request, response) {
        response.send("Endpoint PUT Usuarios");
    },
    deleteUsuario(request, response) {
        response.send("Endpoint DELETE Usuarios");
    }
}

module.exports = methods;