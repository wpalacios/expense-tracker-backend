import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BudgetModule } from './budget/budget.module';
import { ExpensesModule } from './expenses/expenses.module';
import { DatabaseModule } from './database/database.module';
import { ExchangeModule } from './exchange/exchange.module';

@Module({
  imports: [BudgetModule, ExpensesModule, DatabaseModule, ExchangeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
