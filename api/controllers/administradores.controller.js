const ServicePostgres = require('../services/postgres')
const _ServicePg = new ServicePostgres()
const methods = {
    /**
     * get user
     * @param {Request} request
     * @param {Response} response 
     */
    async getAdministradores(request, response) {
        try {
            const sql = 'SELECT * FROM administradores';
            let responseDB = await _ServicePg.execute(sql);
            let rowCount = responseDB.rowCount
            let rows = responseDB.rows
            rows = rows.map((x) => {
                delete x.clave;
                return x;
            });

            let responseJSON = {};
            responseJSON.ok = true;
            responseJSON.message = 'Administradores ok';
            responseJSON.info = rows;
            responseJSON.metainfo = { total: rowCount };
            response.status(201).send(responseJSON);
        } catch (error) {
            let responseJSON = {};
            responseJSON.ok = false;
            responseJSON.message = "Error al obtener los administradores";
            responseJSON.info = error
            response.status(400).send(responseJSON);
        }
    },
    /**
     * Save user
     * @param {Request} request
     * @param {Response} response 
     */
    async saveAdministrador(request, response) {
        try {
            let sql = `INSERT INTO public.administradores
            (nombre, apellido, email, clave)
            VALUES($1, $2, $3, md5($4));
            `
            let body = request.body;
            let values = [body.nombre, body.apellido, body.email, body.clave];
            await _ServicePg.execute(sql, values);
            let responseJSON = {};
            responseJSON.ok = true;
            responseJSON.message = 'Administrador creado';
            responseJSON.info = body;
            response.send(responseJSON);
        } catch (error) {
            let responseJSON = {};
            responseJSON.ok = false;
            responseJSON.message = "Error al guardar el administrador"
            responseJSON.info = error
            response.status(400).send(responseJSON);
        }
    },
    /**
     * Update user
     * @param {Request} request
     * @param {Response} response 
     */
    async updateAdministrador(request, response) {
        try {
            let id = request.params.id;
            let sql = `UPDATE public.administradores
            SET nombre=$1, apellido=$2, email=$3
            WHERE id=$4;`
            let body = request.body;
            let values = [body.nombre, body.apellido, body.email, id];
            await _ServicePg.execute(sql, values);
            let responseJSON = {};
            responseJSON.ok = true;
            responseJSON.message = 'Administrador actualizado';
            responseJSON.info = body;
            response.send(responseJSON);
        } catch (error) {
            let responseJSON = {};
            responseJSON.ok = false;
            responseJSON.message = "Error al actualizar el administrador"
            responseJSON.info = error
            response.status(400).send(responseJSON);
        }
    },
    /**
     * Delete user
     * @param {Request} request
     * @param {Response} response 
     */
    async deleteAdministrador(request, response) {
        try {
            const sql = 'DELETE FROM administradores WHERE id=$1';
            let id = request.params.id;
            let responseDB = await _ServicePg.execute(sql, [id]);
            let rowCount = responseDB.rowCount
            let responseJSON = {};
            responseJSON.ok = true;
            responseJSON.message = 'Administrador eliminado';
            responseJSON.info = [];
            responseJSON.metainfo = { total: rowCount };

            response.send(responseJSON);
        } catch (error) {
            let responseJSON = {};
            responseJSON.ok = false;
            responseJSON.message = "Error al eliminar el administrador"
            responseJSON.info = error
            response.status(400).send(responseJSON);
        }
    }
}

module.exports = methods;