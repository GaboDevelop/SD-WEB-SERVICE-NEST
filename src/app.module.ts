import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonsModule } from './persons/persons.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
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
    }),
    PersonsModule,
  ],
})
export class AppModule {}
