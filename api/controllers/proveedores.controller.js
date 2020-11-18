const ServicePostgres = require('../services/postgres')
const _ServicePg = new ServicePostgres()
const methods = {
    /**
     * Save user
     * @param {Request} request
     * @param {Response} response 
     */
    async getProveedores(request, response) {
        try {
            const sql = 'SELECT * FROM proveedores';
            let responseDB = await _ServicePg.execute(sql);
            let rowCount = responseDB.rowCount
            let rows = responseDB.rows
            rows = rows.map((x) => {
                delete x.clave;
                return x;
            });

            let responseJSON = {};
            responseJSON.ok = true;
            responseJSON.message = 'Proveedores ok';
            responseJSON.info = rows;
            responseJSON.metainfo = { total: rowCount };
            response.status(201).send(responseJSON);
        } catch (error) {
            let responseJSON = {};
            responseJSON.ok = false;
            responseJSON.message = "Error al obtener los proveedores"
            responseJSON.info = error
            response.status(400).send(responseJSON);
        }

    },
    /**
    * Save user
    * @param {Request} request
    * @param {Response} response 
    */
    async getIdentificaciones(request, response) {
        try {
            const sql = 'SELECT * FROM identificaciones';
            let responseDB = await _ServicePg.execute(sql);
            let rows = responseDB.rows
            let responseJSON = {};
            responseJSON.ok = true;
            responseJSON.message = 'Identificaciones ok';
            responseJSON.info = rows;
            response.status(201).send(responseJSON);
        } catch (error) {
            let responseJSON = {};
            responseJSON.ok = false;
            responseJSON.message = "Error al obtener las identificaciones"
            responseJSON.info = error
            response.status(400).send(responseJSON);
        }

    },
    /**
     * Save user
     * @param {Request} request
     * @param {Response} response 
     */
    async saveProveedor(request, response) {
        try {
            let sql = `INSERT INTO public.proveedores
            (identificacion, tipo_id, nombre, apellido, email, clave, contacto, direccion, descripcion)
            VALUES($1, $2, $3, $4, $5, md5($6), $7, $8, $9);`
            let body = request.body;
            let values = [body.identificacion, body.tipo_id, body.nombre, body.apellido, body.email, body.clave, body.contacto, body.direccion, body.descripcion];
            await _ServicePg.execute(sql, values);
            let responseJSON = {};
            responseJSON.ok = true;
            responseJSON.message = 'Proveedor creado';
            responseJSON.info = body;
            response.send(responseJSON);
        } catch (error) {
            console.log(error)
            let responseJSON = {};
            responseJSON.ok = false;
            responseJSON.message = "Error al guardar el proveedor"
            responseJSON.info = error
            response.status(400).send(responseJSON);
        }
    },
    /**
     * Update user
     * @param {Request} request
     * @param {Response} response 
     */
    async updateProveedor(request, response) {
        try {
            let id = request.params.id;
            let sql = `UPDATE public.proveedores
            SET identificacion=$1, tipo_id=$2, nombre=$3, apellido=$4, email=$5, contacto=$6, direccion=$7, descripcion=$8
            WHERE id=$9;`
            let body = request.body;
            let values = [body.identificacion, body.tipo_id, body.nombre, body.apellido, body.email, body.contacto, body.direccion, body.descripcion, id];
            await _ServicePg.execute(sql, values);
            let responseJSON = {};
            responseJSON.ok = true;
            responseJSON.message = 'Proveedor actualizado';
            responseJSON.info = body;
            response.send(responseJSON);
        } catch (error) {
            let responseJSON = {};
            responseJSON.ok = false;
            responseJSON.message = "Error al actualizar el proveedor"
            responseJSON.info = error
            response.status(400).send(responseJSON);
        }
    },
    /**
     * Delete user
     * @param {Request} request
     * @param {Response} response 
     */
    async deleteProveedor(request, response) {
        try {
            const sql = 'DELETE FROM proveedores WHERE id=$1';
            let id = request.params.id;
            let responseDB = await _ServicePg.execute(sql, [id]);
            let rowCount = responseDB.rowCount
            let responseJSON = {};
            responseJSON.ok = true;
            responseJSON.message = 'Proveedor eliminado';
            responseJSON.info = [];
            responseJSON.metainfo = { total: rowCount };

            response.send(responseJSON);
        } catch (error) {
            let responseJSON = {};
            responseJSON.ok = false;
            responseJSON.message = "Error al eliminar el proveedor"
            responseJSON.info = error
            response.status(400).send(responseJSON);
        }
    },

    /**
     * Buscar proveedor especifico 
     * @param {Request} request
     * @param {Response} response 
     */
    async buscarProveedorEspecifico(request, response) {
        try {

            const sql = `select proveedores.id , proveedores.nombre , proveedores.apellido, proveedores.descripcion, proveedores.direccion, proveedores.contacto
            from proveedores where proveedores.nombre = $1 and proveedores.apellido = $2 ;`;
            let nombre = request.query.nombre;
            let apellido = request.query.apellido;
            let values = [nombre, apellido];
            let responseDB = await _ServicePg.execute(sql, values);
            let rowCount = responseDB.rowCount;
            let rows = responseDB.rows;

            let responseJSON = {};
            responseJSON.ok = true;
            responseJSON.message = "Proveedor encontrado";
            responseJSON.info = rows;
            responseJSON.metainfo = { total: rowCount };
            response.send(responseJSON);
        } catch (error) {
            console.log(error);
            let responseJSON = {};
            responseJSON.ok = false;
            responseJSON.message = "Error al buscar el proveedor"
            responseJSON.info = error
            response.status(400).send(responseJSON);
        }
    },
    async buscarProveedorEspecificoPorId(request, response) {
        try {

            const sql = `select proveedores.id , proveedores.nombre , proveedores.apellido, proveedores.descripcion, proveedores.direccion, proveedores.contacto
            from proveedores where proveedores.id = $1;`;
            let id = request.params.id;
            let values = [id];
            let responseDB = await _ServicePg.execute(sql, values);
            let rowCount = responseDB.rowCount;
            let rows = responseDB.rows;

            let responseJSON = {};
            responseJSON.ok = true;
            responseJSON.message = "Proveedor encontrado";
            responseJSON.info = rows;
            responseJSON.metainfo = { total: rowCount };
            response.send(responseJSON);
        } catch (error) {
            console.log(error);
            let responseJSON = {};
            responseJSON.ok = false;
            responseJSON.message = "Error al buscar el proveedor"
            responseJSON.info = error
            response.status(400).send(responseJSON);
        }
    },

    /**
   * Buscar proveedores por categoria 
   * @param {Request} request
   * @param {Response} response 
   */
    async buscarProveedorPorCategoria(request, response) {
        try {
            let id_categoria = request.params.id;
            const sql = `select proveedores.id , proveedores.nombre , proveedores.apellido , proveedores.contacto , proveedores.email, proveedores.direccion
            from proveedores inner join categorias_proveedores 
            on proveedores.id = categorias_proveedores.id_proveedor
            inner join categorias on categorias.id = categorias_proveedores.id_categoria
            where categorias_proveedores.id_categoria = $1 ;`;

            let values = [
                id_categoria
            ];
            let responseDB = await _ServicePg.execute(sql, values);
            let rowCount = responseDB.rowCount;
            let rows = responseDB.rows;

            let responseJSON = {};
            responseJSON.ok = true;
            responseJSON.message = "Se encontro el proveedor por su categoria especifica";
            responseJSON.info = rows;
            responseJSON.metainfo = { total: rowCount };
            response.send(responseJSON);
        } catch (error) {
            console.log(error);
            let responseJSON = {};
            responseJSON.ok = false;
            responseJSON.message = "Error obteniendo proveedor por categoria.";
            responseJSON.info = error;
            response.status(400).send(responseJSON);
        }
    }




};


module.exports = methods;