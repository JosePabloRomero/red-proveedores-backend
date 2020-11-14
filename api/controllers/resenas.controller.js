const ServicePostgres = require("../services/postgres");
const _servicePg = new ServicePostgres();

const getResenas = async (request, response) => {
  try {
    const sql =
      `SELECT * from resenas`;
    let responseDB = await _servicePg.execute(sql);
    let rowCount = responseDB.rowCount;
    let rows = responseDB.rows;     

    let responseJSON = {};
    responseJSON.ok = true;
    responseJSON.message = "Reseñas Ok";
    responseJSON.info = rows;
    responseJSON.metainfo = { total: rowCount };
    response.send(responseJSON);
  } catch (error) {
    console.log(error);
    let responseJSON = {};
    responseJSON.ok = false;
    responseJSON.message = "Error obteniendo la reseña.";
    responseJSON.info = error;
    response.status(400).send(responseJSON);
  }
};

const saveResenas = async (request, response) => {
  try {
    let sql = `INSERT INTO public.resenas
    (nivel_satisfaccion, comentario, id_venta)
    VALUES($1, $2, $3);
    `
    let body = request.body;
    let values = [
      body.nivel_satisfaccion,
      body.comentario,
      body.id_venta,
    ];
    await _servicePg.execute(sql, values);
    let responseJSON = {};
    responseJSON.ok = true;
    responseJSON.message = "Reseña creada";
    responseJSON.info = body;
    response.status(201).send(responseJSON);
  } catch (error) {
    let responseJSON = {};
    console.log(error)
    responseJSON.ok = false;
    responseJSON.message = "Error creando la reseña.";
    responseJSON.info = error;
    response.status(400).send(responseJSON);
  }
};
/**
 *
 * @param {*} request
 * @param {Response} response
 */
const updateResenas = async (request, response) => {
  try {
    let id = request.params.id;
    let sql =
      "UPDATE public.resenas SET nivel_satisfaccion=$1, comentario=$2, id_venta=$3 WHERE id=$4;";
    let body = request.body;
    let values = [
        body.nivel_satisfaccion,
        body.comentario,
        body.id_venta,
        id,
    ];
    await _servicePg.execute(sql, values);
    let responseJSON = {};
    responseJSON.ok = true;
    responseJSON.message = "Reseña actualizada";
    responseJSON.info = body;
    response.send(responseJSON);
  } catch (error) {
    let responseJSON = {};
    console.log(error)
    responseJSON.ok = false;
    responseJSON.message = "Error actualizando la reseña.";
    responseJSON.info = error;
    response.status(400).send(responseJSON);
  }
};

/**
 * Delete user
 * @param {Request} request
 * @param {Response} response
 */
const deleteResenas = async (request, response) => {
  try {
    const sql = "DELETE FROM resenas WHERE id=$1;";
    let id = request.params.id;
    let responseDB = await _servicePg.execute(sql, [id]);
    let rowCount = responseDB.rowCount;
    let responseJSON = {};
    responseJSON.ok = true;
    responseJSON.message = "Reseña eliminada";
    responseJSON.info = [];
    responseJSON.metainfo = { total: rowCount };
    response.send(responseJSON);
  } catch (error) {
    let responseJSON = {};
    responseJSON.ok = false;
    responseJSON.message = "Error eliminando la reseña.";
    responseJSON.info = error;
    response.status(400).send(responseJSON);
  }
};

module.exports = { getResenas, saveResenas, updateResenas, deleteResenas };