const methods = {
    getProveedores(request, response) {
        response.send("Endpoint GET Proveedores");
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