const express = require('express');
const router = express.Router();
const controladorUsuarios = require('../controllers/usuarios.controller');
const controladorProveedores = require('../controllers/proveedores.controller');
const controladorVentas = require('../controllers/ventas.controller');
const controladorCategorias = require('../controllers/categorias.controller');
const controladorCatalogos = require('../controllers/catalogos.controller');

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
    .get('/api/v1/ventas', controladorVentas.getVentas)
    .post('/api/v1/ventas', controladorVentas.saveVenta)
    .put('/api/v1/ventas/:id', controladorVentas.updateVenta)
    .delete('/api/v1/ventas/:id', controladorVentas.deleteVenta);

router
    .get('/api/v1/categorias', controladorCategorias.getCategorias)
    .post('/api/v1/categorias', controladorCategorias.saveCategoria)
    .put('/api/v1/categorias/:id', controladorCategorias.updateCategoria)
    .delete('/api/v1/categorias/:id', controladorCategorias.deleteCategoria);

router
    .get('/api/v1/catalogos', controladorCatalogos.getCatalogos)
    .post('/api/v1/catalogos', controladorCatalogos.saveCatalogo)
    .put('/api/v1/catalogos/:id', controladorCatalogos.updateCatalogo)
    .delete('/api/v1/catalogos/:id', controladorCatalogos.deleteCatalogo);

module.exports = router;