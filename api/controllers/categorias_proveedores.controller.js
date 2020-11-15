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
const categorias_proveedores = async (request, response) => {
  let id = request.params.id;
  try {
    const sql =
      `select categorias.nombre as nombre_de_la_categoria  from categorias
      inner join categorias_proveedores
      on 
      categorias_proveedores.id_categoria = categorias.id 
      inner join proveedores 
      on 
      proveedores.id = categorias_proveedores.id_proveedor 
      where id_proveedor = $1 ;`;   

    let values = [
      id
    ];    
    let responseDB = await _servicePg.execute(sql, values);
    let rowCount = responseDB.rowCount;
    let rows = responseDB.rows;

    let responseJSON = {};
    responseJSON.ok = true;
    responseJSON.message = "Categorias Ok";
    responseJSON.info = rows;
    responseJSON.metainfo = { total: rowCount };
    response.send(responseJSON);
  } catch (error) {
    console.log(error);
    let responseJSON = {};
    responseJSON.ok = false;
    responseJSON.message = "Error obteniendo la categoria.";
    responseJSON.info = error;
    response.status(400).send(responseJSON);
  }
};

module.exports = { getCategorias_proveedores, categorias_proveedores};