const ServicePostgres = require('../services/postgres');
const _ServicePg = new ServicePostgres();
const jwt = require('../services/jwt');

/**
 * get user
 * @param {Request} request
 * @param {Response} response 
 */
const login = async (request, response) => {
    let responseJSON = {}
    responseJSON.ok = true;
    try {
        let id = request.params.id
        let sql = "SELECT nombre, apellido, email, descripcion, direccion, contacto "
        switch (id) {
            //Caso 1: rol: usuario
            case "1":
                sql += "FROM usuarios u WHERE u.email=$1 and clave=md5($2)";
                break;
            //Caso 2: rol: proveedor
            case "2":
                sql += "FROM proveedores u WHERE u.email=$1 and clave=md5($2)";
                break;
            //Caso 3: rol: administrador
            case "3":
                sql += "FROM administradores u WHERE u.email=$1 and clave=md5($2)";
                break;

            default:
                break;
        }
        let body = request.body;
        let values = [body.email, body.clave];
        let responseDB = await _ServicePg.execute(sql, values);
        let rowCount = responseDB.rowCount
        if (rowCount == 1) {
            let user = responseDB.rows[0];
            //Este es el rol necesario?
            user.rol = id;
            responseJSON.message = 'El usuario se encuentra en la base de datos';
            responseJSON.info = jwt.createToken(user);
            response.send(responseJSON);
        } else {            
            responseJSON.ok = false;
            responseJSON.message = 'Error al obtener el usuario';
            responseJSON.info = [];
            response.status(404).send(responseJSON);
        }
    } catch (error) {
        console.log(error);
        responseJSON.ok = false;
        responseJSON.message = "Error al obtener el usuario"
        responseJSON.info = error
        response.status(400).send(responseJSON);
    }
};
/**
 * 
 * @param {Request} request
 * @param {Response} response 
 */
const validToken = (request, response) => {
    let responseJSON = {}
    responseJSON.ok = true;
    try {
        responseJSON.message = 'El usuario fue validado';
        responseJSON.info = decodeToken(request);
        response.send(responseJSON);
    } catch (error) {
        responseJSON.ok = false;
        responseJSON.message = "Error al validar"
        responseJSON.info = error
        response.status(400).send(responseJSON);
    }
};
/**
* 
* @param {Request} request 
* @param {Response} response 
* @param {*} next
*/
const middleware = (request, response, next) => {
    try {
        let token = decodeToken(request);
        request._token = token; 
        next()
    } catch (error) {
        let responseJSON = {}
        responseJSON.ok = false;
        responseJSON.message = "Error al validar el middleware"
        responseJSON.info = error
        response.status(400).send(responseJSON);
    }
};
const notFound = (request, response) => {
    let responseJSON = {}
    responseJSON.ok = false;
    responseJSON.message = "Ruta no encontrada"
    responseJSON.info = request.url;
    response.status(404).send(responseJSON);

};
const decodeToken = (request) => {
    let headers = request.headers.authorization.split(" ");
    let token = headers[1];
    return jwt.validToken(token);
};


module.exports = { login, validToken, middleware, notFound, decodeToken };