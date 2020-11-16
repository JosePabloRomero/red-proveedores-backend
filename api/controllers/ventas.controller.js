const ServicePostgres = require("../services/postgres");
const _servicePg = new ServicePostgres();

const getVentas = async (request, response) => {
  let id = request.params.id;
  try {
    const sql =
      `SELECT
      ventas.id AS id_venta,
      ventas.fecha AS fecha_venta,
      estados_venta.nombre AS Estado,
      estados_venta.id AS id_estado,
      usuarios.id AS id_usuario,
      usuarios.nombre AS Nombre_Cliente, 
      usuarios.apellido AS Apellido_Cliente 
      FROM estados_venta 
      INNER JOIN ventas ON ventas.id_estado = estados_venta.id 
      INNER JOIN proveedores ON proveedores.id = ventas.id_proveedor 
      INNER JOIN usuarios ON usuarios.id = ventas.id_usuario 
      WHERE proveedores.id = $1 and estados_venta.id <> 3
      GROUP BY estados_venta.nombre, proveedores.nombre, proveedores.apellido, usuarios.nombre, usuarios.apellido, id_venta, fecha_venta, estados_venta.id, usuarios.id;`;    
    let values = [
      id
    ];    
    let responseDB = await _servicePg.execute(sql, values);
    let rowCount = responseDB.rowCount;
    let rows = responseDB.rows;

    let responseJSON = {};
    responseJSON.ok = true;
    responseJSON.message = "Ventas Ok";
    responseJSON.info = rows;
    responseJSON.metainfo = { total: rowCount };
    response.send(responseJSON);
  } catch (error) {
    console.log(error);
    let responseJSON = {};
    responseJSON.ok = false;
    responseJSON.message = "Error obteniendo venta.";
    responseJSON.info = error;
    response.status(400).send(responseJSON);
  }
};

const getVentasEnCola = async (request, response) => {
  let id = request.params.id;
  try {
    const sql =
      `SELECT
      ventas.id AS id_venta,
      ventas.fecha AS fecha_venta,
      estados_venta.nombre AS Estado,
      estados_venta.id AS id_estado,
      usuarios.id AS id_usuario,
      usuarios.nombre AS Nombre_Cliente, 
      usuarios.apellido AS Apellido_Cliente 
      FROM estados_venta 
      INNER JOIN ventas ON ventas.id_estado = estados_venta.id 
      INNER JOIN proveedores ON proveedores.id = ventas.id_proveedor 
      INNER JOIN usuarios ON usuarios.id = ventas.id_usuario 
      WHERE proveedores.id = $1 and estados_venta.id = 3
      GROUP BY estados_venta.nombre, proveedores.nombre, proveedores.apellido, usuarios.nombre, usuarios.apellido, id_venta, fecha_venta, estados_venta.id, usuarios.id;`;    
    let values = [
      id
    ];    
    let responseDB = await _servicePg.execute(sql, values);
    let rowCount = responseDB.rowCount;
    let rows = responseDB.rows;

    let responseJSON = {};
    responseJSON.ok = true;
    responseJSON.message = "Ventas Ok";
    responseJSON.info = rows;
    responseJSON.metainfo = { total: rowCount };
    response.send(responseJSON);
  } catch (error) {
    console.log(error);
    let responseJSON = {};
    responseJSON.ok = false;
    responseJSON.message = "Error obteniendo venta.";
    responseJSON.info = error;
    response.status(400).send(responseJSON);
  }
};

const saveVenta = async (request, response) => {
  try {
    let sql = `INSERT INTO public.ventas
    (id_estado, id_proveedor, id_usuario, fecha)
    VALUES($1, $2, $3, $4);
    `
    let body = request.body;
    let values = [
      body.id_estado,
      body.id_proveedor,
      body.id_usuario,
      body.fecha,
    ];
    await _servicePg.execute(sql, values);
    let responseJSON = {};
    responseJSON.ok = true;
    responseJSON.message = "Venta creada";
    responseJSON.info = body;
    response.status(201).send(responseJSON);
  } catch (error) {
    let responseJSON = {};
    console.log(error)
    responseJSON.ok = false;
    responseJSON.message = "Error creando la venta.";
    responseJSON.info = error;
    response.status(400).send(responseJSON);
  }
};
/**
 *
 * @param {*} request
 * @param {Response} response
 */
const updateVenta = async (request, response) => {
  try {
    let id = request.params.id;
    let sql =
      "UPDATE public.ventas SET id_estado=$1, id_proveedor=$2, id_usuario=$3, fecha=$4 WHERE id =$5;";
    let body = request.body;
    let values = [
      body.id_estado,
      body.id_proveedor,
      body.id_usuario,
      body.fecha,
      id,
    ];
    await _servicePg.execute(sql, values);
    let responseJSON = {};
    responseJSON.ok = true;
    responseJSON.message = "Venta actualizada";
    responseJSON.info = body;
    response.send(responseJSON);
  } catch (error) {
    let responseJSON = {};
    console.log(error)
    responseJSON.ok = false;
    responseJSON.message = "Error actualizando la venta.";
    responseJSON.info = error;
    response.status(400).send(responseJSON);
  }
};

/**
 * Delete user
 * @param {Request} request
 * @param {Response} response
 */
const deleteVenta = async (request, response) => {
  try {
    const sql = "DELETE FROM ventas WHERE id=$1;";
    let id = request.params.id;
    let responseDB = await _servicePg.execute(sql, [id]);
    let rowCount = responseDB.rowCount;
    let responseJSON = {};
    responseJSON.ok = true;
    responseJSON.message = "Venta eliminada";
    responseJSON.info = [];
    responseJSON.metainfo = { total: rowCount };
    response.send(responseJSON);
  } catch (error) {
    let responseJSON = {};
    responseJSON.ok = false;
    responseJSON.message = "Error eliminando la venta.";
    responseJSON.info = error;
    response.status(400).send(responseJSON);
  }
};

module.exports = { getVentas, saveVenta, updateVenta, deleteVenta, getVentasEnCola };