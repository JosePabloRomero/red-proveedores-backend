process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

if (process.env.NODE_ENV == 'dev') {
    process.env.USER_DB = 'postgres';
    process.env.HOST_DB = 'localhost';
    process.env.DB = 'red_proveedores';
    process.env.PASSWORD_DB = 'root';
    process.env.PORT_DB = 5432;   
} else if (process.env.NODE_ENV == "production") {
    process.env.USER_DB = "postgres";
    process.env.HOST_DB = "localhost";
    process.env.DB = "red_proveedores";
    process.env.PASSWORD_DB = "root";
    process.env.PORT_DB = 5432;
}