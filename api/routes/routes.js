const express = require('express');
const router = express.Router();
const controladorUsuarios = require('../controllers/usuarios.controller');
const controladorProveedores = require('../controllers/proveedores.controller');
const controladorProductos = require('../controllers/productos.controller');

router.get('/api/v1', (request, response) => {
    response.send("Hola Mundo");
});

router
    .get('/api/v1/usuarios', controladorUsuarios.getUsuarios)
    .post('/api/v1/usuarios', controladorUsuarios.saveUsuario)
    .put('/api/v1/usuarios/:id', controladorUsuarios.updateUsuario)
    .delete('/api/v1/usuarios/:id', controladorUsuarios.deleteUsuario);

router
    .get('/api/v1/proveedores', controladorProveedores.getProveedores)
    .post('/api/v1/proveedores', controladorProveedores.saveProveedor)
    .put('/api/v1/proveedores/:id', controladorProveedores.updateProveedor)
    .delete('/api/v1/proveedores/:id', controladorProveedores.deleteProveedor);

router
    .get('/api/v1/Productos', controladorProductos.getProductos)
    .post('/api/v1/Productos', controladorProductos.saveProductos)
    .put('/api/v1/Productos/:id', controladorProductos.updateProductos)
    .delete('/api/v1/Productos/:id', controladorProductos.deleteProductos);    

module.exports = router;