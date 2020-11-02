const ServicePostgres = require('../services/postgres')
const _ServicePg = new ServicePostgres()
const methods = {
    /**
     * get user
     * @param {Request} request
     * @param {Response} response 
     */
    async getUsuarios(request, response) {
        try {
            const sql = 'SELECT * FROM usuarios';
            let responseDB = await _ServicePg.execute(sql);
            let rowCount = responseDB.rowCount
            let rows = responseDB.rows
            rows = rows.map((x) => {
                delete x.clave;
                return x;
            });

            let responseJSON = {};
            responseJSON.ok = true;
            responseJSON.message = 'Users ok';
            responseJSON.info = rows;
            responseJSON.metainfo = { total: rowCount };
            response.status(201).send(responseJSON);
        } catch (error) {
            let responseJSON = {};
            responseJSON.ok = false;
            responseJSON.message = "Error al obtener los usuarios"            
            responseJSON.info = error   
            response.status(400).send(responseJSON);
        }
    },
    /**
     * Save user
     * @param {Request} request
     * @param {Response} response 
     */
    async saveUsuario(request, response) {
        try {
            let sql = `INSERT INTO public.usuarios(nombre, apellido, email, clave, contacto) 
        VALUES($1, $2, $3, md5($4), $5);`
            let body = request.body;
            let values = [body.nombre, body.apellido, body.email, body.clave, body.contacto];
            await _ServicePg.execute(sql, values);            
            let responseJSON = {};
            responseJSON.ok = true;
            responseJSON.message = 'Usuario creado';
            responseJSON.info = body;
            response.send(responseJSON);
        } catch (error) {
            let responseJSON = {};
            responseJSON.ok = false;
            responseJSON.message = "Error al guardar el usuario"            
            responseJSON.info = error         
            response.status(400).send(responseJSON);
        }
    },
    /**
     * Update user
     * @param {Request} request
     * @param {Response} response 
     */
    async updateUsuario(request, response) {
        try {
            let id = request.params.id;
            let sql = `UPDATE public.usuarios
            SET nombre=$1, apellido=$2, email=$3, contacto=$4
            WHERE id=$5;`
            let body = request.body;
            let values = [body.nombre, body.apellido, body.email, body.contacto, id];
            await _ServicePg.execute(sql, values);            
            let responseJSON = {};
            responseJSON.ok = true;
            responseJSON.message = 'Usuario actualizado';
            responseJSON.info = body;
            response.send(responseJSON);
        } catch (error) {
            let responseJSON = {};
            responseJSON.ok = false;
            responseJSON.message = "Error al actualizar el usuario"            
            responseJSON.info = error           
            response.status(400).send(responseJSON);
        }
    },
    /**
     * Delete user
     * @param {Request} request
     * @param {Response} response 
     */
    async deleteUsuario(request, response) {
        try {
            const sql = 'DELETE FROM usuarios WHERE id=$1';
            let id = request.params.id;
            let responseDB = await _ServicePg.execute(sql, [id]);
            let rowCount = responseDB.rowCount            
            let responseJSON = {};
            responseJSON.ok = true;
            responseJSON.message = 'Usuario eliminado';
            responseJSON.info = [];
            responseJSON.metainfo = { total: rowCount };

            response.send(responseJSON);
        } catch (error) {
            let responseJSON = {};
            responseJSON.ok = false;
            responseJSON.message = "Error al eliminar el usuario"            
            responseJSON.info = error         
            response.status(400).send(responseJSON);
        }
    }
}

module.exports = methods;