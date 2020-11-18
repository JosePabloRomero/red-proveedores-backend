const ServicePostgres = require('../services/postgres')
const _ServicePg = new ServicePostgres()
const methods = {
    /**
     * get products
     * @param {Request} request
     * @param {Response} response 
     */
    async getProductos(request, response) {
        try {

            const sql = `select proveedores.nombre as nombre_proveedor , proveedores.apellido as apellido_proveedor , productos.*  
            from productos 
            inner join catalogos 
            on catalogos.id = productos.id_catalogo 
            inner join proveedores 
            on proveedores.id = catalogos.id_proveedor 
            group by proveedores.nombre ,proveedores.apellido , productos.id;`;

            let responseDB = await _ServicePg.execute(sql);
            let rowCount = responseDB.rowCount
            let rows = responseDB.rows

            let responseJSON = {};
            responseJSON.ok = true;
            responseJSON.message = 'products ok';
            responseJSON.info = rows;
            responseJSON.metainfo = { total: rowCount };
            response.status(201).send(responseJSON);
        } catch (error) {
            let responseJSON = {};
            responseJSON.ok = false;
            responseJSON.message = "Error al obtener los productos"
            responseJSON.info = error
            response.status(400).send(responseJSON);
        }
    },
    /**
     * get products
     * @param {Request} request
     * @param {Response} response 
     */
    async getProductoEspecifico(request, response) {
        try {
            let id = request.params.id;
            const sql = `select productos.* from productos where productos.id = $1;`;
            let values = [id];
            let responseDB = await _ServicePg.execute(sql, values);
            let rows = responseDB.rows

            let responseJSON = {};
            responseJSON.ok = true;
            responseJSON.message = 'products ok';
            responseJSON.info = rows;
            response.status(201).send(responseJSON);
        } catch (error) {
            let responseJSON = {};
            responseJSON.ok = false;
            responseJSON.message = "Error al obtener lel producto"
            responseJSON.info = error
            response.status(400).send(responseJSON);
        }
    },
    /**
     * Save products
     * @param {Request} request
     * @param {Response} response 
     */
    async saveProductos(request, response) {
        try {
            let sql = `INSERT INTO public.productos ( nombre , precio , descripcion , id_catalogo) 
        VALUES($1, $2, $3, $4 );`
            let body = request.body;
            let values = [body.nombre, body.precio, body.descripcion, body.id_catalogo];
            await _ServicePg.execute(sql, values);
            let sql2 = `SELECT public.productos.id FROM public.productos where productos.nombre=$1 and productos.precio=$2 and productos.descripcion=$3 and productos.id_catalogo=$4`
            let responseDB = await _ServicePg.execute(sql2, values);
            let rows = responseDB.rows
            let responseJSON = {};
            responseJSON.ok = true;
            responseJSON.message = 'producto creado';
            responseJSON.info = rows;
            response.send(responseJSON);
        } catch (error) {
            let responseJSON = {};
            console.log(error)
            responseJSON.ok = false;
            responseJSON.message = "Error al guardar el producto"
            responseJSON.info = error
            response.status(400).send(responseJSON);
        }
    },
    /**
     * Update products
     * @param {Request} request
     * @param {Response} response 
     */
    async updateProductos(request, response) {
        try {
            let id = request.params.id;
            let sql = `UPDATE public.productos
            SET nombre =$1  , precio=$2 , descripcion=$3 , id_catalogo = $4
            WHERE id=$5;`
            let body = request.body;
            let values = [body.nombre, body.precio, body.descripcion, body.id_catalogo, id];
            await _ServicePg.execute(sql, values);
            let responseJSON = {};
            responseJSON.ok = true;
            responseJSON.message = 'Producto actualizado';
            responseJSON.info = body;
            response.send(responseJSON);
        } catch (error) {
            let responseJSON = {};
            responseJSON.ok = false;
            responseJSON.message = "Error al actualizar el producto"
            responseJSON.info = error
            response.status(400).send(responseJSON);
        }
    },
    /**
     * Delete products
     * @param {Request} request
     * @param {Response} response 
     */
    async deleteProductos(request, response) {
        try {
            const sql = 'DELETE FROM public.productos WHERE id=$1';
            let id = request.params.id;
            let responseDB = await _ServicePg.execute(sql, [id]);
            let rowCount = responseDB.rowCount
            let responseJSON = {};
            responseJSON.ok = true;
            responseJSON.message = 'Producto eliminado';
            responseJSON.info = [];
            responseJSON.metainfo = { total: rowCount };

            response.send(responseJSON);
        } catch (error) {
            let responseJSON = {};
            responseJSON.ok = false;
            responseJSON.message = "Error al eliminar el Producto"
            responseJSON.info = error
            response.status(400).send(responseJSON);
        }
    },
    /**
    * get products
    * @param {Request} request
    * @param {Response} response 
    */
    async getProductosPorProveedor(request, response) {
        try {

            const sql = `select productos.id ,productos.nombre , productos.descripcion , productos.precio, productos.id_catalogo
            from productos 
            inner join catalogos
            on catalogos.id = productos.id_catalogo
            inner join proveedores 
            on proveedores.id = catalogos.id_proveedor
            where proveedores.id = $1;`;
            let id = request.params.id;
            let responseDB = await _ServicePg.execute(sql, [id]);
            let rowCount = responseDB.rowCount
            let rows = responseDB.rows
            let responseJSON = {};
            responseJSON.ok = true;
            responseJSON.message = 'products ok';
            responseJSON.info = rows;
            responseJSON.metainfo = { total: rowCount };
            response.status(201).send(responseJSON);

        } catch (error) {
            let responseJSON = {};
            responseJSON.ok = false;
            responseJSON.message = "Error al obtener los productos"
            responseJSON.info = error
            response.status(400).send(responseJSON);
        }

    },   
    
}

module.exports = methods;