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
    (nivel_satisfaccion, comentario, id_venta, id_estado)
    VALUES($1, $2, $3, $4);
    `
    let body = request.body;
    let values = [
      body.nivel_satisfaccion,
      body.comentario,
      body.id_venta,
      body.id_estado
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
      "UPDATE public.resenas SET nivel_satisfaccion=$1, comentario=$2 WHERE id=$3;";
    let body = request.body;
    let values = [
        body.nivel_satisfaccion,
        body.comentario,
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
const updateEstadoResena = async (request, response) => {
  try {
    let id = request.params.id;
    let sql =
      "UPDATE public.resenas SET id_estado=2 WHERE id=$1;";
    let body = request.body;
    let values = [
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
const resenas = async (request, response) => {
  let id = request.params.id;
  try {
    const sql =
      `select usuarios.id , usuarios.nombre , usuarios.apellido , usuarios.email , usuarios.contacto, resenas.comentario 
      from usuarios inner join ventas 
      on ventas.id_usuario = usuarios.id 
      inner join resenas 
      on resenas.id_venta = ventas.id 
      inner join proveedores 
      on proveedores.id = ventas.id_proveedor
      where proveedores.id = $1;`;   

    let values = [
      id
    ];    
    let responseDB = await _servicePg.execute(sql, values);
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
const promedio = async (request, response) => {
  let id = request.params.id;
  try {
    const sql =
      `select round(avg(resenas.nivel_satisfaccion)) as PromedioNivel from resenas 
      inner join ventas on ventas.id = resenas.id_venta 
      inner join proveedores on proveedores.id = ventas.id_proveedor
      where proveedores.id = $1;`;   

    let values = [
      id
    ];    
    let responseDB = await _servicePg.execute(sql, values);
    let rowCount = responseDB.rowCount;
    let rows = responseDB.rows;

    let responseJSON = {};
    responseJSON.ok = true;
    responseJSON.message = "Promedio Ok";
    responseJSON.info = rows;
    responseJSON.metainfo = { total: rowCount };
    response.send(responseJSON);
  } catch (error) {
    console.log(error);
    let responseJSON = {};
    responseJSON.ok = false;
    responseJSON.message = "Error obteniendo el promedio.";
    responseJSON.info = error;
    response.status(400).send(responseJSON);
  }
};


const getConsultar_Resena_Por_Cliente = async (request, response) => {
  try {
    let id = request.params.id;
    const sql =
      `select resenas.id, proveedores.nombre , proveedores.apellido , estados_venta.nombre  as nombre_del_estado
      from proveedores 
      inner join ventas 
      on proveedores.id = ventas.id_proveedor
      inner join resenas 
      on resenas.id_venta = ventas.id
      inner join estados_venta
      on estados_venta.id = resenas.id_estado
      inner join usuarios 
      on usuarios.id = ventas.id_usuario
      where usuarios.id = $1 and estados_venta.id = 3; `;
    
    let values = [
      id
    ]; 
    let responseDB = await _servicePg.execute(sql , values);
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

const getSatisfaccion_Cliente = async (request, response) => {
  try {

    let id = request.params.id;
    const sql =
      `select resenas.nivel_satisfaccion , resenas.comentario 
      from resenas 
      where resenas.id = $1;`;
    let values = [
      id
    ];
    let responseDB = await _servicePg.execute(sql , values);
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


module.exports = { getResenas, saveResenas, updateResenas, deleteResenas, resenas, promedio , getConsultar_Resena_Por_Cliente , getSatisfaccion_Cliente , updateEstadoResena};