const ServicePostgres = require("../services/postgres");
const _servicePg = new ServicePostgres();

const getIdentificaciones = async (request, response) => {
  try {
    const sql =
      `SELECT * from identificaciones`;
    let responseDB = await _servicePg.execute(sql);
    let rowCount = responseDB.rowCount;
    let rows = responseDB.rows;     

    let responseJSON = {};
    responseJSON.ok = true;
    responseJSON.message = "Identificaciones Ok";
    responseJSON.info = rows;
    responseJSON.metainfo = { total: rowCount };
    response.send(responseJSON);
  } catch (error) {
    console.log(error);
    let responseJSON = {};
    responseJSON.ok = false;
    responseJSON.message = "Error obteniendo la identificación.";
    responseJSON.info = error;
    response.status(400).send(responseJSON);
  }
};

const saveIdentificaciones = async (request, response) => {
  try {
    let sql = `INSERT INTO public.identificaciones
    (nombre)
    VALUES($1);
    `
    let body = request.body;
    let values = [
      body.id,
      body.nombre,
    ];
    await _servicePg.execute(sql, values);
    let responseJSON = {};
    responseJSON.ok = true;
    responseJSON.message = "Identificación creada";
    responseJSON.info = body;
    response.status(201).send(responseJSON);
  } catch (error) {
    let responseJSON = {};
    console.log(error)
    responseJSON.ok = false;
    responseJSON.message = "Error creando la identficación.";
    responseJSON.info = error;
    response.status(400).send(responseJSON);
  }
};
/**
 *
 * @param {*} request
 * @param {Response} response
 */
const updateIdentificaciones = async (request, response) => {
  try {
    let id = request.params.id;
    let sql =
      "UPDATE public.identificaciones SET nombre=$1 WHERE id=$2;";
    let body = request.body;
    let values = [
      body.nombre,
      id,
    ];
    await _servicePg.execute(sql, values);
    let responseJSON = {};
    responseJSON.ok = true;
    responseJSON.message = "Identificación actualizada";
    responseJSON.info = body;
    response.send(responseJSON);
  } catch (error) {
    let responseJSON = {};
    console.log(error)
    responseJSON.ok = false;
    responseJSON.message = "Error actualizando la identificación.";
    responseJSON.info = error;
    response.status(400).send(responseJSON);
  }
};

/**
 * Delete user
 * @param {Request} request
 * @param {Response} response
 */
const deleteIdentificaciones = async (request, response) => {
  try {
    const sql = "DELETE FROM identificaciones WHERE id=$1;";
    let id = request.params.id;
    let responseDB = await _servicePg.execute(sql, [id]);
    let rowCount = responseDB.rowCount;
    let responseJSON = {};
    responseJSON.ok = true;
    responseJSON.message = "Identificación eliminada";
    responseJSON.info = [];
    responseJSON.metainfo = { total: rowCount };
    response.send(responseJSON);
  } catch (error) {
    let responseJSON = {};
    responseJSON.ok = false;
    responseJSON.message = "Error eliminando la identificación.";
    responseJSON.info = error;
    response.status(400).send(responseJSON);
  }
};

module.exports = {getIdentificaciones, saveIdentificaciones, updateIdentificaciones, deleteIdentificaciones};