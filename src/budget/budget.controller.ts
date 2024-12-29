import { Body, Controller, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { BudgetService } from './budget.service';
import { Budget } from 'src/entities/budget.entity';
import { SetBudgetDto } from 'src/dto/set-budget.dto';
import { UpdateBudgetDto } from 'src/dto/update-budget.dto';

@Controller('budget')
export class BudgetController {
  constructor(private readonly budgetService: BudgetService) {}

  @Get()
  async getBudget(): Promise<Budget | null> {
    const userId = 1;
    return this.budgetService.getBudget(userId);
  }

  @Post()
  async setBudget(@Body() setBudgetDto: SetBudgetDto): Promise<Budget> {
    const userId = 1;
    return this.budgetService.createBudget(
      userId,
      setBudgetDto.amount,
      setBudgetDto.currency,
    );
  }

  @Put(':id')
  async updateBudget(
    @Param('id') id: string,
    @Body() updateBudgetDto: UpdateBudgetDto,
  ): Promise<Budget> {
    const budgetId = parseInt(id, 10);
    return this.budgetService.updateBudget(budgetId, updateBudgetDto);
  }
}
