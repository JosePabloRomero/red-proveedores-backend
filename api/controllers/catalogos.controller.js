const ServicePostgres = require("../services/postgres");
const _servicePg = new ServicePostgres();

const getCatalogos = async (request, response) => {
  try {
    const sql =
      `SELECT catalogos.id AS ID_Catalogo,
      proveedores.nombre AS Nombre_Proveedor,
      proveedores.apellido AS Apellido_Proveedor
      FROM proveedores
      INNER JOIN catalogos ON proveedores.id = catalogos.id_proveedor
      GROUP BY catalogos.id, proveedores.nombre, proveedores.apellido;`;
    let responseDB = await _servicePg.execute(sql);
    let rowCount = responseDB.rowCount;
    let rows = responseDB.rows;      

    let responseJSON = {};
    responseJSON.ok = true;
    responseJSON.message = "Catálogos Ok";
    responseJSON.info = rows;
    responseJSON.metainfo = { total: rowCount };
    response.send(responseJSON);
  } catch (error) {
    console.log(error);
    let responseJSON = {};
    responseJSON.ok = false;
    responseJSON.message = "Error obteniendo los catálogos.";
    responseJSON.info = error;
    response.status(400).send(responseJSON);
  }
};

const saveCatalogo = async (request, response) => {
  try {
    let sql =
      "INSERT INTO public.catalogos (id_proveedor)";
    sql += " VALUES($1);";
    let body = request.body;
    let values = [
      body.id_proveedor,
    ];
    await _servicePg.execute(sql, values);
    let responseJSON = {};
    responseJSON.ok = true;
    responseJSON.message = "Catálogo creado";
    responseJSON.info = body;
    response.status(201).send(responseJSON);
  } catch (error) {
    let responseJSON = {};
    responseJSON.ok = false;
    responseJSON.message = "Error creando el catálogo.";
    responseJSON.info = error;
    response.status(400).send(responseJSON);
  }
};
/**
 *
 * @param {*} request
 * @param {Response} response
 */
const updateCatalogo = async (request, response) => {
  try {
    let id = request.params.id;
    let sql =
      "UPDATE public.catalogos SET id_proveedor=$1;";
    let body = request.body;
    let values = [
      body.id_proveedor,
      id,
    ];
    await _servicePg.execute(sql, values);
    let responseJSON = {};
    responseJSON.ok = true;
    responseJSON.message = "Catálogo actualizado";
    responseJSON.info = body;
    response.send(responseJSON);
  } catch (error) {
    let responseJSON = {};
    responseJSON.ok = false;
    responseJSON.message = "Error actualizando el catálogo.";
    responseJSON.info = error;
    response.status(400).send(responseJSON);
  }
};

/**
 * Delete user
 * @param {Request} request
 * @param {Response} response
 */
const deleteCatalogo = async (request, response) => {
  try {
    const sql = "DELETE FROM catalogos WHERE id=$1";
    let id = request.params.id;
    let responseDB = await _servicePg.execute(sql, [id]);
    let rowCount = responseDB.rowCount;
    let responseJSON = {};
    responseJSON.ok = true;
    responseJSON.message = "Catálogo eliminado";
    responseJSON.info = [];
    responseJSON.metainfo = { total: rowCount };
    response.send(responseJSON);
  } catch (error) {
    let responseJSON = {};
    responseJSON.ok = false;
    responseJSON.message = "Error eliminando el catálogo.";
    responseJSON.info = error;
    response.status(400).send(responseJSON);
  }
};

module.exports = { getCatalogos, saveCatalogo, updateCatalogo, deleteCatalogo };