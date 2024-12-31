import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateExpenseDto } from 'src/dto/create-expense.dto';
import { Expense } from 'src/entities/expense.entity';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { ExpensesService } from './expenses.service';

@Controller('expenses')
@UseGuards(JwtAuthGuard)
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Get('budget/:budgetId')
  async getAll(@Param('budgetId') budgetId: number): Promise<Expense[]> {
    return this.expensesService.getExpenses(budgetId);
  }

  @Post()
  async create(
    @Body() createExpenseDto: CreateExpenseDto,
    @Request() req,
  ): Promise<Expense> {
    const userId = req.user.sub;
    return this.expensesService.createExpense(
      userId,
      createExpenseDto.budgetId,
      { ...createExpenseDto },
    );
  }
}
