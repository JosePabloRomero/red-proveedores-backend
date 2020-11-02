const ServicePostgres = require('../services/postgres')
const _ServicePg = new ServicePostgres()
const methods = {
    async getProductos(request, response) {
        
            const sql = 'SELECT * FROM productos';
            let responseDB = await _ServicePg.execute(sql);
            let rowCount = responseDB.rowCount
            let rows = responseDB.rows

            let responseJSON = {}
            responseJSON.ok =true
            responseJSON.message = 'Products ok'
            responseJSON.info = rows
            responseJSON.metainfo = {total:rowCount};
            
            response.send(responseJSON);
            
    },
    saveProductos(request, response) {
        response.send("Endpoint POST Productos");
    },
    updateProductos(request, response) {
        let id = request.params.id;
        response.send("Endpoint PUT Productos" + id);
    },
    deleteProductos(request, response) {
        response.send("Endpoint DELETE Productos");
    }
}

module.exports = methods;