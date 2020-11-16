const express = require('express');
const router = express.Router();
const controladorUsuarios = require('../controllers/usuarios.controller');
const controladorProveedores = require('../controllers/proveedores.controller');
const controladorAdministradores = require('../controllers/administradores.controller');
const controladorVentas = require('../controllers/ventas.controller');
const controladorCategorias = require('../controllers/categorias.controller');
const controladorCatalogos = require('../controllers/catalogos.controller');
const controladorProductos = require('../controllers/productos.controller');
const controladorAutenticacion = require('../controllers/auth.controller');
const controladorEstados = require('../controllers/estados.controller');
const controladorIdentificaciones = require('../controllers/identificaciones.controller');
const controladorResenas = require('../controllers/resenas.controller');
const controladorCategorias_Productos = require('../controllers/categorias_productos.controller');
const controladorCategorias_Proveedores = require('../controllers/categorias_proveedores.controller');

router.get('/api/v1', (request, response) => {
    response.send("Hola Mundo");
});


router
    //Rutas que no necesitan de estar ingresado
    .get('/api/v1/identificaciones', controladorProveedores.getIdentificaciones)    
    .post('/api/v1/proveedores', controladorProveedores.saveProveedor)
    .post('/api/v1/usuarios', controladorUsuarios.saveUsuario)
    //Login
    .post('/api/v1/login/:id', controladorAutenticacion.login)
    .use('/', controladorAutenticacion.middleware)
    .get('/api/v1/auth', controladorAutenticacion.validToken)    
    
    //usuarios
    .get('/api/v1/usuarios', controladorUsuarios.getUsuarios)
    //.post('/api/v1/usuarios', controladorUsuarios.saveUsuario)
    .put('/api/v1/usuarios/:id', controladorUsuarios.updateUsuario)
    .delete('/api/v1/usuarios/:id', controladorUsuarios.deleteUsuario)

    //proveedores
    .get('/api/v1/proveedores', controladorProveedores.getProveedores)    
    //.post('/api/v1/proveedores', controladorProveedores.saveProveedor)
    .put('/api/v1/proveedores/:id', controladorProveedores.updateProveedor)
    .delete('/api/v1/proveedores/:id', controladorProveedores.deleteProveedor)
    .get('/api/v1/proveedor_especifico/', controladorProveedores.buscarProveedorEspecifico)
    .get('/api/v1/proveedores_categoria/:id', controladorProveedores.buscarProveedorPorCategoria)

    //Administradores
    .get('/api/v1/administradores', controladorAdministradores.getAdministradores)
    .post('/api/v1/administradores', controladorAdministradores.saveAdministrador)
    .put('/api/v1/administradores/:id', controladorAdministradores.updateAdministrador)
    .delete('/api/v1/administradores/:id', controladorAdministradores.deleteAdministrador)

    //Ventas
    .get('/api/v1/ventas/:id', controladorVentas.getVentas)
    .post('/api/v1/ventas', controladorVentas.saveVenta)
    .put('/api/v1/ventas/:id', controladorVentas.updateVenta)
    .delete('/api/v1/ventas/:id', controladorVentas.deleteVenta)

    //Categorias
    .get('/api/v1/categorias', controladorCategorias.getCategorias)
    .post('/api/v1/categorias', controladorCategorias.saveCategoria)
    .put('/api/v1/categorias/:id', controladorCategorias.updateCategoria)
    .delete('/api/v1/categorias/:id', controladorCategorias.deleteCategoria)

    //Catalogos
    .get('/api/v1/catalogos', controladorCatalogos.getCatalogos)
    .post('/api/v1/catalogos', controladorCatalogos.saveCatalogo)
    .put('/api/v1/catalogos/catalogosPDF', controladorCatalogos.saveCatalogoPDF)
    .put('/api/v1/catalogos/:id', controladorCatalogos.updateCatalogo)
    .delete('/api/v1/catalogos/:id', controladorCatalogos.deleteCatalogo)

    //Estados
    .get('/api/v1/estados', controladorEstados.getEstados)
    .post('/api/v1/estados', controladorEstados.saveEstados)
    .put('/api/v1/estados/:id', controladorEstados.updateEstados)
    .delete('/api/v1/estados/:id', controladorEstados.deleteEstados)

    //Identificaciones
    .get('/api/v1/identificaciones', controladorIdentificaciones.getIdentificaciones)
    .post('/api/v1/identificaciones', controladorIdentificaciones.saveIdentificaciones)
    .put('/api/v1/identificaciones/:id', controladorIdentificaciones.updateIdentificaciones)
    .delete('/api/v1/identificaciones/:id', controladorIdentificaciones.deleteIdentificaciones)

    //Reseñas
    .get('/api/v1/resenas', controladorResenas.getResenas)
    .post('/api/v1/resenas', controladorResenas.saveResenas)
    .put('/api/v1/resenas/:id', controladorResenas.updateResenas)
    .delete('/api/v1/resenas/:id', controladorResenas.deleteResenas)
    .get('/api/v1/resenas/:id', controladorResenas.resenas)
    .get('/api/v1/resenas_promedio/:id', controladorResenas.promedio)

    //Categorias_Productos
    .get('/api/v1/categorias_productos', controladorCategorias_Productos.getCategorias_productos)


    //Categorias_Proveedores
    .get('/api/v1/categorias_proveedores', controladorCategorias_Proveedores.getCategorias_proveedores)
    .get('/api/v1/categorias_proveedor/:id', controladorCategorias_Proveedores.categorias_proveedores)
    //Productos
    .get('/api/v1/Productos', controladorProductos.getProductos)
    .get('/api/v1/Productos_Por_Proveedor/:id', controladorProductos.getProductosPorProveedor)
    .post('/api/v1/Productos', controladorProductos.saveProductos)
    .put('/api/v1/Productos/:id', controladorProductos.updateProductos)
    .delete('/api/v1/Productos/:id', controladorProductos.deleteProductos)
    .use('/', controladorAutenticacion.notFound);
    


module.exports = router;