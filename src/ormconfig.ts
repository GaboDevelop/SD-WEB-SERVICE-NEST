/* eslint-disable prettier/prettier */
import { ConnectionOptions } from 'typeorm';


const config: ConnectionOptions = {
  type: 'postgres',



  //CAMBIAR VARIABLES POR LAS QUE SE NECESITE
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '1234',
  database: 'web-service',






  //entities: ['dist/**/*.entity{.ts,.js}'],
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
    migrations: [__dirname + '/../migrations/**/*{.ts,.js}'],
    cli: {
    migrationsDir: './migrations',
    },
};

export = config;
