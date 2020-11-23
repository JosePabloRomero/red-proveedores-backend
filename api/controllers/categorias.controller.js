const ServicePostgres = require("../services/postgres");
const _servicePg = new ServicePostgres();

const getCategorias = async (request, response) => {
  try {
    const sql =
      `SELECT * FROM categorias;`;
    let responseDB = await _servicePg.execute(sql);
    let rowCount = responseDB.rowCount;
    let rows = responseDB.rows;  
    let responseJSON = {};
    responseJSON.ok = true;
    responseJSON.message = "Categorías Ok";
    responseJSON.info = rows;
    responseJSON.metainfo = { total: rowCount };
    response.send(responseJSON);
  } catch (error) {
    console.log(error);
    let responseJSON = {};
    responseJSON.ok = false;
    responseJSON.message = "Error obteniendo las categorías.";
    responseJSON.info = error;
    response.status(400).send(responseJSON);
  }
};

const saveCategoria = async (request, response) => {
  try {
    let sql =
      "INSERT INTO public.categorias (nombre, ruta_img)";
    sql += " VALUES($1, $2);";
    let body = request.body;
    let values = [
      body.nombre,
      body.ruta_img
    ];
    await _servicePg.execute(sql, values);
    let responseJSON = {};
    responseJSON.ok = true;
    responseJSON.message = "Categoría creada";
    responseJSON.info = body;
    response.status(201).send(responseJSON);
  } catch (error) {
    let responseJSON = {};
    responseJSON.ok = false;
    responseJSON.message = "Error creando la categoría.";
    responseJSON.info = error;
    response.status(400).send(responseJSON);
  }
};
/**
 *
 * @param {*} request
 * @param {Response} response
 */
const updateCategoria = async (request, response) => {
  try {
    let id = request.params.id;
    let sql =
      "UPDATE public.categorias SET nombre=$1, ruta_img=$2 where id=$3;";
    let body = request.body;
    let values = [
      body.nombre,
      body.ruta_img,
      id,
    ];
    await _servicePg.execute(sql, values);
    let responseJSON = {};
    responseJSON.ok = true;
    responseJSON.message = "Categoría actualizada";
    responseJSON.info = body;
    response.send(responseJSON);
  } catch (error) {
    let responseJSON = {};
    responseJSON.ok = false;
    responseJSON.message = "Error actualizando la categoría.";
    responseJSON.info = error;
    response.status(400).send(responseJSON);
  }
};

/**
 * Delete user
 * @param {Request} request
 * @param {Response} response
 */
const deleteCategoria = async (request, response) => {
  try {
    const sql = "DELETE FROM categorias WHERE id=$1;";
    let id = request.params.id;
    let responseDB = await _servicePg.execute(sql, [id]);
    let rowCount = responseDB.rowCount;
    let responseJSON = {};
    responseJSON.ok = true;
    responseJSON.message = "Categoría eliminada";
    responseJSON.info = [];
    responseJSON.metainfo = { total: rowCount };
    response.send(responseJSON);
  } catch (error) {
    let responseJSON = {};
    responseJSON.ok = false;
    responseJSON.message = "Error eliminando la categoría.";
    responseJSON.info = error;
    response.status(400).send(responseJSON);
  }  
};

const getCategorias_Por_Productos = async (request, response) => {
  try {
    const sql =
      `select categorias.id , categorias.nombre as categoria 
      from categorias
      inner join categorias_productos
      on categorias.id = categorias_productos.id_categoria
      inner join productos 
      on productos.id = categorias_productos.id_producto
      where productos.id = $1;
      `;
      let id = request.params.id;
    let responseDB = await _servicePg.execute(sql , [id]);
    let rowCount = responseDB.rowCount;
    let rows = responseDB.rows;  
    let responseJSON = {};
    responseJSON.ok = true;
    responseJSON.message = "Categorías Ok";
    responseJSON.info = rows;
    responseJSON.metainfo = { total: rowCount };
    response.send(responseJSON);
  } catch (error) {
    console.log(error);
    let responseJSON = {};
    responseJSON.ok = false;
    responseJSON.message = "Error obteniendo las categorías.";
    responseJSON.info = error;
    response.status(400).send(responseJSON);
  }
};



module.exports = { getCategorias, saveCategoria, updateCategoria, deleteCategoria , getCategorias_Por_Productos };