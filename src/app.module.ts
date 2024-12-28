import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BudgetModule } from './budget/budget.module';
import { ExpensesModule } from './expenses/expenses.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [BudgetModule, ExpensesModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
