import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// TODO: implement postgres db instead of in-memory sqlite
// @Module({
//   imports: [
//     TypeOrmModule.forRoot({
//       type: 'postgres',
//       host: 'localhost',
//       port: 5432,
//       username: 'postgres',
//       password: 'postgres',
//       database: 'expense_tracker',
//       autoLoadEntities: true,
//       synchronize: true,
//     }),
//   ],
// })

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: ':memory:', // This creates an in-memory SQLite database
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
})
export class DatabaseModule {}
