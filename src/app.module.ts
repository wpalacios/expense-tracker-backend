import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BudgetModule } from './budget/budget.module';
import { DatabaseModule } from './database/database.module';
import { ExchangeModule } from './exchange/exchange.module';
import { ExpensesModule } from './expenses/expenses.module';

@Module({
  imports: [
    BudgetModule,
    ExpensesModule,
    DatabaseModule,
    ExchangeModule,
    AuthModule,
    // ConfigModule loads the .env file
    ConfigModule.forRoot({
      isGlobal: true, // Make the configuration globally available throughout the app
    }),

    JwtModule.register({
      secret: process.env.JWT_SECRET, // Access JWT_SECRET from environment variables
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
