const ServicePostgres = require('../services/postgres')
const _ServicePg = new ServicePostgres()
const methods = {
    async getProveedores(request, response) {
        
            const sql = 'SELECT * FROM proveedores';
            let responseDB = await _ServicePg.execute(sql);
            let rowCount = responseDB.rowCount
            let rows = responseDB.rows

            let responseJSON = {}
            responseJSON.ok =true
            responseJSON.message = 'Users ok'
            responseJSON.info = rows
            responseJSON.metainfo = {total:rowCount};
            
            response.send(responseJSON);
            
    },
    saveProveedor(request, response) {
        response.send("Endpoint POST Proveedor");
    },
    updateProveedor(request, response) {
        let id = request.params.id;
        response.send("Endpoint PUT Proveedor" + id);
    },
    deleteProveedor(request, response) {
        response.send("Endpoint DELETE Proveedor");
    }
}

module.exports = methods;