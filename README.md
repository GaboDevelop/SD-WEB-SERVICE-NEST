## Instalacion

para correr el proyecto, debes primero tener instalado postgreSQL, npm y node js. Necesitas crear alguna base de datos 
nueva en postgreSQL y cambiar las variables de conexion del proyecto en la siguiente ruta `/src/ormconfig.ts`. Luego que esten configuradas las variables de entorno y se cree la base de datos vacia, por favor proceda a ejecutar los siguientes comandos de instalacion.

```bash
$ npm install

$ npm run typeorm:migrate migracion

$ npm run typeorm:run

```

## Ejecutar la aplicación  

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```

## License

Nest is [MIT licensed](LICENSE).
