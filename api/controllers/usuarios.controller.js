const methods = {
    getUsuarios(request, response) {
        response.send("Endpoint GET Usuarios");
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