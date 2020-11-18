const ServicePostgres = require("../services/postgres");
const _servicePg = new ServicePostgres();

const getCategorias_productos = async (request, response) => {
  try {
    const sql =
      `SELECT * from categorias_productos`;
    let responseDB = await _servicePg.execute(sql);
    let rowCount = responseDB.rowCount;
    let rows = responseDB.rows;

    let responseJSON = {};
    responseJSON.ok = true;
    responseJSON.message = "CategoriasProductos Ok";
    responseJSON.info = rows;
    responseJSON.metainfo = { total: rowCount };
    response.send(responseJSON);
  } catch (error) {
    console.log(error);
    let responseJSON = {};
    responseJSON.ok = false;
    responseJSON.message = "Error obteniendo la categoria producto.";
    responseJSON.info = error;
    response.status(400).send(responseJSON);
  }
};
const agregarCategoriaProducto = async (request, response) => {
  try {
    let sql = `INSERT INTO public.categorias_productos ( id_categoria , id_producto) 
      VALUES($1, $2);`
    let body = request.body;
    let values = [body.id_categoria, body.id_producto];
    await _servicePg.execute(sql, values);
    let responseJSON = {};
    responseJSON.ok = true;
    responseJSON.message = 'Categoria correctamente agregada al producto';
    responseJSON.info = body;
    response.send(responseJSON);
  } catch (error) {
    let responseJSON = {};
    console.log(error)
    responseJSON.ok = false;
    responseJSON.message = "Error al agregar la categoria"
    responseJSON.info = error
    response.status(400).send(responseJSON);
  }
};
const eliminarCategoriaProducto = async (request, response) => {
  try {

    const sql = `DELETE FROM categorias_productos WHERE id_categoria=$1 and id_producto=$2;`;
    let id_categoria = parseInt(request.query.id_categoria) ;
    let id_producto = parseInt(request.query.id_producto);
    let values = [id_categoria, id_producto];
    let responseDB = await _servicePg.execute(sql, values);
    let rowCount = responseDB.rowCount;
    let responseJSON = {};
    responseJSON.ok = true;
    responseJSON.message = "Categoria de producto eliminada";
    responseJSON.info = [];
    responseJSON.metainfo = { total: rowCount };
    response.send(responseJSON);
  } catch (error) {
    console.log(error);
    let responseJSON = {};
    responseJSON.ok = false;
    responseJSON.message = "Error al eliminar la categoria del producto"
    responseJSON.info = error
    response.status(400).send(responseJSON);
  }
};

module.exports = { getCategorias_productos, agregarCategoriaProducto, eliminarCategoriaProducto };