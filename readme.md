# API para proyecto de bakend

1. Crear el package json `npm init`
2. Crear la estructura
3. Instalar librerías
    -Express `npm i express`
    -Express File upload `npm i express-fileupload`
    -Postgres [https://node-postgres.com] `npm install pg`
    -Nodemon `npm i nodemon` Permite recargar automaticamente el api.
    -jwt `npm install jsonwebtoken`
4. Crear el server que genere el API

# Informacion Importante

1. Se debe de hacer cambios en la base de datos, ya que al construir la base de datos, no agregamos la eliminacion en cascada. Por lo tanto hay usuarios que no pueden ser eliminados debido a esto.
2. El backup de la base de datos, está en la carpeta util, Para hacer el backup desde postgres, deben de crear una nueva base de datos, luego en esta le dan click y buscan el apartado "RESTORE", luego en "Filename" seleccionan los tres punticos y luego seleccionan el backup. Finalmente en "Role name" eligen la opción "postgres"
