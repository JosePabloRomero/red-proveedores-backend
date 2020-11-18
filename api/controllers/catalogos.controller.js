const ServicePostgres = require("../services/postgres");
const _servicePg = new ServicePostgres();

const getCatalogos = async (request, response) => {
  try {
    const sql =
      `SELECT catalogos.id AS id_catalogo,
      proveedores.nombre AS nombre_proveedor,
      proveedores.apellido AS apellido_proveedor,
      proveedores.id AS id_proveedor
      FROM proveedores
      INNER JOIN catalogos ON proveedores.id = catalogos.id_proveedor
      GROUP BY catalogos.id, proveedores.nombre, proveedores.apellido, proveedores.id;`;
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

const getCatalogoProveedor = async (request, response) => {
  try {
    let id = request.params.id;
    const sql =
      `select catalogos.id as id_catalogo, catalogos.id_proveedor as id_proveedor from public.catalogos where catalogos.id_proveedor = $1`;
    let values = [id]
    let responseDB = await _servicePg.execute(sql, values);
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
const saveCatalogoPDF = async (request, response) => {
  try {
    let archivo = request.files.fileUpload;
    let name = archivo.name;
    let ext = name.split('.');
    ext = ext[ext.length - 1];
    if (ext === 'pdf') {
      await archivo.mv(`docs/${archivo.name}`);
      let responseJSON = {};
      responseJSON.ok = true;
      responseJSON.message = "Archivo guardado con exito";
      responseJSON.info = archivo.name;
      response.status(201).send(responseJSON);
    } else {
      let responseJSON = {};
      responseJSON.ok = false;
      responseJSON.message = "El archivo solo puede ser un pdf";
      responseJSON.info = archivo.name;
      response.status(400).send(responseJSON);
    }

  } catch (error) {
    console.log(error)
    let responseJSON = {};
    responseJSON.ok = false;
    responseJSON.message = "Error al subir el arhivo del catalogo";
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
  const catalogoProveedor =  async (request, response) => {
  try {
      const sql = `select * from catalogos where id_proveedor = $1;`;
      let id = request.params.id;
      let values = [id];
      let responseDB = await _ServicePg.execute(sql, values);
      let rowCount = responseDB.rowCount;
      let rows = responseDB.rows;

      let responseJSON = {};
      responseJSON.ok = true;
      responseJSON.message = "Catálogo encontrado";
      responseJSON.info = rows;
      responseJSON.metainfo = { total: rowCount };
      response.send(responseJSON);
  } catch (error) {
      console.log(error);
      let responseJSON = {};
      responseJSON.ok = false;
      responseJSON.message = "Error al buscar el catálogo"
      responseJSON.info = error
      response.status(400).send(responseJSON);
  }
}


module.exports = { getCatalogos, saveCatalogo, saveCatalogoPDF, updateCatalogo, deleteCatalogo, catalogoProveedor };