import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { Expense } from 'src/entities/expense.entity';
import { CreateExpenseDto } from 'src/dto/create-expense.dto';

@Controller('expenses')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Get('budget/:budgetId')
  async getAll(@Param('budgetId') budgetId: number): Promise<Expense[]> {
    return this.expensesService.getExpenses(budgetId);
  }

  @Post()
  async create(@Body() createExpenseDto: CreateExpenseDto): Promise<Expense> {
    const userId = 1;
    return this.expensesService.createExpense(
      userId,
      createExpenseDto.budgetId,
      { ...createExpenseDto },
    );
  }
}
