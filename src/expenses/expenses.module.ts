import { Module } from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { ExpensesController } from './expenses.controller';
import { Expense } from 'src/entities/expense.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Expense])],
  providers: [ExpensesService],
  controllers: [ExpensesController],
})
export class ExpensesModule {}
