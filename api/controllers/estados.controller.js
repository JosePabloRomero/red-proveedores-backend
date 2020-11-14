const ServicePostgres = require("../services/postgres");
const _servicePg = new ServicePostgres();

const getEstados = async (request, response) => {
  try {
    const sql =
      `SELECT * from estados_venta`;
    let responseDB = await _servicePg.execute(sql);
    let rowCount = responseDB.rowCount;
    let rows = responseDB.rows;     

    let responseJSON = {};
    responseJSON.ok = true;
    responseJSON.message = "Estados Ok";
    responseJSON.info = rows;
    responseJSON.metainfo = { total: rowCount };
    response.send(responseJSON);
  } catch (error) {
    console.log(error);
    let responseJSON = {};
    responseJSON.ok = false;
    responseJSON.message = "Error obteniendo el estado de venta.";
    responseJSON.info = error;
    response.status(400).send(responseJSON);
  }
};

const saveEstados = async (request, response) => {
  try {
    let sql = `INSERT INTO public.estados_venta
    (nombre)
    VALUES($1);
    `
    let body = request.body;
    let values = [
      body.nombre,
    ];
    await _servicePg.execute(sql, values);
    let responseJSON = {};
    responseJSON.ok = true;
    responseJSON.message = "Estado de venta creado";
    responseJSON.info = body;
    response.status(201).send(responseJSON);
  } catch (error) {
    let responseJSON = {};
    console.log(error)
    responseJSON.ok = false;
    responseJSON.message = "Error creando el estado de venta.";
    responseJSON.info = error;
    response.status(400).send(responseJSON);
  }
};
/**
 *
 * @param {*} request
 * @param {Response} response
 */
const updateEstados = async (request, response) => {
  try {
    let id = request.params.id;
    let sql =
      "UPDATE public.estados_venta SET nombre=$1 WHERE id=$2;";
    let body = request.body;
    let values = [
      body.nombre,
      id,
    ];
    await _servicePg.execute(sql, values);
    let responseJSON = {};
    responseJSON.ok = true;
    responseJSON.message = "Estado de venta actualizado";
    responseJSON.info = body;
    response.send(responseJSON);
  } catch (error) {
    let responseJSON = {};
    console.log(error)
    responseJSON.ok = false;
    responseJSON.message = "Error actualizando el estado de venta.";
    responseJSON.info = error;
    response.status(400).send(responseJSON);
  }
};

/**
 * Delete user
 * @param {Request} request
 * @param {Response} response
 */
const deleteEstados = async (request, response) => {
  try {
    const sql = "DELETE FROM estados_venta WHERE id=$1;";
    let id = request.params.id;
    let responseDB = await _servicePg.execute(sql, [id]);
    let rowCount = responseDB.rowCount;
    let responseJSON = {};
    responseJSON.ok = true;
    responseJSON.message = "Estado de venta eliminado";
    responseJSON.info = [];
    responseJSON.metainfo = { total: rowCount };
    response.send(responseJSON);
  } catch (error) {
    let responseJSON = {};
    responseJSON.ok = false;
    responseJSON.message = "Error eliminando el estado de venta.";
    responseJSON.info = error;
    response.status(400).send(responseJSON);
  }
};

module.exports = { getEstados, saveEstados, updateEstados, deleteEstados };