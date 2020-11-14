const ServicePostgres = require("../services/postgres");
const _servicePg = new ServicePostgres();

const getCategorias_proveedores = async (request, response) => {
  try {
    const sql =
      `SELECT * from categorias_proveedores`;
    let responseDB = await _servicePg.execute(sql);
    let rowCount = responseDB.rowCount;
    let rows = responseDB.rows;     

    let responseJSON = {};
    responseJSON.ok = true;
    responseJSON.message = "CategoriasProveedores Ok";
    responseJSON.info = rows;
    responseJSON.metainfo = { total: rowCount };
    response.send(responseJSON);
  } catch (error) {
    console.log(error);
    let responseJSON = {};
    responseJSON.ok = false;
    responseJSON.message = "Error obteniendo la categoria proveedor.";
    responseJSON.info = error;
    response.status(400).send(responseJSON);
  }
};

module.exports = { getCategorias_proveedores};