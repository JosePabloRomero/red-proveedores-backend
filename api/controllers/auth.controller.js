const ServicePostgres = require('../services/postgres');
const _ServicePg = new ServicePostgres();
const jwt = require('../services/jwt');
const methods = {
    /**
     * get user
     * @param {Request} request
     * @param {Response} response 
     */
    async login(request, response) {
        let responseJSON = {}
        responseJSON.ok = true;
        try {
            let id = request.params.id    
            let sql = "SELECT nombre, apellido, email "        
            switch (id) {
                //Caso 1: rol: usuario
                case "1":
                    sql += "FROM usuarios u WHERE u.id=$1 and clave=md5($2)";
                    break;
                //Caso 2: rol: proveedor
                case "2":
                    sql += "FROM usuarios u WHERE u.id=$1 and clave=md5($2)";
                    break;
                //Caso 3: rol: administrador
                case "3":
                    sql += "FROM usuarios u WHERE u.id=$1 and clave=md5($2)";
                    break;
            
                default:
                    break;
            }
            let body = request.body;
            let values = [body.id, body.clave];
            let responseDB = await _ServicePg.execute(sql, values);
            let rowCount = responseDB.rowCount
            if(rowCount == 1) {                
                let user = responseDB.rows[0];
                responseJSON.message = 'El usuario se encuentra en la base de datos';
                responseJSON.info = jwt.createToken(user);                
                response.send(responseJSON);
            } else {                                
                responseJSON.message = 'El usuario no existe';
                responseJSON.info = [];                
                response.send(responseJSON);
            } 
        } catch (error) {  
            console.log(error);          
            responseJSON.ok = false;
            responseJSON.message = "Error al obtener el usuario"
            responseJSON.info = error
            response.status(400).send(responseJSON);
        }
    },
    validToken(request, response) {
        let responseJSON = {}
        responseJSON.ok = true;
        try {
            let headers = request.headers.authorization.split(" ");
            let token = headers[1];
            responseJSON.message = 'El usuario se encuentra en la base de datos';
            responseJSON.info = jwt.validToken(token);                
            response.send(responseJSON);
        } catch (error) {    
            responseJSON.ok = false;
            responseJSON.message = "Error al obtener el usuario"
            responseJSON.info = error
            response.status(400).send(responseJSON);
        }
    }
}

module.exports = methods;